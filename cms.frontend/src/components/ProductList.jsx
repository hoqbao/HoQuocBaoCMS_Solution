import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';

const ProductList = ({
    selectedCategory = 'Tất cả sản phẩm',
    selectedPriceRange = 'all',
    searchTerm = ''
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const data = await productService.getAllProducts();
                setProducts(data || []);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const normalizeText = (text) => {
        return (text || '')
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .trim()
            .toLowerCase();
    };

    const filterByPrice = (product) => {
        const price = Number(product.price);

        switch (selectedPriceRange) {
            case 'under500':
                return price < 500000;

            case '500to1000':
                return price >= 500000 && price <= 1000000;

            case 'over1000':
                return price > 1000000;

            default:
                return true;
        }
    };

    const normalizedSearchTerm = normalizeText(searchTerm);

    const filteredProducts = products.filter((item) => {
        const isSameCategory =
            selectedCategory === 'Tất cả sản phẩm' ||
            normalizeText(item.categoryProductName) ===
            normalizeText(selectedCategory);

        const isSamePriceRange = filterByPrice(item);

        const isSearchMatched =
            !normalizedSearchTerm ||
            normalizeText(item.name).includes(normalizedSearchTerm) ||
            normalizeText(item.description).includes(normalizedSearchTerm) ||
            normalizeText(item.categoryProductName).includes(normalizedSearchTerm);

        return isSameCategory && isSamePriceRange && isSearchMatched;
    });

    if (loading) {
        return (
            <div className="no-filter-product">
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                ></div>

                <h5>Đang tải sản phẩm...</h5>
            </div>
        );
    }

    return (
        <div className="product-shop-grid">
            {filteredProducts.length === 0 ? (
                <div className="no-filter-product">
                    <i className="fa-solid fa-box-open"></i>

                    <h5>Không tìm thấy sản phẩm phù hợp</h5>

                    <p>
                        Hãy thử tìm từ khóa khác, chọn danh mục khác hoặc thay đổi khoảng giá.
                    </p>
                </div>
            ) : (
                filteredProducts.map((item) => (
                    <div className="shop-product-card" key={item.id}>
                        <div className="product-badge">
                            Bán chạy
                        </div>

                        <div className="product-img-box">
                            {item.imageUrl ? (
                                <img
                                    src={`https://localhost:7076${item.imageUrl}`}
                                    alt={item.name}
                                />
                            ) : (
                                <div className="no-product-img">
                                    Chưa có ảnh
                                </div>
                            )}
                        </div>

                        <div className="product-card-body">
                            <h5 title={item.name}>
                                {item.name}
                            </h5>

                            <p className="product-price">
                                {new Intl.NumberFormat('vi-VN').format(item.price)} đ
                            </p>

                            <div className="product-card-actions">
                                <Link
                                    to={`/product/${item.id}`}
                                    className="detail-btn"
                                >
                                    <i className="fa-solid fa-eye me-1"></i>
                                    Chi tiết
                                </Link>

                                <Link
                                    to={`/product/${item.id}`}
                                    className="buy-btn"
                                >
                                    <i className="fa-solid fa-cart-shopping me-1"></i>
                                    Mua ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;