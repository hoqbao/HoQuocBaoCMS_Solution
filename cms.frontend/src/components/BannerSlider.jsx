import React, { useEffect, useState } from 'react';

const banners = [
    {
        image: '/banners/banner1.jpg',
        subTitle: 'Bộ sưu tập thời trang 2026',
        title: 'Nâng tầm phong cách cùng QUOCBAO FASHION',
        description: 'Khám phá các mẫu thời trang mới nhất dành cho bạn.'
    },
    {
        image: '/banners/banner2.jpg',
        subTitle: 'Thời trang công sở',
        title: 'Thanh lịch trong từng phong cách',
        description: 'Áo sơ mi, vest, quần tây và phụ kiện giúp bạn tự tin mỗi ngày.'
    },
    {
        image: '/banners/banner3.jpg',
        subTitle: 'Đầm dạ hội cao cấp',
        title: 'Tỏa sáng trong mọi sự kiện',
        description: 'Những mẫu đầm dạ hội sang trọng, tinh tế và nổi bật.'
    }
];

const BannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev =>
                prev === banners.length - 1 ? 0 : prev + 1
            );
        }, 3500);

        return () => clearInterval(timer);
    }, []);

    const currentBanner = banners[currentIndex];

    return (
        <section className="banner-slider-wrapper">
            <div className="banner-slider">
                <img
                    src={currentBanner.image}
                    alt="Banner"
                    className="banner-slider-image"
                />

                <div className="banner-slider-overlay"></div>

                <div className="banner-slider-content">
                    <span>{currentBanner.subTitle}</span>

                    <h1>{currentBanner.title}</h1>

                    <p>{currentBanner.description}</p>

                    <a href="#product-section" className="banner-primary-btn">
                        <i className="fa-solid fa-bag-shopping me-2"></i>
                        Mua sắm ngay
                    </a>
                </div>

                <div className="banner-dots">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={currentIndex === index ? 'active' : ''}
                            onClick={() => setCurrentIndex(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSlider;