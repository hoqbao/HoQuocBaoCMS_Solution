import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService.js';
import { IMAGE_BASE_URL } from '../config.js';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCart);
    }, []);

    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString('vi-VN') + ' đ';
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return '/no-image.png';
        }

        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }

        return `${IMAGE_BASE_URL}${imageUrl}`;
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            return;
        }

        const updatedCart = cartItems.map((item) =>
            item.id === productId
                ? { ...item, quantity: quantity }
                : item
        );

        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);

        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        window.dispatchEvent(new Event('cartUpdated'));
    };

    const totalAmount = cartItems.reduce((total, item) => {
        return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCustomerInfo({
            ...customerInfo,
            [name]: value
        });
    };

    const handleOrderSubmit = async (event) => {
        event.preventDefault();

        setMessage('');

        if (cartItems.length === 0) {
            setMessage('Giỏ hàng đang trống.');
            return;
        }

        if (!customerInfo.fullName.trim()) {
            setMessage('Vui lòng nhập họ tên.');
            return;
        }

        if (!customerInfo.phone.trim()) {
            setMessage('Vui lòng nhập số điện thoại.');
            return;
        }

        if (!customerInfo.address.trim()) {
            setMessage('Vui lòng nhập địa chỉ giao hàng.');
            return;
        }

        const orderData = {
            fullName: customerInfo.fullName,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: customerInfo.address,
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity
            }))
        };

        console.log('ORDER DATA:', orderData);

        try {
            const result = await orderService.createOrder(orderData);

            setMessage(result.message || 'Đặt hàng thành công.');

            localStorage.removeItem('cartItems');
            setCartItems([]);

            // Báo cho Header cập nhật lại số lượng giỏ hàng
            window.dispatchEvent(new Event('cartUpdated'));

            setCustomerInfo({
                fullName: '',
                email: '',
                phone: '',
                address: ''
            });
        } catch (error) {
            console.error('Lỗi đặt hàng:', error);
            console.error('API response:', error.response?.data);

            const apiMessage =
                error.response?.data?.innerError ||
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message;

            setMessage(apiMessage || 'Đặt hàng thất bại. Vui lòng kiểm tra lại API.');
        }
    };

    return (
        <div className="cart-page">
            <section className="cart-header">
                <h1>
                    <i className="fa-solid fa-cart-shopping"></i>
                    Giỏ hàng của bạn
                </h1>

                <p>Kiểm tra sản phẩm và nhập thông tin để đặt hàng.</p>
            </section>

            {message && (
                <div className="cart-message">
                    {message}
                </div>
            )}

            <section className="cart-layout">
                <div className="cart-items-area">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <i className="fa-solid fa-box-open"></i>
                            <h3>Giỏ hàng đang trống</h3>
                            <p>Hãy chọn sản phẩm ở trang cửa hàng.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img
                                    src={getImageUrl(item.imageUrl)}
                                    alt={item.name}
                                />

                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>{formatPrice(item.price)}</p>
                                </div>

                                <div className="cart-quantity">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    {formatPrice(item.price * item.quantity)}
                                </div>

                                <button
                                    type="button"
                                    className="cart-remove-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <form className="checkout-box" onSubmit={handleOrderSubmit}>
                    <h3>Thông tin đặt hàng</h3>

                    <div className="checkout-form-group">
                        <label htmlFor="fullName">Họ tên</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={customerInfo.fullName}
                            onChange={handleInputChange}
                            placeholder="Nhập họ tên"
                        />
                    </div>

                    <div className="checkout-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="checkout-form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div className="checkout-form-group">
                        <label htmlFor="address">Địa chỉ giao hàng</label>
                        <textarea
                            id="address"
                            name="address"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            placeholder="Nhập địa chỉ giao hàng"
                            rows="3"
                        />
                    </div>

                    <div className="checkout-total">
                        <span>Tổng tiền:</span>
                        <strong>{formatPrice(totalAmount)}</strong>
                    </div>

                    <button type="submit" className="checkout-submit-btn">
                        <i className="fa-solid fa-paper-plane"></i>
                        Đặt hàng
                    </button>
                </form>
            </section>
        </div>
    );
};

export default CartPage;