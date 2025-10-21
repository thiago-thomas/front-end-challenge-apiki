import type {
  PostCardType,
  PostDetail,
  WordPressPost,
  PaginationInfo,
} from '../types/api';

const API_BASE_URL = 'https://blog.apiki.com/wp-json/wp/v2';

function extractPaginationInfo(
  response: Response,
  currentPage: number
): PaginationInfo {
  const total = parseInt(response.headers.get('X-WP-Total') || '0');
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

  return {
    total,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
  };
}

function extractFeaturedImage(
  post: WordPressPost
): { url: string; alt: string } | null {
  if (!post._embedded?.['wp:featuredmedia']?.[0]) {
    return null;
  }

  const media = post._embedded['wp:featuredmedia'][0];
  const sizes = media.media_details?.sizes;

  // Prioridade: medium_large > large > medium > source_url
  const imageUrl =
    sizes?.['medium_large']?.source_url ||
    sizes?.large?.source_url ||
    sizes?.medium?.source_url ||
    media.source_url;

  return {
    url: imageUrl,
    alt: media.alt_text || post.title.rendered,
  };
}

function transformPostsToPostCard(post: WordPressPost): PostCardType {
  const featuredImage = extractFeaturedImage(post);

  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // Remove HTML tags
    featuredImage: featuredImage?.url,
    altText: featuredImage?.alt,
    link: post.link,
    date: new Date(post.date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  };
}

function transformPostToPostDetail(post: WordPressPost): PostDetail {
  const PostCard = transformPostsToPostCard(post);

  return {
    ...PostCard,
    content: post.content.rendered,
  };
}

export async function fetchPosts(page: number = 1) {
  const response = await fetch(
    `${API_BASE_URL}/posts?_embed&categories=518&page=${page}`
  );

  if (!response.ok) {
    console.error('Failed to fetch posts');
    return;
  }

  //console.log('resposta do server:',response)

  const postsData: WordPressPost[] = await response.json();
  const pagination = extractPaginationInfo(response, page);


  return {
    posts: postsData.map(transformPostsToPostCard),
    pagination,
  };
}

export async function fetchPostBySlug(slug: string) {
  const response = await fetch(`${API_BASE_URL}/posts?_embed&slug=${slug}`);

  if (!response.ok) {
    console.error('Failed to fetch posts');
    return;
  }

  const postDataBySlug: WordPressPost[] = await response.json();

  //console.log(postDataBySlug);

  if (postDataBySlug.length === 0) {
    return null;
  }

  const postSlugFormatted = transformPostToPostDetail(postDataBySlug[0]);

  return postSlugFormatted;
}
