import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            setMessage('Vui lòng nhập tài khoản và mật khẩu.');
            return;
        }

        const user = {
            username: username.trim(),
            fullName: username.trim()
        };

        onLogin(user);
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-login-card">
                <div className="auth-logo-mini">
                    QuocBao.<span>Fashion</span>
                </div>

                <div className="auth-icon login-icon">
                    <i className="fa-solid fa-right-to-bracket"></i>
                </div>

                <h2>Đăng nhập</h2>

                <p className="auth-subtitle">
                    Chào mừng bạn quay lại hệ thống mua sắm thời trang
                </p>

                {message && (
                    <div className="auth-alert">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>{message}</span>
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="auth-form-group">
                        <label htmlFor="loginUsername">
                            Tên đăng nhập hoặc Email
                        </label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-user"></i>

                            <input
                                id="loginUsername"
                                name="loginUsername"
                                type="text"
                                placeholder="Nhập tài khoản hoặc email"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="loginPassword">
                            Mật khẩu
                        </label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-lock"></i>

                            <input
                                id="loginPassword"
                                name="loginPassword"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        <span>Đăng nhập</span>
                    </button>
                </form>

                <p className="auth-switch-text">
                    Chưa có tài khoản?
                    <Link to="/register"> Đăng ký ngay</Link>
                </p>

                <Link to="/" className="auth-back-link">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Quay về trang chủ</span>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;