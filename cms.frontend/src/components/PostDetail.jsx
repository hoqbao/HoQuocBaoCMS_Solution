import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import blogService from '../services/blogService';

const PostDetail = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                setLoading(true);

                const data = await blogService.getPostById(id);
                setPost(data);
            } catch (error) {
                console.error('Lỗi khi tải chi tiết bài viết:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetail();
    }, [id]);

    const formatDate = (dateValue) => {
        if (!dateValue) return 'Chưa có ngày';

        return new Date(dateValue).toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3 text-muted">Đang tải bài viết...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="alert alert-warning">
                Không tìm thấy bài viết này.
            </div>
        );
    }

    return (
        <div className="blog-detail-page">
            <div className="mb-3">
                <Link to="/" className="btn btn-outline-secondary">
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Quay lại trang chủ
                </Link>
            </div>

            <div className="blog-detail-card">
                {post.imageUrl ? (
                    <img
                        src={`https://localhost:7076${post.imageUrl}`}
                        alt={post.title}
                        className="blog-detail-image"
                    />
                ) : (
                    <div className="blog-detail-no-image">
                        <i className="fa-regular fa-image"></i>
                        <span>Chưa có ảnh bài viết</span>
                    </div>
                )}

                <div className="blog-detail-body">
                    <div className="blog-detail-meta">
                        <span>
                            <i className="fa-regular fa-calendar-days me-2"></i>
                            {formatDate(post.createdDate)}
                        </span>

                        <span>
                            <i className="fa-solid fa-folder-open me-2"></i>
                            {post.categoryName || 'Chưa có chuyên mục'}
                        </span>
                    </div>

                    <h1 className="blog-detail-title">
                        {post.title}
                    </h1>

                    <div
                        className="blog-detail-content"
                        dangerouslySetInnerHTML={{
                            __html: post.content || '<p>Bài viết chưa có nội dung.</p>'
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;