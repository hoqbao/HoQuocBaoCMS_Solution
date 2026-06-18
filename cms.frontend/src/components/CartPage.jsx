import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(data);
    }, []);

    const handleRemove = (id) => {
        const newCart = cart.filter(item => Number(item.id) !== Number(id));
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const totalPrice = cart.reduce((sum, item) => {
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    return (
        <div className="shopping-page">
            <div className="shopping-header">
                <div>
                    <h3 className="fw-bold mb-1">
                        <i className="fa-solid fa-cart-shopping text-primary me-2"></i>
                        Giỏ hàng của bạn
                    </h3>

                    <p className="text-muted mb-0">
                        Danh sách sản phẩm đã thêm vào giỏ hàng
                    </p>
                </div>

                <Link to="/Home" className="btn btn-outline-secondary">
                    Tiếp tục mua hàng
                </Link>
            </div>

            {cart.length === 0 ? (
                <div className="empty-shopping-box">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <h5>Giỏ hàng đang trống</h5>
                    <p>Hãy chọn sản phẩm yêu thích và thêm vào giỏ hàng.</p>

                    <Link to="/Home" className="btn btn-primary">
                        Mua sắm ngay
                    </Link>
                </div>
            ) : (
                <div className="card shopping-card">
                    <div className="card-body">
                        {cart.map(item => (
                            <div className="cart-item" key={item.id}>
                                {item.imageUrl ? (
                                    <img
                                        src={`https://localhost:7076${item.imageUrl}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                ) : (
                                    <div className="cart-item-image d-flex align-items-center justify-content-center text-muted">
                                        No image
                                    </div>
                                )}

                                <div className="cart-item-info">
                                    <h5>{item.name}</h5>

                                    <p className="text-muted mb-1">
                                        {item.categoryProductName}
                                    </p>

                                    <p className="mb-0">
                                        Số lượng: <strong>{item.quantity}</strong>
                                    </p>
                                </div>

                                <div className="cart-item-price">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(Number(item.price) * Number(item.quantity))}
                                </div>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}

                        <hr />

                        <div className="cart-total">
                            <span>Tổng tiền:</span>

                            <strong>
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(totalPrice)}
                            </strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;