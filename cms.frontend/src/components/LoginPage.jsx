import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const demoUsers = [
        {
            username: 'admin',
            email: 'admin@gmail.com',
            password: '123456',
            fullName: 'Quản trị viên'
        }
    ];

    const getRegisteredUsers = () => {
        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        return Array.isArray(savedUsers) ? savedUsers : [];
    };

    const handleLogin = (event) => {
        event.preventDefault();

        setMessage('');

        const usernameText = username.trim();
        const passwordText = password.trim();

        if (!usernameText || !passwordText) {
            setMessage('Vui lòng nhập tài khoản và mật khẩu.');
            return;
        }

        const registeredUsers = getRegisteredUsers();

        const allUsers = [
            ...demoUsers,
            ...registeredUsers
        ];

        const foundUser = allUsers.find((user) => {
            const userUsername = (user.username || '').toLowerCase();
            const userEmail = (user.email || '').toLowerCase();
            const inputUsername = usernameText.toLowerCase();

            const isMatchUsername =
                userUsername === inputUsername ||
                userEmail === inputUsername;

            const isMatchPassword =
                String(user.password || '') === passwordText;

            return isMatchUsername && isMatchPassword;
        });

        if (!foundUser) {
            setMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
            return;
        }

        const loginUser = {
            username: foundUser.username,
            fullName: foundUser.fullName || foundUser.username,
            email: foundUser.email || ''
        };

        onLogin(loginUser);
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

                    <div className="auth-forgot-row">
                        <Link to="/forgot-password">
                            Quên mật khẩu?
                        </Link>
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