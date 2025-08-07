import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BlogHero from '../../../app/components/blog/BlogHero';
import BlogGrid from '../../../app/components/blog/BlogGrid';
import BlogSidebar from '../../../app/components/blog/BlogSidebar';
import Pagination from '../../../app/components/blog/Pagination';
import {
	getAllPosts,
	getPostsByCategory,
	getPostsByTag,
	searchPosts,
	getAllCategories,
	getAllTags,
} from '../../../../sanity/sanity-utils-post';

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{
		category?: string;
		tag?: string;
		page?: string;
		search?: string;
	}>;
};

const POSTS_PER_PAGE = 9;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'BlogMeta' });
	const isJapanese = locale === 'ja';

	const baseUrl = 'https://kyotowebstudio.com';
	const url = `${baseUrl}/${locale}/blog`;

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url,
			siteName: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			images: [
				{
					url: '/og-blog.jpg',
					width: 1200,
					height: 630,
					alt: t('ogImageAlt'),
				},
			],
			locale: locale === 'ja' ? 'ja_JP' : 'en_US',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/twitter-blog.jpg'],
		},
		alternates: {
			canonical: url,
			languages: {
				en: '/en/blog',
				ja: '/ja/blog',
			},
		},
	};
}

export default async function BlogPage({ params, searchParams }: Props) {
	const { locale } = await params;
	const { category, tag, page = '1', search } = await searchParams;
	const t = await getTranslations({ locale, namespace: 'Blog' });
	const isJapanese = locale === 'ja';
	const currentPage = parseInt(page, 10) || 1;

	// Fetch posts based on filters
	let posts;
	let total;
	let currentCategory = null;
	let currentTag = null;

	if (search) {
		// Search posts
		const result = await searchPosts(
			search,
			locale as 'en' | 'ja',
			currentPage,
			POSTS_PER_PAGE
		);
		posts = result.posts;
		total = result.total;
	} else if (category) {
		// Filter by category
		const result = await getPostsByCategory(
			category,
			locale as 'en' | 'ja',
			currentPage,
			POSTS_PER_PAGE
		);
		posts = result.posts;
		total = result.total;
		currentCategory = result.category;
	} else if (tag) {
		// Filter by tag
		const result = await getPostsByTag(
			tag,
			locale as 'en' | 'ja',
			currentPage,
			POSTS_PER_PAGE
		);
		posts = result.posts;
		total = result.total;
		currentTag = result.tag;
	} else {
		// Get all posts
		const result = await getAllPosts(
			locale as 'en' | 'ja',
			currentPage,
			POSTS_PER_PAGE
		);
		posts = result.posts;
		total = result.total;
	}

	// Get categories and tags for sidebar
	const categories = await getAllCategories();
	const tags = await getAllTags();

	const totalPages = Math.ceil(total / POSTS_PER_PAGE);

	// Schema.org Blog structured data
	const blogJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: isJapanese
			? '京都ウェブスタジオ ブログ'
			: 'Kyoto Web Studio Blog',
		description: t('heroSubtitle'),
		url: `https://kyotowebstudio.com/${locale}/blog`,
		publisher: {
			'@type': 'Organization',
			name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			logo: {
				'@type': 'ImageObject',
				url: 'https://kyotowebstudio.com/images/logo.png',
			},
		},
		blogPost: posts.map((post) => ({
			'@type': 'BlogPosting',
			headline: post.name,
			url: `https://kyotowebstudio.com/${locale}/blog/${post.slug.current}`,
			datePublished: post.publishedAt,
			author: post.author?.map((a) => ({
				'@type': 'Person',
				name: a.name,
			})),
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
			/>

			<div className="min-h-screen bg-[#001F3F]">
				{/* Hero Section */}
				<BlogHero
					title={t('heroTitle')}
					subtitle={t('heroSubtitle')}
					isJapanese={isJapanese}
					currentCategory={currentCategory}
					currentTag={currentTag}
					search={search}
					locale={locale}
				/>

				{/* Main Content */}
				<section className="py-12 md:py-20">
					<div className="max-w-7xl mx-auto px-6">
						<div className="grid lg:grid-cols-4 gap-8">
							{/* Sidebar */}
							<aside className="lg:col-span-1">
								<div className="sticky top-24">
									<BlogSidebar
										categories={categories}
										tags={tags}
										currentCategory={category}
										currentTag={tag}
										locale={locale}
										translations={{
											searchPlaceholder:
												t('searchPlaceholder'),
											searchButton: t('searchButton'),
											categoriesTitle:
												t('categoriesTitle'),
											tagsTitle: t('tagsTitle'),
											allCategories: t('allCategories'),
											popularPosts: t('popularPosts'),
										}}
									/>
								</div>
							</aside>

							{/* Blog Posts Grid */}
							<main className="lg:col-span-3">
								{/* Results count and filters */}
								<div className="mb-8">
									<div className="flex items-center justify-between">
										<p
											className={`text-white/70 ${isJapanese ? 'font-notoSansJP' : ''}`}
										>
											{search && (
												<span>
													{t('searchResults', {
														term: search,
														count: total,
													})}
												</span>
											)}
											{currentCategory && (
												<span>
													{t('categoryResults', {
														category:
															currentCategory
																.title[
																locale as
																	| 'en'
																	| 'ja'
															],
														count: total,
													})}
												</span>
											)}
											{currentTag && (
												<span>
													{t('tagResults', {
														tag: currentTag.title[
															locale as
																| 'en'
																| 'ja'
														],
														count: total,
													})}
												</span>
											)}
											{!search &&
												!currentCategory &&
												!currentTag && (
													<span>
														{t('totalPosts', {
															count: total,
														})}
													</span>
												)}
										</p>

										{/* Clear filters */}
										{(search ||
											currentCategory ||
											currentTag) && (
											<a
												href={`/${locale}/blog`}
												className={`text-[#06B6D4] hover:text-[#FF851B] transition-colors text-sm ${
													isJapanese
														? 'font-notoSansJP'
														: ''
												}`}
											>
												{t('clearFilters')}
											</a>
										)}
									</div>
								</div>

								{posts.length > 0 ? (
									<>
										<BlogGrid
											posts={posts}
											locale={locale}
											isJapanese={isJapanese}
										/>

										{/* Pagination */}
										{totalPages > 1 && (
											<div className="mt-12">
												<Pagination
													currentPage={currentPage}
													totalPages={totalPages}
													baseUrl={`/${locale}/blog`}
													queryParams={{
														category,
														tag,
														search,
													}}
												/>
											</div>
										)}
									</>
								) : (
									<div className="text-center py-16">
										<div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4">
											<svg
												className="w-10 h-10 text-white/40"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
												/>
											</svg>
										</div>
										<p
											className={`text-white/60 text-lg mb-2 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t('noPosts')}
										</p>
										<p
											className={`text-white/40 text-sm ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t('noPostsDescription')}
										</p>
									</div>
								)}
							</main>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
