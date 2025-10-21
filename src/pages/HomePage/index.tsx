import { useEffect, useState } from 'react';
import { PostCard } from '../../components/PostCard';
import './styles.css';
import { fetchPosts } from '../../services/api';
import type { PostCardType, PaginationInfo } from '../../types/api';
import { Loading } from '../../components/Loading';

export function HomePage() {
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  async function loadPosts(page: number = 1, append: boolean = false) {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const returnedPosts = await fetchPosts(page);

      //console.log(returnedPosts)

      if (!returnedPosts) {
        return;
      }

      if (append) {
        setPosts((prev) => [...prev, ...returnedPosts.posts]);
      } else {
        setPosts(returnedPosts.posts);
      }

      setPagination(returnedPosts.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function handleMore() {
    if (pagination?.hasNextPage && !loadingMore) {
      loadPosts(pagination.currentPage + 1, true);
    }
  }

  if (loading) {
    return <Loading text="Carregando postagens..." />;
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

            {pagination?.hasNextPage && (
              <div className="home-page__load-more">
                <button
                  className="home-page__load-more-button"
                  onClick={handleMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
