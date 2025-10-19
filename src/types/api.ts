export interface PostCardType {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  altText?: string;
  link: string;
  date: string;
}

export interface PostDetail extends PostCardType {
  content: string
}

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
  };
  link: string;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    sizes: {
      medium?: {
        source_url: string;
        width: number;
        height: number;
      };
      large?: {
        source_url: string;
        width: number;
        height: number;
      };
      medium_large?: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}
