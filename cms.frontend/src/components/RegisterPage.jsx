import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleRegister = (event) => {
        event.preventDefault();

        setMessage('');

        const fullName = formData.fullName.trim();
        const email = formData.email.trim();
        const username = formData.username.trim();
        const password = formData.password.trim();

        if (!fullName || !email || !username || !password) {
            setMessage('Vui lòng nhập đầy đủ thông tin đăng ký.');
            return;
        }

        if (!isValidEmail(email)) {
            setMessage('Email không đúng định dạng.');
            return;
        }

        if (password.length < 6) {
            setMessage('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        const isDuplicate = registeredUsers.some((user) => {
            const existingUsername = (user.username || '').toLowerCase();
            const existingEmail = (user.email || '').toLowerCase();

            return (
                existingUsername === username.toLowerCase() ||
                existingEmail === email.toLowerCase()
            );
        });

        if (isDuplicate) {
            setMessage('Tên đăng nhập hoặc email đã được sử dụng.');
            return;
        }

        const newUser = {
            fullName,
            email,
            username,
            password
        };

        const updatedUsers = [
            ...registeredUsers,
            newUser
        ];

        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

        const loginUser = {
            username,
            fullName,
            email
        };

        onLogin(loginUser);
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-register-card">
                <div className="auth-logo-mini">
                    QuocBao.<span>Fashion</span>
                </div>

                <div className="auth-icon register-icon">
                    <i className="fa-solid fa-user-plus"></i>
                </div>

                <h2>Đăng ký tài khoản</h2>

                <p className="auth-subtitle">
                    Tạo tài khoản để mua sắm nhanh hơn và theo dõi đơn hàng dễ dàng.
                </p>

                {message && (
                    <div className="auth-alert">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="auth-form-group">
                        <label htmlFor="fullName">Họ và tên</label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-id-card"></i>

                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Nhập họ và tên"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="email">Email</label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-envelope"></i>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="username">Tên đăng nhập</label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-user"></i>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="password">Mật khẩu</label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-lock"></i>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Nhập mật khẩu tối thiểu 6 ký tự"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-submit-btn register-submit-btn">
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Đăng ký</span>
                    </button>
                </form>

                <p className="auth-switch-text">
                    Đã có tài khoản?
                    <Link to="/login"> Đăng nhập</Link>
                </p>

                <Link to="/" className="auth-back-link">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Quay về trang chủ</span>
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;