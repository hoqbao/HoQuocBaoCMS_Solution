import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const BlogCategoryList = () => {
    const [blogCategories, setBlogCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogCategories = async () => {
            try {
                setLoading(true);
                const data = await blogService.getBlogCategories();
                setBlogCategories(data);
            } catch (error) {
                console.error("Lỗi hệ thống khi gọi API chuyên mục tin tức:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogCategories();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-3 text-muted small">
                Đang nạp các chuyên mục bài viết...
            </div>
        );
    }

    return (
        <div className="card shadow-sm mt-4 border-0">
            <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4">
                <h5 className="card-title text-uppercase font-weight-bold text-secondary mb-0">
                    <i className="fa-solid fa-tags mr-2 text-info"></i>
                    Chủ đề bài viết
                </h5>
            </div>

            <div className="card-body p-0">
                <div className="list-group list-group-flush">
                    {blogCategories.length === 0 ? (
                        <div className="p-4 text-center text-muted small">
                            Chưa có chủ đề tin tức nào.
                        </div>
                    ) : (
                        blogCategories.map((cate) => (
                            <a
                                key={cate.id}
                                href={`/blog/category/${cate.id}`}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3 text-dark text-decoration-none"
                            >
                                <span>
                                    <i className="fa-regular fa-hashtag mr-2 text-muted"></i>
                                    {cate.name}
                                </span>

                                <span className="badge badge-light border text-muted">
                                    Read
                                </span>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCategoryList;