import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import PostList from './components/PostList.jsx';
import CartPage from './components/CartPage.jsx';
import PostDetail from './components/PostDetail.jsx';
import BannerSlider from './components/BannerSlider.jsx';

import './App.css';

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả sản phẩm');

    const categories = [
        'Tất cả sản phẩm',
        'Đầm dạ hội',
        'Đồ nam công sở',
        'Phụ kiện nam'
    ];

    return (
        <>
            <BannerSlider />

            <section className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? 'category-tab active'
                                : 'category-tab'
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category === 'Tất cả sản phẩm' && (
                            <i className="fa-solid fa-border-all me-1"></i>
                        )}

                        {category}
                    </button>
                ))}
            </section>

            <section id="product-section" className="home-section">
                <div className="section-heading">
                    <h3>Sản phẩm nổi bật</h3>

                    <span>
                        Đang hiển thị: {selectedCategory}
                    </span>
                </div>

                <ProductList selectedCategory={selectedCategory} />
            </section>

            <section id="trend-section" className="trend-section">
                <div className="trend-title">
                    <h3>Xu hướng thời trang</h3>
                    <p>Cập nhật những mẹo phối đồ và tin tức phong cách mới nhất</p>
                </div>

                <PostList />
            </section>
        </>
    );
} function ProductDetailPage() {
    return (
        <section className="home-section">
            <ProductDetail />
        </section>
    );
}
function PostDetailPage() {
    return (
        <section className="home-section">
            <PostDetail />
        </section>
    );
}
function App() {
    return (
        <BrowserRouter>
            <div className="shop-page">
                <div className="top-strip">
                    <div>
                        <i className="fa-solid fa-phone me-1"></i>
                        Hotline: 033 766 2568
                    </div>

                    <div>
                        <i className="fa-solid fa-envelope me-1"></i>
                        Email: support@quocbaocms.retail
                    </div>

                </div>

                <header className="shop-main-header">
                    <Link to="/" className="shop-logo-text">
                        QuocBao.<span>Fashion</span>
                    </Link>

                    <div className="shop-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm mẫu đầm dạ hội, sơ mi công sở..."
                        />

                        <button>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className="shop-header-actions">
                        <Link to="/cart" className="mini-action-btn cart-mini-btn">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>Giỏ hàng</span>
                        </Link>
                    </div>
                </header>

                <nav className="shop-navbar">
                    <Link to="/">Trang Chủ</Link>
                    <Link to="/">Cửa Hàng</Link>
                    <Link to="/">Tin Tức / Blog</Link>
                    <Link to="/">Về Chúng Tôi</Link>
                </nav>

                <main className="shop-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/blog/:id" element={<PostDetailPage />} />
                    </Routes>
                </main>

                <footer className="shop-footer">
                    <div className="footer-content">
                        <div>
                            <h4>QuocBaoCMS.<span>Fashion</span></h4>
                            <p>
                                Hệ thống thời trang cao cấp, dẫn đầu xu hướng.
                                Chúng tôi mang đến những sản phẩm chất lượng cao,
                                định hình phong cách thời thượng.
                            </p>
                        </div>

                        <div>
                            <h5>Chính sách</h5>
                            <p>Chính sách giao hàng</p>
                            <p>Chính sách đổi trả</p>
                            <p>Bảo mật thông tin</p>
                        </div>

                        <div>
                            <h5>Liên hệ</h5>
                            <p>
                                <i className="fa-solid fa-location-dot me-2"></i>
                                Quận 9, Hồ Chí Minh
                            </p>
                            <p>
                                <i className="fa-solid fa-phone me-2"></i>
                                033 776 2568
                            </p>
                            <p>
                                <i className="fa-solid fa-envelope me-2"></i>
                                support@quocbaocms.retail
                            </p>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        © 2026 QuocBaoCMS Retail. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;