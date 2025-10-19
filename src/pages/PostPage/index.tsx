import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPostBySlug } from '../../services/api';
import type { PostDetail } from '../../types/api';
import './styles.css';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    const loadPost = async () => {
      const postData = await fetchPostBySlug(slug);
      if (!postData) {
        console.error('Post não encontrado');
        return;
      }
      setPost(postData);
    }

    loadPost();
  }, [slug, navigate]);

  function handleGoHome() {
    navigate('/');
  }

  if (!post) {
    return (
      <div className="post-page">
        <div className="container">
          <div className="post-page__not-found">
            <h2>Post não encontrado</h2>
            <p>O post que você está procurando não existe ou foi removido.</p>
            <Link to="/" className="post-page__back-link">
              Voltar ao Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="container">
        <nav className="post-page__breadcrumb">
          <Link to="/" className="post-page__breadcrumb-link">
            Blog
          </Link>
          <span className="post-page__breadcrumb-separator">/</span>
          <span className="post-page__breadcrumb-current">Post</span>
        </nav>

        <article className="post-page__article">
          <header className="post-page__header">
            {post.featuredImage && (
              <div className="post-page__image-container">
                <img
                  src={post.featuredImage}
                  alt={post.altText || post.title}
                  className="post-page__image"
                />
              </div>
            )}

            <div className="post-page__meta">
              <time className="post-page__date">{post.date}</time>
            </div>

            <h1 className="post-page__title">{post.title}</h1>
          </header>

          <div className="post-page__content">
            <div className="post-page__body" dangerouslySetInnerHTML={{__html: post.content}}></div>
          </div>
        </article>
        
        <footer className="post-page__footer">
          <button className="post-page__back-button" onClick={handleGoHome}>
            Voltar ao blog
          </button>
        </footer>
      </div>
    </div>
  );
}
