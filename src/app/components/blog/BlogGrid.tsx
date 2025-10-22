// src/app/components/blog/BlogGrid.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowUpRight, Eye } from 'lucide-react';
import { urlFor } from '../../../../lib/urlFor';
import { BlogPostCard } from '../../../../../kyoto-web-studio/sanity/sanity-utils-post';
import { OptimizedMotionDiv } from '../ui/OptimizedMotionDiv';

interface BlogGridProps {
	posts: BlogPostCard[];
	locale: string;
	isJapanese?: boolean;
}

export default function BlogGrid({ posts, locale, isJapanese }: BlogGridProps) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring' as const,
				stiffness: 100,
			},
		},
	};

	// Filter out posts without valid slugs
	const validPosts = posts.filter(post => post.slug?.current);

	if (validPosts.length === 0) {
		return (
			<div className="text-center py-12">
				<p className={`text-white/60 text-lg ${isJapanese ? 'font-notoSansJP' : ''}`}>
					No articles available at the moment.
				</p>
			</div>
		);
	}

	return (
		<OptimizedMotionDiv
			className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{validPosts.map((post) => {
				const publishedDate = new Date(
					post.publishedAt
				).toLocaleDateString(isJapanese ? 'ja-JP' : 'en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				});

				return (
					<motion.article
						key={post._id}
						variants={itemVariants}
						className="group"
					>
						<Link href={`/${locale}/blog/${post.slug.current}`}>
							<div className="h-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#06B6D4]/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl flex flex-col">
								{/* Featured Image */}
								{post.image && (
									<div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20">
										<Image
											src={urlFor(post.image, {
												width: 600,
												height: 400,
											})}
											alt={post.image.alt || ''}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-500"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								)}

								{/* Content */}
								<div className="p-6 flex-1 flex flex-col">
									{/* Categories */}
									{post.category &&
										post.category.length > 0 && (
											<div className="flex flex-wrap gap-2 mb-3">
												{post.category
													.slice(0, 2)
													.map((category) => (
														<span
															key={category._id}
															className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
															style={{
																backgroundColor: `${category.color || '#4F46E5'}80`,
															}}
														>
															{
																category.title[
																	locale as
																		| 'en'
																		| 'ja'
																]
															}
														</span>
													))}
											</div>
										)}

									{/* Title */}
									<h3
										className={`text-xl font-semibold text-white mb-3 group-hover:text-[#06B6D4] transition-colors line-clamp-2 flex-grow ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{post.name}
									</h3>

									{/* Summary */}
									{post.summaryShort && (
										<p
											className={`text-white/60 text-sm line-clamp-3 mb-4 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{post.summaryShort}
										</p>
									)}

									{/* Meta */}
									<div className="flex items-center justify-between text-white/50 text-xs mt-auto">
										<div className="flex items-center gap-3">
											<span className="flex items-center gap-1">
												<Calendar className="w-3 h-3" />
												{publishedDate}
											</span>
											{post.estimatedReadingTime && (
												<span className="flex items-center gap-1">
													<Clock className="w-3 h-3" />
													{post.estimatedReadingTime}{' '}
													min
												</span>
											)}
										</div>
										<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
									</div>

									{/* View count */}
									{post.views !== undefined &&
										post.views > 0 && (
											<div className="flex items-center gap-1 text-white/40 text-xs mt-2">
												<Eye className="w-3 h-3" />
												<span>
													{post.views.toLocaleString()}{' '}
													views
												</span>
											</div>
										)}
								</div>
							</div>
						</Link>
					</motion.article>
				);
			})}
		</OptimizedMotionDiv>
	);
}