import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
    const [temporaryPassword, setTemporaryPassword] = useState('');

    const generateTemporaryPassword = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let password = '';

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        return password;
    };

    const handleResetPassword = (event) => {
        event.preventDefault();

        setMessage('');
        setTemporaryPassword('');

        const accountText = account.trim().toLowerCase();

        if (!accountText) {
            setMessage('Vui lòng nhập tên đăng nhập hoặc email.');
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        if (!Array.isArray(registeredUsers) || registeredUsers.length === 0) {
            setMessage('Hiện chưa có tài khoản khách hàng nào được đăng ký.');
            return;
        }

        const userIndex = registeredUsers.findIndex((user) => {
            const username = (user.username || '').toLowerCase();
            const email = (user.email || '').toLowerCase();

            return username === accountText || email === accountText;
        });

        if (userIndex === -1) {
            setMessage('Không tìm thấy tài khoản phù hợp.');
            return;
        }

        const newPassword = generateTemporaryPassword();

        registeredUsers[userIndex] = {
            ...registeredUsers[userIndex],
            password: newPassword
        };

        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        setTemporaryPassword(newPassword);
        setMessage('Đặt lại mật khẩu thành công.');
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-login-card">
                <div className="auth-logo-mini">
                    QuocBao.<span>Fashion</span>
                </div>

                <div className="auth-icon login-icon">
                    <i className="fa-solid fa-key"></i>
                </div>

                <h2>Quên mật khẩu</h2>

                <p className="auth-subtitle">
                    Nhập tên đăng nhập hoặc email đã đăng ký để tạo mật khẩu tạm thời.
                </p>

                {message && (
                    <div className={temporaryPassword ? 'auth-success-alert' : 'auth-alert'}>
                        <i className={temporaryPassword ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}></i>
                        <span>{message}</span>
                    </div>
                )}

                {temporaryPassword && (
                    <div className="temporary-password-box">
                        <span>Mật khẩu tạm thời của bạn là:</span>

                        <strong>{temporaryPassword}</strong>

                        <small>
                            Hãy dùng mật khẩu này để đăng nhập lại.
                        </small>
                    </div>
                )}

                <form onSubmit={handleResetPassword}>
                    <div className="auth-form-group">
                        <label htmlFor="account">
                            Tên đăng nhập hoặc Email
                        </label>

                        <div className="auth-input-wrap">
                            <i className="fa-solid fa-user"></i>

                            <input
                                id="account"
                                name="account"
                                type="text"
                                placeholder="Nhập tài khoản hoặc email"
                                value={account}
                                onChange={(event) => setAccount(event.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-submit-btn">
                        <i className="fa-solid fa-arrow-rotate-right"></i>
                        <span>Đặt lại mật khẩu</span>
                    </button>
                </form>

                <p className="auth-switch-text">
                    Đã nhớ mật khẩu?
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

export default ForgotPasswordPage;