import React, { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { Link } from 'react-router-dom';

const PostList = ({ limit }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const data = await blogService.getAllPosts();
                setPosts(data || []);
            } catch (error) {
                console.error('Lỗi khi tải bài viết:', error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return 'Chưa có ngày';
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return 'Chưa có ngày';
        }

        return date.toLocaleDateString('vi-VN');
    };

    const getShortContent = (content) => {
        if (!content) {
            return 'Khám phá những bí quyết phối đồ và xu hướng thời trang mới nhất.';
        }

        const plainText = content
            .replace(/<[^>]+>/g, '')
            .trim();

        if (plainText.length > 115) {
            return `${plainText.substring(0, 115)}...`;
        }

        return plainText;
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return null;
        }

        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }

        return `https://localhost:7076${imageUrl}`;
    };

    // limit = 3 thì chỉ lấy 3 bài đầu.
    // Không truyền limit thì lấy toàn bộ bài viết.
    const displayedPosts = limit ? posts.slice(0, limit) : posts;

    if (loading) {
        return (
            <div className="no-filter-product">
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                ></div>

                <h5>Đang tải bài viết...</h5>
            </div>
        );
    }

    return (
        <div className="trend-post-grid">
            {displayedPosts.length === 0 ? (
                <div className="no-filter-product">
                    <i className="fa-solid fa-newspaper"></i>
                    <h5>Chưa có bài viết nào</h5>
                    <p>Vui lòng thêm bài viết trong trang quản trị.</p>
                </div>
            ) : (
                displayedPosts.map((item) => {
                    const imageUrl = getImageUrl(item.imageUrl);

                    return (
                        <div className="trend-post-card" key={item.id}>
                            <div className="trend-post-image-box">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={item.title || 'Bài viết thời trang'}
                                        className="trend-post-image"
                                    />
                                ) : (
                                    <div className="trend-post-no-image">
                                        <i className="fa-regular fa-image"></i>
                                        <span>Chưa có ảnh</span>
                                    </div>
                                )}
                            </div>

                            <div className="trend-post-body">
                                <div className="trend-post-date">
                                    <i className="fa-regular fa-calendar-days me-2"></i>
                                    {formatDate(item.createdDate)}
                                </div>

                                <h5 className="trend-post-title">
                                    {item.title || 'Bài viết thời trang'}
                                </h5>

                                <p className="trend-post-desc">
                                    {getShortContent(item.content)}
                                </p>

                                <Link
                                    to={`/blog/${item.id}`}
                                    className="trend-read-btn"
                                >
                                    Đọc bài viết
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default PostList;