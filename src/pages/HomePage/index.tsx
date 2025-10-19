import { useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard';
import './styles.css';
import { fetchPosts } from '../../services/api';
import type { PostCardType } from '../../types/api';

export function HomePage() {
  const [posts, setPosts] = useState<PostCardType[]>([]);

  async function loadPosts() {
    const formattedPosts = await fetchPosts();

    if (!formattedPosts) {
      return;
    }
    setPosts(formattedPosts.posts);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="home-page">
      <div className="container">
        <header className="home-page__header">
          <h1 className="home-page__title">Apiki Blog - Development</h1>
          <p className="home-page__subtitle">
            Welcome to the Apiki Blog! Here you'll find articles, tutorials, and
            insights on web development, programming languages, frameworks, and
            best practices. Stay updated with the latest trends and enhance your
            coding skills with our expert content.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="home-page__empty">
            <h2>Posts not found</h2>
            <p>It's not posts available in the moment</p>
          </div>
        ) : (
          <>
            <div className="home-page__grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
