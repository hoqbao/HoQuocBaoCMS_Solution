import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogService.js';
import { IMAGE_BASE_URL } from '../config.js';

const PostDetail = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadPostDetail();
    }, [id]);

    const loadPostDetail = async () => {
        try {
            setLoading(true);
            setErrorMessage('');

            const data = await blogService.getPostById(id);

            setPost(data);
        } catch (error) {
            console.error('Lỗi khi tải chi tiết bài viết:', error);
            setErrorMessage('Không thể tải chi tiết bài viết.');
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return '';
        }

        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }

        return `${IMAGE_BASE_URL}${imageUrl}`;
    };

    const getPostContentHtml = (content) => {
        if (!content) {
            return '';
        }

        return content
            .replaceAll('src="/uploads/', `src="${IMAGE_BASE_URL}/uploads/`)
            .replaceAll("src='/uploads/", `src='${IMAGE_BASE_URL}/uploads/`)
            .replaceAll('src="/img/', `src="${IMAGE_BASE_URL}/img/`)
            .replaceAll("src='/img/", `src='${IMAGE_BASE_URL}/img/`);
    };
    if (loading) {
        return (
            <div className="post-detail-loading">
                Đang tải bài viết...
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="post-detail-error">
                {errorMessage}
            </div>
        );
    }

    if (!post) {
        return (
            <div className="post-detail-error">
                Không tìm thấy bài viết.
            </div>
        );
    }

    return (
        <article className="post-detail-page">
            {post.imageUrl && (
                <div className="post-detail-image-wrap">
                    <img
                        src={getImageUrl(post.imageUrl)}
                        alt={post.title}
                        className="post-detail-image"
                    />
                </div>
            )}

            <div className="post-detail-content-box">
                <span className="post-detail-category">
                    {post.categoryName || 'Tin tức'}
                </span>

                <h1>{post.title}</h1>

                <p className="post-detail-date">
                    Ngày đăng: {new Date(post.createdDate).toLocaleDateString('vi-VN')}
                </p>

                <div
                    className="post-detail-html-content"
                    dangerouslySetInnerHTML={{
                        __html: getPostContentHtml(post.content)
                    }}
                />
            </div>
        </article>
    );
};

export default PostDetail;