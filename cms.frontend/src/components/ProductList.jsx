import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/productService.js';
import { IMAGE_BASE_URL } from '../config.js';

const ProductList = ({
    selectedCategory = 'Tất cả sản phẩm',
    selectedPriceRange = 'all',
    searchTerm = '',
    limit = null
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setErrorMessage('');

            const data = await productService.getAllProducts();

            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Lỗi khi tải danh sách sản phẩm:', error);
            setErrorMessage('Không thể tải danh sách sản phẩm. Vui lòng kiểm tra API.');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) {
            return 'Liên hệ';
        }

        return Number(price).toLocaleString('vi-VN') + ' đ';
    };

    const normalizeText = (text) => {
        return (text || '')
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    };

    const isMatchCategory = (product) => {
        if (selectedCategory === 'Tất cả sản phẩm') {
            return true;
        }

        return normalizeText(product.categoryProductName) === normalizeText(selectedCategory);
    };

    const isMatchPrice = (product) => {
        const price = Number(product.price || 0);

        if (selectedPriceRange === 'all') {
            return true;
        }

        if (selectedPriceRange === 'under500') {
            return price < 500000;
        }

        if (selectedPriceRange === '500to1000') {
            return price >= 500000 && price <= 1000000;
        }

        if (selectedPriceRange === 'over1000') {
            return price > 1000000;
        }

        return true;
    };

    const isMatchSearch = (product) => {
        const keyword = normalizeText(searchTerm);

        if (!keyword) {
            return true;
        }

        const productName = normalizeText(product.name);

        return productName.includes(keyword);
    };

    const addToCart = (product) => {
        const stockQuantity = Number(product.stockQuantity || 0);

        if (stockQuantity <= 0) {
            alert('Sản phẩm đã hết hàng!');
            return;
        }

        const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = currentCart.find(
            (item) => Number(item.id) === Number(product.id)
        );

        let updatedCart = [];

        if (existingItem) {
            const newQuantity = Number(existingItem.quantity || 0) + 1;

            if (newQuantity > stockQuantity) {
                alert('Số lượng sản phẩm trong kho không đủ!');
                return;
            }

            updatedCart = currentCart.map((item) =>
                Number(item.id) === Number(product.id)
                    ? {
                        ...item,
                        quantity: newQuantity
                    }
                    : item
            );
        } else {
            updatedCart = [
                ...currentCart,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    categoryProductName: product.categoryProductName,
                    stockQuantity: stockQuantity,
                    quantity: 1
                }
            ];
        }

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));

        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    const filteredProducts = products.filter((product) => {
        return (
            isMatchCategory(product) &&
            isMatchPrice(product) &&
            isMatchSearch(product)
        );
    });

    const displayProducts = limit
        ? filteredProducts.slice(0, limit)
        : filteredProducts;

    if (loading) {
        return (
            <div className="product-loading">
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Đang tải sản phẩm...</span>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="product-empty">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <h4>{errorMessage}</h4>
                <p>Hãy mở thử API: {process.env.REACT_APP_API_URL}/Products</p>
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="product-empty product-empty-illustration">
                <div className="empty-icon-circle">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <h4>Không tìm thấy sản phẩm phù hợp</h4>

                <p>
                    Không có sản phẩm nào khớp với danh mục, khoảng giá hoặc từ khóa bạn đang tìm.
                </p>

                <div className="empty-suggestion">
                    <span>
                        <i className="fa-solid fa-lightbulb"></i>
                        Gợi ý:
                    </span>
                    Thử chọn “Tất cả sản phẩm” hoặc nhập từ khóa ngắn hơn.
                </div>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {displayProducts.map((product) => {
                const imageUrl = product.imageUrl
                    ? `${IMAGE_BASE_URL}${product.imageUrl}`
                    : '/no-image.png';

                return (
                    <div className="product-card" key={product.id}>
                        <div className="product-image-wrap">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="product-image"
                            />

                            <span className="product-category-badge">
                                {product.categoryProductName || 'Chưa có danh mục'}
                            </span>
                        </div>

                        <div className="product-card-body">
                            <h4>{product.name}</h4>

                            <p className="product-description">
                                {product.description || 'Sản phẩm thời trang cao cấp'}
                            </p>

                            <div className="product-meta">
                                <span className="product-price">
                                    {formatPrice(product.price)}
                                </span>

                                <span className="product-stock">
                                    Còn: {product.stockQuantity ?? 0}
                                </span>
                            </div>

                            <div className="product-actions">
                                <Link
                                    to={`/product/${product.id}`}
                                    className="product-detail-btn"
                                >
                                    <i className="fa-solid fa-eye"></i>
                                    <span>Xem chi tiết</span>
                                </Link>

                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    onClick={() => addToCart(product)}
                                    title="Thêm vào giỏ hàng"
                                >
                                    <i className="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;