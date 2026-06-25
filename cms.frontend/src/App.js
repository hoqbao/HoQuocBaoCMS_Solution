import React, { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
    Navigate
} from 'react-router-dom';

import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import PostList from './components/PostList.jsx';
import CartPage from './components/CartPage.jsx';
import PostDetail from './components/PostDetail.jsx';
import BannerSlider from './components/BannerSlider.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import StorePage from './components/StorePage.jsx';
import BlogPage from './components/BlogPage.jsx';
import AboutPage from './components/AboutPage.jsx';

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
                {categories.map((category) => (
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

                        {category === 'Xu hướng đầm dạ hội' && (
                            <i className="fa-solid fa-wand-magic-sparkles me-1"></i>
                        )}

                        {category === 'Đồ nam công sở' && (
                            <i className="fa-solid fa-user-tie me-1"></i>
                        )}

                        {category === 'Phụ kiện nam' && (
                            <i className="fa-solid fa-gem me-1"></i>
                        )}

                        {category}
                    </button>
                ))}
            </section>

            <section id="product-section" className="home-section">
                <div className="section-heading">
                    <h3>Sản phẩm nổi bật</h3>
                    <span>Đang hiển thị: {selectedCategory}</span>
                </div>

                <ProductList selectedCategory={selectedCategory} />
            </section>

            <section id="trend-section" className="trend-section">
                <div className="trend-title">
                    <h3>Xu hướng thời trang</h3>
                    <p>Cập nhật những mẹo phối đồ và tin tức phong cách mới nhất</p>
                </div>

                <PostList limit={3} />
            </section>
        </>
    );
}

function ProductDetailPage() {
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

function HeaderSearch() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();

        const searchText = keyword.trim();

        if (!searchText) {
            navigate('/store');
            return;
        }

        navigate(`/store?search=${encodeURIComponent(searchText)}`);
    };

    return (
        <form className="shop-search" onSubmit={handleSearch}>
            <input
                id="searchKeyword"
                name="searchKeyword"
                type="text"
                placeholder="Tìm kiếm mẫu đầm dạ hội, sơ mi công sở..."
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
            />

            <button type="submit" title="Tìm kiếm">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
}

function ShopLayout({ children, currentUser, handleLogout }) {
    return (
        <div className="shop-page">
            <div className="top-strip">
                <div className="top-strip-content">
                    <div className="top-contact">
                        <span>
                            <i className="fa-solid fa-phone me-1"></i>
                            Hotline: 033 766 2568
                        </span>

                        <span>
                            <i className="fa-solid fa-envelope me-1"></i>
                            Email: support@quocbaocms.retail
                        </span>
                    </div>

                    <div className="top-auth">
                        {currentUser ? (
                            <>
                                <span className="logged-user">
                                    <i className="fa-solid fa-circle-user"></i>
                                    Xin chào, {currentUser.fullName || currentUser.username}
                                </span>

                                <button
                                    type="button"
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <span>Đăng xuất</span>
                                </button>                            </>
                        ) : (
                            <>
                                <Link to="/login" className="top-auth-link login-link">
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                    <span>Đăng nhập</span>
                                </Link>

                                <span className="top-auth-divider">|</span>

                                <Link to="/register" className="top-auth-link register-link">
                                    <i className="fa-solid fa-user-plus"></i>
                                    <span>Đăng ký</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <header className="shop-main-header">
                <Link to="/" className="shop-logo-text">
                    QuocBao.<span>Fashion</span>
                </Link>

                <HeaderSearch />

                <div className="shop-header-actions">
                    <Link to="/cart" className="mini-action-btn cart-mini-btn">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Giỏ hàng</span>
                    </Link>
                </div>
            </header>

            <nav className="shop-navbar">
                <Link to="/">Trang Chủ</Link>
                <Link to="/store">Cửa Hàng</Link>
                <Link to="/blog">Tin Tức / Blog</Link>
                <Link to="/about">Về Chúng Tôi</Link>
            </nav>

            <main className="shop-content">
                {children}
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
    );
}

function App() {
    const savedUser = localStorage.getItem('authUser');

    const [currentUser, setCurrentUser] = useState(
        savedUser ? JSON.parse(savedUser) : null
    );

    const handleLogin = (user) => {
        localStorage.setItem('authUser', JSON.stringify(user));
        setCurrentUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        sessionStorage.clear();

        document.cookie.split(';').forEach((cookie) => {
            document.cookie = cookie
                .replace(/^ +/, '')
                .replace(/=.*/, '=;expires=' + new Date(0).toUTCString() + ';path=/');
        });

        setCurrentUser(null);

        window.location.href = '/login';
    };
    const withShopLayout = (page) => (
        <ShopLayout currentUser={currentUser} handleLogout={handleLogout}>
            {page}
        </ShopLayout>
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage onLogin={handleLogin} />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage onLogin={handleLogin} />}
                />

                <Route
                    path="/"
                    element={withShopLayout(<HomePage />)}
                />

                <Route
                    path="/home"
                    element={<Navigate to="/" replace />}
                />

                <Route
                    path="/Home"
                    element={<Navigate to="/" replace />}
                />

                <Route
                    path="/store"
                    element={withShopLayout(<StorePage />)}
                />

                <Route
                    path="/Store"
                    element={<Navigate to="/store" replace />}
                />

                <Route
                    path="/blog"
                    element={withShopLayout(<BlogPage />)}
                />

                <Route
                    path="/about"
                    element={withShopLayout(<AboutPage />)}
                />

                <Route
                    path="/cart"
                    element={withShopLayout(<CartPage />)}
                />

                <Route
                    path="/product/:id"
                    element={withShopLayout(<ProductDetailPage />)}
                />

                <Route
                    path="/blog/:id"
                    element={withShopLayout(<PostDetailPage />)}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;