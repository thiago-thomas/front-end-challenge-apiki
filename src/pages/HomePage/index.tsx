import { useEffect, useState } from 'react';
import type { PostCardType } from '../../types/api';
import { PostCard } from '../../components/PostCard';
import './styles.css';

export function HomePage() {
  const [posts, setPosts] = useState<PostCardType[]>([]);

  async function loadPosts() {
    const result = await fetch(
      `https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518`
    );

    if (!result.ok) {
      console.error('Failed to fetch posts');
      return;
    }

    const data = await result.json();

    console.log(data);

    const formattedPosts = data.map((post: any):PostCardType => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: post.excerpt.rendered.replace("<p>", "").replace("</p>", ""),
      featuredImage: post._embedded['wp:featuredmedia'][0].source_url || undefined,
      altText: post._embedded['wp:featuredmedia'][0].alt_text || undefined,
      link: post.link,
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }));

    setPosts(formattedPosts);
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
