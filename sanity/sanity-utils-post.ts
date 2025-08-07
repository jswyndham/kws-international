// sanity/sanity-utils-post.ts
import { groq } from 'next-sanity';
import { client } from './lib/client';

// Type definitions
export interface BlogPost {
	_id: string;
	language: 'en' | 'ja';
	translation?: {
		_id: string;
		slug: { current: string };
		name: string;
		language: string;
	};
	name: string;
	slug: { current: string };
	pageName?: string;
	category: Category[];
	tag?: Tag[];
	image: {
		_type: 'image';
		asset: any;
		caption?: string;
		alt?: string;
	};
	content: any[];
	faqs?: any[];
	summary: string;
	summaryShort: string;
	description: string;
	author: Author[];
	publishedAt: string;
	modifiedAt?: string;
	views?: number;
	keywords?: string[];
	contentStrategy?: 'original' | 'translation' | 'adaptation';
	performanceNotes?: string;
	estimatedReadingTime?: number;
	relatedPosts?: BlogPostCard[];
}

export interface BlogPostCard {
	_id: string;
	language: 'en' | 'ja';
	name: string;
	slug: { current: string };
	image?: {
		_type: 'image';
		asset: any;
		alt?: string;
	};
	summary: string;
	summaryShort: string;
	category: Category[];
	tag?: Tag[];
	publishedAt: string;
	author: Array<{ name: string }>;
	views?: number;
	estimatedReadingTime?: number;
}

export interface Category {
	_id: string;
	title: { en: string; ja: string };
	slug: { current: string };
	color?: string;
	description?: { en: string; ja: string };
}

export interface Tag {
	_id: string;
	title: { en: string; ja: string };
	slug: { current: string };
}

export interface Author {
	_id: string;
	name: string;
	slug: { current: string };
	image?: any;
	biography?: { en: any[]; ja: any[] };
	social?: {
		twitter?: string;
		linkedin?: string;
		github?: string;
		website?: string;
	};
}

// ============================================
// QUERIES
// ============================================

// Get a single post by slug and language
const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && language == $language][0] {
    _id,
    language,
    "translation": translation-> {
      _id,
      slug,
      name,
      language
    },
    name,
    slug,
    pageName,
    category[]-> {
      _id,
      title,
      slug,
      color,
      description
    },
    tag[]-> {
      _id,
      title,
      slug
    },
    image,
    content,
    faqs[]-> {
      _id,
      question,
      answer
    },
    summary,
    summaryShort,
    description,
    author[]-> {
      _id,
      name,
      slug,
      image,
      biography,
      social
    },
    publishedAt,
    modifiedAt,
    views,
    keywords,
    contentStrategy,
    performanceNotes,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180),
    "relatedPosts": *[
      _type == "post" 
      && _id != ^._id 
      && language == ^.language
      && count(category[@._ref in ^.category[]._ref]) > 0
    ] | order(publishedAt desc) [0...3] {
      _id,
      language,
      name,
      slug,
      image,
      summary,
      summaryShort,
      category[]-> {
        _id,
        title,
        slug,
        color
      },
      publishedAt,
      author[]-> {
        name
      },
      views
    }
  }
`;

export async function getPostBySlug(
	slug: string,
	language: 'en' | 'ja'
): Promise<BlogPost | null> {
	return client.fetch(postBySlugQuery, { slug, language });
}

// Get all posts for blog listing page with pagination
const allPostsQuery = groq`
  {
    "posts": *[_type == "post" && language == $language] | order(publishedAt desc) [$start...$end] {
      _id,
      language,
      name,
      slug,
      image,
      summary,
      summaryShort,
      category[]-> {
        _id,
        title,
        slug,
        color
      },
      tag[]-> {
        _id,
        title,
        slug
      },
      publishedAt,
      author[]-> {
        name
      },
      views,
      "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
    },
    "total": count(*[_type == "post" && language == $language])
  }
`;

export async function getAllPosts(
	language: 'en' | 'ja',
	page: number = 1,
	pageSize: number = 9
): Promise<{ posts: BlogPostCard[]; total: number }> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;

	return client.fetch(allPostsQuery, { language, start, end });
}

// Get posts by category
const postsByCategoryQuery = groq`
  {
    "posts": *[
      _type == "post" 
      && language == $language 
      && $categorySlug in category[]->slug.current
    ] | order(publishedAt desc) [$start...$end] {
      _id,
      language,
      name,
      slug,
      image,
      summary,
      summaryShort,
      category[]-> {
        _id,
        title,
        slug,
        color
      },
      publishedAt,
      author[]-> {
        name
      },
      views,
      "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
    },
    "total": count(*[
      _type == "post" 
      && language == $language 
      && $categorySlug in category[]->slug.current
    ]),
    "category": *[_type == "category" && slug.current == $categorySlug][0] {
      _id,
      title,
      slug,
      description,
      color
    }
  }
