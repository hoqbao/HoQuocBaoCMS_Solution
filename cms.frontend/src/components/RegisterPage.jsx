import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();

        if (
            !fullName.trim() ||
            !username.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setMessage('Vui lòng nhập đầy đủ thông tin đăng ký.');
            return;
        }

        const user = {
            fullName: fullName.trim(),
            username: username.trim(),
            email: email.trim()
        };

        onLogin(user);
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-icon register-icon">
                    <i className="fa-solid fa-user-plus"></i>
                </div>

                <h2>Đăng ký tài khoản</h2>

                <p className="auth-subtitle">
                    Tạo tài khoản để mua sắm nhanh hơn
                </p>

                {message && (
                    <div className="alert alert-warning text-start">
                        {message}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Họ và tên</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập họ và tên"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tên đăng nhập</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Mật khẩu</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn auth-main-btn register-main-btn w-100"
                    >
                        <i className="fa-solid fa-user-plus me-2"></i>
                        Đăng ký
                    </button>
                </form>

                <p className="auth-switch-text">
                    Đã có tài khoản?
                    <Link to="/login"> Đăng nhập</Link>
                </p>

                <Link to="/" className="auth-back-link">
                    <i className="fa-solid fa-arrow-left me-1"></i>
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;