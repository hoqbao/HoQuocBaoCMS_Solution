import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductList from './ProductList.jsx';
const StorePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả sản phẩm');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const categories = [
        'Tất cả sản phẩm',
        'Đầm dạ hội',
        'Đồ nam công sở',
        'Phụ kiện nam'
    ];

    const priceRanges = [
        { id: 'all', label: 'Tất cả mức giá' },
        { id: 'under500', label: 'Dưới 500.000 đ' },
        { id: '500to1000', label: 'Từ 500.000 đ đến 1.000.000 đ' },
        { id: 'over1000', label: 'Trên 1.000.000 đ' }
    ];

    return (
        <div className="store-page">
            <section className="store-banner">
                <div>
                    <span className="store-banner-tag">
                        QUOCBAO FASHION STORE
                    </span>

                    <h1>Khám phá bộ sưu tập thời trang của bạn</h1>

                    <p>
                        Chọn danh mục và khoảng giá phù hợp để tìm sản phẩm bạn yêu thích.
                    </p>
                </div>

                <Link to="/Home" className="store-back-btn">
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Về trang chủ
                </Link>
            </section>

            <section className="store-layout">
                <aside className="store-filter-sidebar">
                    <div className="store-filter-box">
                        <h4>
                            <i className="fa-solid fa-list me-2"></i>
                            Danh mục sản phẩm
                        </h4>

                        <div className="store-filter-list">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={
                                        selectedCategory === category
                                            ? 'store-filter-item active'
                                            : 'store-filter-item'
                                    }
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category === 'Tất cả sản phẩm' && (
                                        <i className="fa-solid fa-border-all"></i>
                                    )}

                                    {(category === 'Xu hướng đầm dạ hội' || category === 'Đầm dạ hội') && (
                                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                                    )}
                                    {category === 'Đồ nam công sở' && (
                                        <i className="fa-solid fa-user-tie"></i>
                                    )}

                                    {category === 'Phụ kiện nam' && (
                                        <i className="fa-solid fa-gem"></i>
                                    )}

                                    <span>{category}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="store-filter-box">
                        <h4>
                            <i className="fa-solid fa-tags me-2"></i>
                            Khoảng giá
                        </h4>

                        <div className="store-filter-list">
                            {priceRanges.map((priceRange) => (
                                <button
                                    key={priceRange.id}
                                    type="button"
                                    className={
                                        selectedPriceRange === priceRange.id
                                            ? 'store-filter-item active'
                                            : 'store-filter-item'
                                    }
                                    onClick={() => setSelectedPriceRange(priceRange.id)}
                                >
                                    <i className="fa-solid fa-money-bill-wave"></i>
                                    <span>{priceRange.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <section className="store-products-area">
                    <div className="store-product-heading">
                        <div>
                            <h2>
                                <i className="fa-solid fa-bag-shopping me-2"></i>
                                Sản phẩm
                            </h2>

                            <p>
                                Danh mục: <strong>{selectedCategory}</strong>
                            </p>

                            {searchTerm && (
                                <p className="store-search-result">
                                    Kết quả tìm kiếm cho: <strong>"{searchTerm}"</strong>
                                </p>
                            )}
                        </div>

                        <span className="store-price-status">
                            {priceRanges.find((item) => item.id === selectedPriceRange)?.label}
                        </span>
                    </div>
                    <ProductList
                        selectedCategory={selectedCategory}
                        selectedPriceRange={selectedPriceRange}
                        searchTerm={searchTerm}
                    />                </section>
            </section>
        </div>
    );
};

export default StorePage;