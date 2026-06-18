import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="about-banner">
                <div className="about-banner-content">
                    <span className="about-tag">
                        QUOCBAO FASHION
                    </span>

                    <h1>
                        Thời trang không chỉ là trang phục,
                        mà còn là phong cách của bạn.
                    </h1>

                    <p>
                        QUOCBAO FASHION mang đến những sản phẩm thời trang phù hợp
                        cho công việc, sự kiện và cuộc sống hằng ngày.
                    </p>

                    <Link to="/store" className="about-shop-btn">
                        <i className="fa-solid fa-bag-shopping me-2"></i>
                        Khám phá cửa hàng
                    </Link>
                </div>

                <div className="about-banner-icon">
                    <i className="fa-solid fa-shirt"></i>
                </div>
            </section>

            <section className="about-intro-section">
                <div className="about-intro-content">
                    <span className="about-section-tag">
                        CÂU CHUYỆN THƯƠNG HIỆU
                    </span>

                    <h2>
                        Đồng hành cùng phong cách hiện đại
                    </h2>

                    <p>
                        QUOCBAO FASHION được xây dựng với mong muốn mang đến
                        các sản phẩm thời trang chất lượng, dễ phối đồ và phù hợp
                        với nhiều nhu cầu khác nhau.
                    </p>

                    <p>
                        Chúng tôi tập trung vào các nhóm sản phẩm nổi bật như
                        đầm dạ hội, đồ nam công sở và phụ kiện nam.
                        Mỗi sản phẩm đều hướng đến sự chỉn chu, thanh lịch và tiện dụng.
                    </p>
                </div>

                <div className="about-stat-grid">
                    <div className="about-stat-card">
                        <i className="fa-solid fa-shirt"></i>
                        <strong>50+</strong>
                        <span>Sản phẩm thời trang</span>
                    </div>

                    <div className="about-stat-card">
                        <i className="fa-solid fa-layer-group"></i>
                        <strong>3</strong>
                        <span>Danh mục chính</span>
                    </div>

                    <div className="about-stat-card">
                        <i className="fa-solid fa-truck-fast"></i>
                        <strong>24/7</strong>
                        <span>Hỗ trợ khách hàng</span>
                    </div>
                </div>
            </section>

            <section className="about-value-section">
                <div className="about-value-heading">
                    <span className="about-section-tag">
                        GIÁ TRỊ CỦA CHÚNG TÔI
                    </span>

                    <h2>
                        Điều QUOCBAO FASHION luôn hướng đến
                    </h2>
                </div>

                <div className="about-value-grid">
                    <div className="about-value-card">
                        <div className="about-value-icon">
                            <i className="fa-solid fa-award"></i>
                        </div>

                        <h4>Sản phẩm chọn lọc</h4>

                        <p>
                            Cung cấp những sản phẩm phù hợp xu hướng,
                            chú trọng kiểu dáng và chất lượng.
                        </p>
                    </div>

                    <div className="about-value-card">
                        <div className="about-value-icon">
                            <i className="fa-solid fa-heart"></i>
                        </div>

                        <h4>Khách hàng là trung tâm</h4>

                        <p>
                            Luôn lắng nghe nhu cầu của khách hàng
                            để cải thiện trải nghiệm mua sắm.
                        </p>
                    </div>

                    <div className="about-value-card">
                        <div className="about-value-icon">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </div>

                        <h4>Phong cách hiện đại</h4>

                        <p>
                            Mang đến những lựa chọn phù hợp cho công sở,
                            sự kiện và các dịp đặc biệt.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;