/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 28/05/2026
*/

using CMS.Data.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new
                {
                    o.Id,
                    o.CustomerId,
                    CustomerName = o.Customer != null ? o.Customer.FullName : "Không có khách hàng",
                    CustomerPhone = o.Customer != null ? o.Customer.Phone : "",
                    CustomerEmail = o.Customer != null ? o.Customer.Email : "",
                    CustomerAddress = o.Customer != null ? o.Customer.Address : "",
                    o.OrderDate,
                    o.Status,
                    TotalAmount = o.OrderDetails.Sum(od => od.UnitPrice * od.Quantity),
                    Items = o.OrderDetails.Select(od => new
                    {
                        od.Id,
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : "Không có sản phẩm",
                        od.Quantity,
                        od.UnitPrice,
                        LineTotal = od.UnitPrice * od.Quantity
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/Orders/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetail(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Where(o => o.Id == id)
                .Select(o => new
                {
                    o.Id,
                    o.CustomerId,
                    CustomerName = o.Customer != null ? o.Customer.FullName : "Không có khách hàng",
                    CustomerPhone = o.Customer != null ? o.Customer.Phone : "",
                    CustomerEmail = o.Customer != null ? o.Customer.Email : "",
                    CustomerAddress = o.Customer != null ? o.Customer.Address : "",
                    o.OrderDate,
                    o.Status,
                    TotalAmount = o.OrderDetails.Sum(od => od.UnitPrice * od.Quantity),
                    Items = o.OrderDetails.Select(od => new
                    {
                        od.Id,
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : "Không có sản phẩm",
                        od.Quantity,
                        od.UnitPrice,
                        LineTotal = od.UnitPrice * od.Quantity
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy đơn hàng."
                });
            }

            return Ok(order);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            if (request == null)
            {
                return BadRequest(new
                {
                    message = "Dữ liệu đơn hàng không hợp lệ."
                });
            }

            if (string.IsNullOrWhiteSpace(request.FullName))
            {
                return BadRequest(new
                {
                    message = "Vui lòng nhập họ tên khách hàng."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Phone))
            {
                return BadRequest(new
                {
                    message = "Vui lòng nhập số điện thoại."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Address))
            {
                return BadRequest(new
                {
                    message = "Vui lòng nhập địa chỉ giao hàng."
                });
            }

            if (request.Items == null || request.Items.Count == 0)
            {
                return BadRequest(new
                {
                    message = "Giỏ hàng đang trống."
                });
            }

            if (request.Items.Any(i => i.ProductId <= 0))
            {
                return BadRequest(new
                {
                    message = "Mã sản phẩm không hợp lệ."
                });
            }

            if (request.Items.Any(i => i.Quantity <= 0))
            {
                return BadRequest(new
                {
                    message = "Số lượng sản phẩm phải lớn hơn 0."
                });
            }

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var customer = new Customer
                {
                    FullName = request.FullName.Trim(),
                    Email = request.Email ?? "",
                    Phone = request.Phone.Trim(),
                    Address = request.Address.Trim(),

                    // Bảng Customers của bạn đang bắt buộc Password NOT NULL.
                    // Khách đặt hàng không cần tài khoản nên gán mật khẩu mặc định.
                    Password = "OrderCustomer"
                };

                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();

                var order = new Order
                {
                    CustomerId = customer.Id,
                    OrderDate = DateTime.Now,

                    // 0 = Chờ xử lý / Pending
                    Status = 0
                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                decimal totalAmount = 0;

                foreach (var item in request.Items)
                {
                    var product = await _context.Products
                        .FirstOrDefaultAsync(p => p.Id == item.ProductId);

                    if (product == null)
                    {
                        await transaction.RollbackAsync();

                        return BadRequest(new
                        {
                            message = $"Không tìm thấy sản phẩm có ID = {item.ProductId}."
                        });
                    }

                    var unitPrice = product.Price;
                    var lineTotal = unitPrice * item.Quantity;

                    totalAmount += lineTotal;

                    var orderDetail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        UnitPrice = unitPrice
                    };

                    _context.OrderDetails.Add(orderDetail);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    message = "Đặt hàng thành công.",
                    orderId = order.Id,
                    customerId = customer.Id,
                    totalAmount = totalAmount
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();

                return StatusCode(500, new
                {
                    message = "Lỗi server khi tạo đơn hàng.",
                    error = ex.Message,
                    innerError = ex.InnerException != null ? ex.InnerException.Message : null
                });
            }
        }
    }

    public class CreateOrderRequest
    {
        public string FullName { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public List<CreateOrderItemRequest> Items { get; set; } = new List<CreateOrderItemRequest>();
    }

    public class CreateOrderItemRequest
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }
}