import React, { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await blogService.getAllPosts();
                setPosts(data);
            } catch (error) {
                console.error('Lỗi khi tải bài viết:', error);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateValue) => {
        if (!dateValue) return 'Chưa có ngày';

        return new Date(dateValue).toLocaleDateString('vi-VN');
    };

    const getShortContent = (content) => {
        if (!content) return 'Khám phá những bí quyết phối đồ và xu hướng thời trang mới nhất.';

        const plainText = content.replace(/<[^>]+>/g, '');

        if (plainText.length > 115) {
            return plainText.substring(0, 115) + '...';
        }

        return plainText;
    };

    return (
        <div className="trend-post-grid">
            {posts.map(item => (
                <div className="trend-post-card" key={item.id}>
                    <div className="trend-post-image-box">
                        {item.imageUrl ? (
                            <img
                                src={`https://localhost:7076${item.imageUrl}`}
                                alt={item.title}
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
                            {item.title}
                        </h5>

                        <p className="trend-post-desc">
                            {getShortContent(item.content)}
                        </p>

                        <Link to={`/blog/${item.id}`} className="trend-read-btn">
                            Đọc bài viết
                            <i className="fa-solid fa-arrow-right ms-2"></i>
                        </Link>                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;