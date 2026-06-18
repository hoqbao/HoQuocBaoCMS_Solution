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
            <div className="auth-card">
                <div className="auth-icon login-icon">
                    <i className="fa-solid fa-right-to-bracket"></i>
                </div>

                <h2>Đăng nhập</h2>

                <p className="auth-subtitle">
                    Chào mừng bạn quay lại QUOCBAO FASHION
                </p>

                {message && (
                    <div className="alert alert-warning text-start">
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">
                            Tên đăng nhập hoặc Email
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tài khoản hoặc email"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn auth-main-btn w-100">
                        <i className="fa-solid fa-right-to-bracket me-2"></i>
                        Đăng nhập
                    </button>
                </form>

                <p className="auth-switch-text">
                    Chưa có tài khoản?
                    <Link to="/register"> Đăng ký ngay</Link>
                </p>

                <Link to="/" className="auth-back-link">
                    <i className="fa-solid fa-arrow-left me-1"></i>
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;