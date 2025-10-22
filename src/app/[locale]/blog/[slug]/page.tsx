import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
	ArrowLeft,
	Calendar,
	Clock,
	User,
	Tag,
	Globe,
	Eye,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { PortableText } from '@portabletext/react';
import { createPortableTextComponents } from '@/app/components/blog/PortableTextComponents';
import {
	getPostBySlug,
	incrementPostViews,
} from '../../../../../../kyoto-web-studio/sanity/sanity-utils-post';
import { urlFor } from '../../../../../lib/urlFor';

type Props = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const post = await getPostBySlug(slug, locale as 'en' | 'ja');

	if (!post) return { title: 'Post Not Found' };

	const title = post.pageName || post.name;
	const description = post.description || post.summary;
	const keywords = post.keywords?.join(', ');

	const baseUrl = 'https://kyotowebstudio.com';
	const url = `${baseUrl}/${locale}/blog/${slug}`;

	return {
		title,
		description,
		keywords,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime: post.publishedAt,
			modifiedTime: post.modifiedAt,
			authors: post.author?.map((a) => a.name),
			url,
			images: post.image
				? [
						{
							url: urlFor(post.image, {
								width: 1200,
								height: 630,
							}),
							width: 1200,
							height: 630,
							alt: post.image.alt || '',
						},
					]
				: [],
			locale: locale === 'ja' ? 'ja_JP' : 'en_US',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: post.image
				? [urlFor(post.image, { width: 1200, height: 630 })]
				: [],
		},
		alternates: {
			canonical: url,
			languages: post.translation
				? {
						en:
							post.translation.language === 'en'
								? `/en/blog/${post.translation.slug.current}`
								: `/en/blog/${slug}`,
						ja:
							post.translation.language === 'ja'
								? `/ja/blog/${post.translation.slug.current}`
								: `/ja/blog/${slug}`,
					}
				: undefined,
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { locale, slug } = await params;
	const post = await getPostBySlug(slug, locale as 'en' | 'ja');
	const t = await getTranslations({ locale, namespace: 'Blog' });

	if (!post) {
		notFound();
	}

	// Increment view count
	await incrementPostViews(post._id);

	const isJapanese = locale === 'ja';
	const publishedDate = new Date(post.publishedAt).toLocaleDateString(
		isJapanese ? 'ja-JP' : 'en-US',
		{ year: 'numeric', month: 'long', day: 'numeric' }
	);

	// Get portable text components for the current locale
	const portableTextComponents = createPortableTextComponents(isJapanese);

	// Schema.org Article structured data
	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.name,
		description: post.description || post.summary,
		image: post.image
			? urlFor(post.image, { width: 1200, height: 630 })
			: undefined,
		datePublished: post.publishedAt,
		dateModified: post.modifiedAt || post.publishedAt,
		author: post.author?.map((a) => ({
			'@type': 'Person',
			name: a.name,
			url: a.social?.website,
		})),
		publisher: {
			'@type': 'Organization',
			name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			logo: {
				'@type': 'ImageObject',
				url: 'https://kyotowebstudio.com/images/logo.png',
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://kyotowebstudio.com/${locale}/blog/${slug}`,
		},
		keywords: post.keywords?.join(', '),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(articleJsonLd),
				}}
			/>

			<article className="min-h-screen bg-[#001F3F]">
				{/* Hero Section with Featured Image */}
				<section className="relative h-[70vh] min-h-[500px] flex items-end">
					{post.image && (
						<>
							<div className="absolute inset-0">
								<Image
									src={urlFor(post.image, {
										width: 1920,
										quality: 90,
									})}
									alt={post.image.alt || ''}
									fill
									className="object-cover"
									priority
									sizes="100vw"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/80 to-[#001F3F]/20" />
						</>
					)}

					<div className="relative z-10 w-full">
						<div className="max-w-7xl mx-auto px-6 pb-12">
							{/* Breadcrumb and Language Switcher */}
							<nav className="mb-6 flex items-center justify-between flex-wrap gap-4">
								<Link
									href={`/${locale}/blog`}
									className={`inline-flex items-center text-white/70 hover:text-[#06B6D4] transition-colors ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									<ArrowLeft className="w-4 h-4 mr-2" />
									{t('backToBlog')}
								</Link>

								{/* Language Switcher */}
								{post.translation && (
									<Link
										href={`/${post.translation.language}/blog/${post.translation.slug.current}`}
										className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
									>
										<Globe className="w-4 h-4 text-white" />
										<span
											className={`text-white text-sm font-medium ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{post.translation.language === 'en'
												? '🇬🇧 English'
												: '🇯🇵 日本語'}
										</span>
									</Link>
								)}
							</nav>

							{/* Categories */}
							{post.category && post.category.length > 0 && (
								<div className="flex flex-wrap gap-2 mb-6">
									{post.category.map((cat) => (
										<Link
											key={cat._id}
											href={`/${locale}/blog/category/${cat.slug.current}`}
											className="px-4 py-1.5 rounded-full text-sm font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
											style={{
												backgroundColor:
													cat.color || '#4F46E5',
												boxShadow: `0 4px 14px 0 ${cat.color || '#4F46E5'}40`,
											}}
										>
											{cat.title[locale as 'en' | 'ja']}
										</Link>
									))}
								</div>
							)}

							{/* Title */}
							<h1
								className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${
									isJapanese
										? 'font-zenOldMincho'
										: 'font-helvetica'
								}`}
							>
								{post.name}
							</h1>

							{/* Meta Information */}
							<div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
								{post.author && post.author.length > 0 && (
									<div className="flex items-center gap-2">
										<User className="w-4 h-4" />
										<span
											className={
												isJapanese
													? 'font-notoSansJP'
													: ''
											}
										>
											{post.author
												.map((a) => a.name)
												.join(', ')}
										</span>
									</div>
								)}
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<time dateTime={post.publishedAt}>
										{publishedDate}
									</time>
								</div>
								{post.estimatedReadingTime && (
									<div className="flex items-center gap-2">
										<Clock className="w-4 h-4" />
										<span>
											{post.estimatedReadingTime}{' '}
											{t('minRead')}
										</span>
									</div>
								)}
								{post.views !== undefined && post.views > 0 && (
									<div className="flex items-center gap-2">
										<Eye className="w-4 h-4" />
										<span>
											{post.views.toLocaleString()} views
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* Content Section */}
				<section className="py-12 md:py-20">
					<div className="max-w-4xl mx-auto px-6">
						{/* Summary/Excerpt */}
						{post.summary && (
							<div
								className={`text-xl text-white/80 mb-12 pb-8 border-b border-white/10 leading-relaxed ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{post.summary}
							</div>
						)}

						{/* Main Content */}
						<div className="prose prose-invert max-w-none">
							<PortableText
								value={post.content}
								components={portableTextComponents}
							/>
						</div>

						{/* Tags */}
						{post.tag && post.tag.length > 0 && (
							<div className="mt-16 pt-8 border-t border-white/10">
								<div className="flex items-center gap-3 flex-wrap">
									<Tag className="w-5 h-5 text-white/60" />
									{post.tag.map((tag) => (
										<Link
											key={tag._id}
											href={`/${locale}/blog/tag/${tag.slug.current}`}
											className={`text-[#06B6D4] hover:text-[#FF851B] transition-colors duration-300 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											#{tag.title[locale as 'en' | 'ja']}
										</Link>
									))}
								</div>
							</div>
						)}

						{/* Author Bio Section */}
						{post.author && post.author.length > 0 && (
							<div className="mt-16">
								{post.author.map((author) => (
									<div
										key={author._id}
										className="p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10"
									>
										<div className="flex items-start gap-6">
											{author.image && (
												<div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white/20">
													<Image
														src={urlFor(
															author.image,
															{
																width: 200,
																height: 200,
															}
														)}
														alt={author.name}
														fill
														className="object-cover"
													/>
												</div>
											)}
											<div className="flex-1">
												<h3
													className={`text-2xl font-semibold text-white mb-3 ${
														isJapanese
															? 'font-notoSansJP'
															: ''
													}`}
												>
													{author.name}
												</h3>

												{/* Author bio - if it exists and is portable text */}
												{author.biography &&
													author.biography[
														locale as 'en' | 'ja'
													] && (
														<div
															className={`text-white/70 mb-4 ${
																isJapanese
																	? 'font-notoSansJP'
																	: ''
															}`}
														>
															<PortableText
																value={
																	author
																		.biography[
																		locale as
																			| 'en'
																			| 'ja'
																	]
																}
																components={
																	portableTextComponents
																}
															/>
														</div>
													)}

												{/* Social Links */}
												{author.social && (
													<div className="flex gap-4 mt-4">
														{author.social
															.twitter && (
															<a
																href={
																	author
																		.social
																		.twitter
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-white/60 hover:text-[#06B6D4] transition-colors"
																aria-label="Twitter"
															>
																<svg
																	className="w-5 h-5"
																	fill="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
																</svg>
															</a>
														)}
														{author.social
															.linkedin && (
															<a
																href={
																	author
																		.social
																		.linkedin
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-white/60 hover:text-[#06B6D4] transition-colors"
																aria-label="LinkedIn"
															>
																<svg
																	className="w-5 h-5"
																	fill="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
																</svg>
															</a>
														)}
														{author.social
															.github && (
															<a
																href={
																	author
																		.social
																		.github
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-white/60 hover:text-[#06B6D4] transition-colors"
																aria-label="GitHub"
															>
																<svg
																	className="w-5 h-5"
																	fill="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
																</svg>
															</a>
														)}
														{author.social
															.website && (
															<a
																href={
																	author
																		.social
																		.website
																}
																target="_blank"
																rel="noopener noreferrer"
																className="text-white/60 hover:text-[#06B6D4] transition-colors"
																aria-label="Website"
															>
																<svg
																	className="w-5 h-5"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
																	/>
																</svg>
															</a>
														)}
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</section>

				{/* Related Posts Section */}
				{post.relatedPosts && post.relatedPosts.length > 0 && (
					<section className="py-16 bg-gradient-to-b from-[#001F3F] to-black">
						<div className="max-w-7xl mx-auto px-6">
							<h2
								className={`text-3xl md:text-4xl font-bold text-white mb-10 ${
									isJapanese
										? 'font-zenOldMincho'
										: 'font-helvetica'
								}`}
							>
								{t('relatedPosts')}
							</h2>

							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{post.relatedPosts.map((relatedPost) => (
									<Link
										key={relatedPost._id}
										href={`/${locale}/blog/${relatedPost.slug.current}`}
										className="group"
									>
										<article className="h-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#06B6D4]/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
											{relatedPost.image && (
												<div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20">
													<Image
														src={urlFor(
															relatedPost.image,
															{
																width: 600,
																height: 400,
															}
														)}
														alt={
															relatedPost.image
																.alt || ''
														}
														fill
														className="object-cover group-hover:scale-105 transition-transform duration-500"
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
												</div>
											)}
											<div className="p-6">
												{/* Categories */}
												{relatedPost.category &&
													relatedPost.category
														.length > 0 && (
														<div className="flex flex-wrap gap-2 mb-3">
															{relatedPost.category
																.slice(0, 2)
																.map((cat) => (
																	<span
																		key={
																			cat._id
																		}
																		className="px-2 py-1 rounded-full text-xs font-medium text-white/90"
																		style={{
																			backgroundColor: `${cat.color || '#4F46E5'}80`,
																		}}
																	>
																		{
																			cat
																				.title[
																				locale as
																					| 'en'
																					| 'ja'
																			]
																		}
																	</span>
																))}
														</div>
													)}

												<h3
													className={`text-lg font-semibold text-white mb-2 group-hover:text-[#06B6D4] transition-colors line-clamp-2 ${
														isJapanese
															? 'font-notoSansJP'
															: ''
													}`}
												>
													{relatedPost.name}
												</h3>

												{relatedPost.summaryShort && (
													<p
														className={`text-white/60 text-sm line-clamp-3 ${
															isJapanese
																? 'font-notoSansJP'
																: ''
														}`}
													>
														{
															relatedPost.summaryShort
														}
													</p>
												)}

												{/* View count if available */}
												{relatedPost.views !==
													undefined &&
													relatedPost.views > 0 && (
														<div className="mt-3 flex items-center gap-2 text-white/40 text-xs">
															<Eye className="w-3 h-3" />
															<span>
																{relatedPost.views.toLocaleString()}{' '}
																views
															</span>
														</div>
													)}
											</div>
										</article>
									</Link>
								))}
							</div>
						</div>
					</section>
				)}
			</article>
		</>
	);
}