`;

export async function getPostsByCategory(
	categorySlug: string,
	language: 'en' | 'ja',
	page: number = 1,
	pageSize: number = 9
): Promise<{ posts: BlogPostCard[]; total: number; category: Category }> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;

	return client.fetch(postsByCategoryQuery, {
		categorySlug,
		language,
		start,
		end,
	});
}

// Get posts by tag
const postsByTagQuery = groq`
  {
    "posts": *[
      _type == "post" 
      && language == $language 
      && $tagSlug in tag[]->slug.current
    ] | order(publishedAt desc) [$start...$end] {
      _id,
      language,
      name,
      slug,
      image,
      summary,
      summaryShort,
      category[]-> {
        _id,
        title,
        slug,
        color
      },
      tag[]-> {
        _id,
        title,
        slug
      },
      publishedAt,
      author[]-> {
        name
      },
      views,
      "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
    },
    "total": count(*[
      _type == "post" 
      && language == $language 
      && $tagSlug in tag[]->slug.current
    ]),
    "tag": *[_type == "tag" && slug.current == $tagSlug][0] {
      _id,
      title,
      slug
    }
  }
`;

export async function getPostsByTag(
	tagSlug: string,
	language: 'en' | 'ja',
	page: number = 1,
	pageSize: number = 9
): Promise<{ posts: BlogPostCard[]; total: number; tag: Tag }> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;

	return client.fetch(postsByTagQuery, { tagSlug, language, start, end });
}

// Search posts
const searchPostsQuery = groq`
  {
    "posts": *[
      _type == "post" 
      && language == $language
      && (
        name match $searchTerm
        || summary match $searchTerm
        || pt::text(content) match $searchTerm
        || $searchTerm in keywords[]
      )
    ] | score(
      boost(name match $searchTerm, 3),
      boost(summary match $searchTerm, 2),
      boost(pt::text(content) match $searchTerm, 1)
    ) | order(_score desc, publishedAt desc) [$start...$end] {
      _id,
      language,
      name,
      slug,
      image,
      summary,
      summaryShort,
      category[]-> {
        _id,
        title,
        slug,
        color
      },
      publishedAt,
      author[]-> {
        name
      },
      views,
      "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180),
      _score
    },
    "total": count(*[
      _type == "post" 
      && language == $language
      && (
        name match $searchTerm
        || summary match $searchTerm
        || pt::text(content) match $searchTerm
        || $searchTerm in keywords[]
      )
    ])
  }
`;

export async function searchPosts(
	searchTerm: string,
	language: 'en' | 'ja',
	page: number = 1,
	pageSize: number = 9
): Promise<{ posts: BlogPostCard[]; total: number }> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const formattedSearchTerm = `*${searchTerm}*`;

	return client.fetch(searchPostsQuery, {
		searchTerm: formattedSearchTerm,
		language,
		start,
		end,
	});
}

// Get all categories with post count
const allCategoriesQuery = groq`
  *[_type == "category"] | order(title.en asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": {
      "en": count(*[_type == "post" && language == "en" && references(^._id)]),
      "ja": count(*[_type == "post" && language == "ja" && references(^._id)])
    }
  }
`;

export async function getAllCategories(): Promise<
	(Category & { postCount: { en: number; ja: number } })[]
> {
	return client.fetch(allCategoriesQuery);
}

// Get all tags with post count
const allTagsQuery = groq`
  *[_type == "tag"] | order(title.en asc) {
    _id,
    title,
    slug,
    "postCount": {
      "en": count(*[_type == "post" && language == "en" && references(^._id)]),
      "ja": count(*[_type == "post" && language == "ja" && references(^._id)])
    }
  }
`;

export async function getAllTags(): Promise<
	(Tag & { postCount: { en: number; ja: number } })[]
> {
	return client.fetch(allTagsQuery);
}

// Get recent posts (for homepage or widgets)
const recentPostsQuery = groq`
  *[_type == "post" && language == $language] | order(publishedAt desc) [0...$limit] {
    _id,
    language,
    name,
    slug,
    image,
    summaryShort,
    category[]-> {
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    author[]-> {
      name
    }
  }
`;

export async function getRecentPosts(
	language: 'en' | 'ja',
	limit: number = 3
): Promise<BlogPostCard[]> {
	return client.fetch(recentPostsQuery, { language, limit });
}

// Get popular posts (by views)
const popularPostsQuery = groq`
  *[_type == "post" && language == $language && views > 0] | order(views desc) [0...$limit] {
    _id,
    language,
    name,
    slug,
    image,
    summaryShort,
    category[]-> {
      _id,
      title,
      slug,
      color
    },
    publishedAt,
    views,
    author[]-> {
      name
    }
  }
`;

export async function getPopularPosts(
	language: 'en' | 'ja',
	limit: number = 5
): Promise<BlogPostCard[]> {
	return client.fetch(popularPostsQuery, { language, limit });
}

// Get post slugs for static generation
const allPostSlugsQuery = groq`
  *[_type == "post"] {
    "slug": slug.current,
    language
  }
`;

export async function getAllPostSlugs(): Promise<
	{ slug: string; language: 'en' | 'ja' }[]
> {
	return client.fetch(allPostSlugsQuery);
}

// Update post views (to be called from API route)
export async function incrementPostViews(postId: string): Promise<void> {
	await client
		.patch(postId)
		.setIfMissing({ views: 0 })
		.inc({ views: 1 })
		.commit();
}
