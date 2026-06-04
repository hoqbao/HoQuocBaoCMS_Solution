import React from 'react';
import CategoryProductList from './components/CategoryProductList.jsx';
import BlogCategoryList from './components/BlogCategoryList.jsx';
import PostList from './components/PostList.jsx';
import './App.css';

function App() {
    return (
        <div className="container mt-5">
            <header className="pb-3 mb-4 border-bottom d-flex justify-content-between align-items-center">
                <span className="fs-4 font-weight-bold text-dark text-uppercase">
                    👗 Fashion Boutique - Hệ Thống Quản Trị Nội Dung & Bán Hàng
                </span>

                <span className="badge badge-success px-3 py-2">
                    ASP.NET Core + ReactJS
                </span>
            </header>

            <div className="row">
                {/* CỘT TRÁI */}
                <div className="col-md-4">
                    <CategoryProductList />

                    <BlogCategoryList />
                </div>

                {/* CỘT PHẢI */}
                <div className="col-md-8">
                    <PostList />
                </div>
            </div>

            <footer className="pt-3 mt-5 text-muted border-top text-center small">
                <p>
                    © 2026 - Đồ án ASP.NET Core Web API kết hợp ReactJS Client-side
                </p>
            </footer>
        </div>
    );
}

export default App;