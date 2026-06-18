import React from 'react';
import { Link } from 'react-router-dom';
import PostList from './PostList.jsx';

const BlogPage = () => {
    return (
        <div className="blog-page">
            <section className="blog-page-banner">
                <div>
                    <span className="blog-page-tag">
                        QUOCBAO FASHION BLOG
                    </span>

                    <h1>
                        Xu hướng thời trang <br />
                        và cảm hứng phong cách
                    </h1>

                    <p>
                        Cập nhật các xu hướng mới, bí quyết phối đồ,
                        mẹo lựa chọn trang phục và những thông tin thời trang hữu ích.
                    </p>
                </div>

                <Link to="/" className="blog-page-back-btn">
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Về trang chủ
                </Link>
            </section>

            <section className="blog-page-content">
                <div className="blog-page-heading">
                    <div>
                        <h2>
                            <i className="fa-solid fa-newspaper me-2"></i>
                            Bài viết mới nhất
                        </h2>

                        <p>
                            Khám phá các bài viết về thời trang và phong cách sống.
                        </p>
                    </div>
                </div>

                <PostList />
            </section>
        </div>
    );
};

export default BlogPage;