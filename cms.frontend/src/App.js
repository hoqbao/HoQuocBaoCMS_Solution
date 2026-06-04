import React from 'react';
import CategoryProductList from './components/CategoryProductList.jsx';
import ProductList from './components/ProductList.jsx';
import PostList from './components/PostList.jsx';
import './App.css';

function App() {
    return (
        <div className="container mt-5">
            <header className="pb-3 mb-4 border-bottom">
                <span className="fs-4 font-weight-bold text-dark text-uppercase">
                    👗 FASHION BOUTIQUE - THỜI TRANG CÔNG SỞ & DẠ HỘI
                </span>
            </header>

            <div className="row">
                <div className="col-md-4">
                    <CategoryProductList />
                </div>

                <div className="col-md-8">
                    <h4 className="mb-4 text-uppercase text-secondary font-weight-bold">
                        Bộ sưu tập mới nhất
                    </h4>

                    <ProductList />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    <PostList />
                </div>
            </div>
        </div>
    );
}

export default App;