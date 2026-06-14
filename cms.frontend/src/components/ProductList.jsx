import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService';

const ProductList = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === 'Tất cả sản phẩm'
        ? products
        : products.filter(item =>
            item.categoryProductName &&
            item.categoryProductName.toLowerCase() === selectedCategory.toLowerCase()
        );

    return (
        <div className="product-shop-grid">
            {filteredProducts.length === 0 ? (
                <div className="no-filter-product">
                    <i className="fa-solid fa-box-open"></i>
                    <h5>Không có sản phẩm trong danh mục này</h5>
                    <p>Vui lòng chọn danh mục khác hoặc thêm sản phẩm mới trong admin.</p>
                </div>
            ) : (
                filteredProducts.map(item => (
                    <div className="shop-product-card" key={item.id}>
                        <div className="product-badge">
                            Bán chạy / Còn ở chợ
                        </div>

                        <div className="product-img-box">
                            {item.imageUrl ? (
                                <img
                                    src={`https://localhost:7076${item.imageUrl}`}
                                    alt={item.name}
                                />
                            ) : (
                                <div className="no-product-img">
                                    No image
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