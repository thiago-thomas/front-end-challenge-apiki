import type { PostCardType } from '../../types/api';
import { Link } from 'react-router-dom';
import './styles.css';

interface PostCardProps {
  post: PostCardType;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <Link to={post.link} className="post-card__link">
        {post.featuredImage && (
          <div className="post-card__image-container">
            <img
              src={post.featuredImage}
              alt={post.altText || post.title}
              className="post-card__image"
            />
          </div>
        )}

        <div className="post-card__content">
          <h2 className="post-card__title">{post.title}</h2>
          <p className="post-card__excerpt">{post.excerpt}</p>
          <div className="post-card__meta">
            <time className="post-card__date">{post.date}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
