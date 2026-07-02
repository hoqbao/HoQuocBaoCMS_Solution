import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import categoryProductService from '../services/categoryProductService.js';

const StorePage = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState('Tất cả sản phẩm');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryProductService.getAll();

            const apiCategories = Array.isArray(data)
                ? data.map((item) => ({
                    name: item.name,
                    icon: getCategoryIcon(item.name)
                }))
                : [];

            setCategories([
                {
                    name: 'Tất cả sản phẩm',
                    icon: 'fa-solid fa-border-all'
                },
                ...apiCategories
            ]);
        } catch (error) {
            console.error('Lỗi khi tải danh mục sản phẩm:', error);

            setCategories([
                {
                    name: 'Tất cả sản phẩm',
                    icon: 'fa-solid fa-border-all'
                }
            ]);
        }
    };

    const getCategoryIcon = (categoryName) => {
        const text = (categoryName || '').toLowerCase();

        if (text.includes('đầm') || text.includes('dạ hội')) {
            return 'fa-solid fa-wand-magic-sparkles';
        }

        if (text.includes('nam') || text.includes('công sở')) {
            return 'fa-solid fa-user-tie';
        }

        if (text.includes('phụ kiện')) {
            return 'fa-solid fa-gem';
        }

        if (text.includes('biển')) {
            return 'fa-solid fa-umbrella-beach';
        }

        if (text.includes('mùa đông')) {
            return 'fa-solid fa-snowflake';
        }

        return 'fa-solid fa-shirt';
    };

    const getPriceRangeText = () => {
        if (selectedPriceRange === 'under500') {
            return 'Dưới 500.000 đ';
        }

        if (selectedPriceRange === '500to1000') {
            return '500.000 đ - 1.000.000 đ';
        }

        if (selectedPriceRange === 'over1000') {
            return 'Trên 1.000.000 đ';
        }

        return 'Tất cả mức giá';
    };

    return (
        <div className="store-page">
            <section className="store-banner">
                <div>
                    <span className="store-banner-tag">
                        BỘ SƯU TẬP THỜI TRANG
                    </span>

                    <h1>Cửa hàng thời trang QuocBao Fashion</h1>

                    <p>
                        Khám phá các sản phẩm thời trang mới nhất, phù hợp cho
                        dự tiệc, công sở, đi biển và phong cách hằng ngày.
                    </p>
                </div>

                <Link to="/" className="store-back-btn">
                    <i className="fa-solid fa-house"></i>
                    Về trang chủ
                </Link>
            </section>

            <section className="store-layout">
                <aside className="store-filter-sidebar">
                    <div className="store-filter-box">
                        <h4>
                            <i className="fa-solid fa-layer-group"></i>
                            Danh mục
                        </h4>

                        <div className="store-filter-list">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    type="button"
                                    className={
                                        selectedCategory === category.name
                                            ? 'store-filter-item active'
                                            : 'store-filter-item'
                                    }
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    <i className={category.icon}></i>
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="store-filter-box">
                        <h4>
                            <i className="fa-solid fa-filter"></i>
                            Khoảng giá
                        </h4>

                        <div className="store-filter-list">
                            <button
                                type="button"
                                className={
                                    selectedPriceRange === 'all'
                                        ? 'store-filter-item active'
                                        : 'store-filter-item'
                                }
                                onClick={() => setSelectedPriceRange('all')}
                            >
                                <i className="fa-solid fa-border-all"></i>
                                <span>Tất cả mức giá</span>
                            </button>

                            <button
                                type="button"
                                className={
                                    selectedPriceRange === 'under500'
                                        ? 'store-filter-item active'
                                        : 'store-filter-item'
                                }
                                onClick={() => setSelectedPriceRange('under500')}
                            >
                                <i className="fa-solid fa-arrow-down-short-wide"></i>
                                <span>Dưới 500.000 đ</span>
                            </button>

                            <button
                                type="button"
                                className={
                                    selectedPriceRange === '500to1000'
                                        ? 'store-filter-item active'
                                        : 'store-filter-item'
                                }
                                onClick={() => setSelectedPriceRange('500to1000')}
                            >
                                <i className="fa-solid fa-money-bill-wave"></i>
                                <span>500.000 đ - 1.000.000 đ</span>
                            </button>

                            <button
                                type="button"
                                className={
                                    selectedPriceRange === 'over1000'
                                        ? 'store-filter-item active'
                                        : 'store-filter-item'
                                }
                                onClick={() => setSelectedPriceRange('over1000')}
                            >
                                <i className="fa-solid fa-arrow-up-short-wide"></i>
                                <span>Trên 1.000.000 đ</span>
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="store-products-area">
                    <div className="store-product-heading">
                        <div>
                            <h2>
                                <i className="fa-solid fa-store"></i>
                                Danh sách sản phẩm
                            </h2>

                            <p>
                                Đang hiển thị danh mục:{' '}
                                <strong>{selectedCategory}</strong>
                            </p>

                            {searchTerm && (
                                <p className="store-search-result">
                                    Kết quả tìm kiếm cho:{' '}
                                    <strong>{searchTerm}</strong>
                                </p>
                            )}
                        </div>

                        <span className="store-price-status">
                            {getPriceRangeText()}
                        </span>
                    </div>

                    <ProductList
                        selectedCategory={selectedCategory}
                        selectedPriceRange={selectedPriceRange}
                        searchTerm={searchTerm}
                    />
                </div>
            </section>
        </div>
    );
};

export default StorePage;