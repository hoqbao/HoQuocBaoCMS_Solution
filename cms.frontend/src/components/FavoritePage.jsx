import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavoritePage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(data);
    }, []);

    const handleRemove = (id) => {
        const newFavorites = favorites.filter(item => Number(item.id) !== Number(id));
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <div className="shopping-page">
            <div className="shopping-header">
                <div>
                    <h3 className="fw-bold mb-1">
                        <i className="fa-solid fa-heart text-danger me-2"></i>
                        Sản phẩm yêu thích
                    </h3>

                    <p className="text-muted mb-0">
                        Danh sách sản phẩm bạn đã đánh dấu yêu thích
                    </p>
                </div>

                <Link to="/" className="btn btn-outline-secondary">
                    Về trang chủ
                </Link>
            </div>

            {favorites.length === 0 ? (
                <div className="empty-shopping-box">
                    <i className="fa-solid fa-heart"></i>
                    <h5>Chưa có sản phẩm yêu thích</h5>
                    <p>Bấm nút yêu thích ở trang chi tiết sản phẩm để lưu sản phẩm.</p>

                    <Link to="/" className="btn btn-danger">
                        Xem sản phẩm
                    </Link>
                </div>
            ) : (
                <div className="row">
                    {favorites.map(item => (
                        <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                            <div className="card favorite-card h-100">
                                {item.imageUrl ? (
                                    <img
                                        src={`https://localhost:7076${item.imageUrl}`}
                                        alt={item.name}
                                        className="favorite-image"
                                    />
                                ) : (
                                    <div className="favorite-image d-flex align-items-center justify-content-center text-muted">
                                        No image
                                    </div>
                                )}

                                <div className="card-body">
                                    <span className="badge bg-light text-primary mb-2">
                                        {item.categoryProductName}
                                    </span>

                                    <h5 className="fw-bold">
                                        {item.name}
                                    </h5>

                                    <p className="text-danger fw-bold">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(Number(item.price))}
                                    </p>

                                    <div className="d-flex gap-2">
                                        <Link
                                            to={`/product/${item.id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Xem chi tiết
                                        </Link>

                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritePage;