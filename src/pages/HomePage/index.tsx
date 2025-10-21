import { useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard';
import './styles.css';
import { fetchPosts } from '../../services/api';
import type { PostCardType } from '../../types/api';
import { Loading } from '../../components/Loading';

export function HomePage() {
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    try {
      setLoading(true)
      const formattedPosts = await fetchPosts();
  
      if (!formattedPosts) {
        return;
      }
      setPosts(formattedPosts.posts);

    } catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  if(loading) {
    return <Loading text="Carregando postagens..." />
  }

  return (
    <div className="home-page">
      <div className="container">
        <header className="home-page__header">
          <h1 className="home-page__title">Apiki Blog - Desenvolvimento</h1>
          <p className="home-page__subtitle">
            Bem-vindo ao Blog Apiki! Aqui você encontrará artigos, tutoriais e
            insights sobre desenvolvimento web, linguagens de programação,
            frameworks e melhores práticas. Mantenha-se atualizado com as
            últimas tendências e aprimore suas habilidades de codificação com
            nosso conteúdo especializado.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="home-page__empty">
            <h2>Postagens não encontrada</h2>
            <p>Não há postagens disponível no momento</p>
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
