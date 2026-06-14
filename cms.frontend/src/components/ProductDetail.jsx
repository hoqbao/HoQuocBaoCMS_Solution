import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import productService from '../services/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);

                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        if (product && quantity < product.stockQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const saveProductToCart = () => {
        if (!product) return false;

        if (product.stockQuantity <= 0) {
            setMessage('Sản phẩm hiện đã hết hàng.');
            return false;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const cartItem = {
            id: Number(product.id),
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrl || '',
            stockQuantity: Number(product.stockQuantity),
            categoryProductName: product.categoryProductName || 'Chưa có danh mục',
            quantity: Number(quantity)
        };

        const existingItem = cart.find(item => Number(item.id) === Number(product.id));

        if (existingItem) {
            existingItem.quantity = Number(existingItem.quantity) + Number(quantity);

            if (existingItem.quantity > Number(product.stockQuantity)) {
                existingItem.quantity = Number(product.stockQuantity);
            }
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    };

    const handleAddToCart = () => {
        const success = saveProductToCart();

        if (success) {
            setMessage('Đã thêm sản phẩm vào giỏ hàng thành công!');
        }
    };

    const handleBuyNow = () => {
        const success = saveProductToCart();

        if (success) {
            navigate('/cart');
        }
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3 text-muted">Đang tải chi tiết sản phẩm...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="alert alert-warning">
                Không tìm thấy sản phẩm này.
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="mb-3">
                <Link to="/" className="btn btn-outline-secondary">
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Quay lại
                </Link>
            </div>

            <div className="product-breadcrumb mb-3">
                Trang chủ / Sản phẩm / <span>{product.name}</span>
            </div>

            {message && (
                <div className="alert alert-success alert-dismissible fade show">
                    <i className="fa-solid fa-circle-check me-2"></i>
                    {message}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage('')}
                    ></button>
                </div>
            )}

            <div className="product-detail-card-new">
                <div className="row g-0">
                    <div className="col-lg-6">
                        <div className="product-detail-image-area">
                            {product.imageUrl ? (
                                <img
                                    src={`https://localhost:7076${product.imageUrl}`}
                                    alt={product.name}
                                    className="product-detail-main-image"
                                />
                            ) : (
                                <div className="product-detail-no-image">
                                    Chưa có ảnh sản phẩm
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="product-detail-info-area">
                            <span className="product-detail-category">
                                <i className="fa-solid fa-tag me-1"></i>
                                {product.categoryProductName || 'Chưa có danh mục'}
                            </span>

                            <h1 className="product-detail-name">
                                {product.name}
                            </h1>

                            <div className="product-detail-price-new">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(product.price)}
                            </div>

                            <div className="product-detail-meta">
                                <div>
                                    <i className="fa-solid fa-box text-primary me-2"></i>
                                    Tồn kho: <strong>{product.stockQuantity}</strong> sản phẩm
                                </div>

                                <div>
                                    <i className="fa-solid fa-truck-fast text-success me-2"></i>
                                    Giao hàng toàn quốc
                                </div>

                                <div>
                                    <i className="fa-solid fa-rotate-left text-danger me-2"></i>
                                    Đổi trả theo chính sách cửa hàng
                                </div>
                            </div>

                            <hr />

                            <h5 className="fw-bold mb-2">
                                Mô tả sản phẩm
                            </h5>

                            <p className="product-detail-description-new">
                                {product.description || 'Sản phẩm chưa có mô tả chi tiết.'}
                            </p>

                            <div className="mt-4">
                                <label className="fw-bold mb-2">
                                    Số lượng
                                </label>

                                <div className="quantity-control-new">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleDecreaseQuantity}
                                    >
                                        -
                                    </button>

                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="form-control text-center"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleIncreaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="product-detail-actions-new mt-4">
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={handleAddToCart}
                                    disabled={product.stockQuantity <= 0}
                                >
                                    <i className="fa-solid fa-cart-plus me-2"></i>
                                    Thêm vào giỏ hàng
                                </button>

                                <button
                                    className="btn btn-success btn-lg"
                                    onClick={handleBuyNow}
                                    disabled={product.stockQuantity <= 0}
                                >
                                    <i className="fa-solid fa-bag-shopping me-2"></i>
                                    Mua ngay
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;