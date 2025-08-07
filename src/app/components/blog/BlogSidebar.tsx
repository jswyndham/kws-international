// src/app/components/blog/BlogSidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Tag, Folder, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogSidebarProps {
	categories: any[];
	tags: any[];
	currentCategory?: string;
	currentTag?: string;
	locale: string;
	translations: {
		searchPlaceholder: string;
		searchButton: string;
		categoriesTitle: string;
		tagsTitle: string;
		allCategories: string;
		popularPosts: string;
	};
}

export default function BlogSidebar({
	categories,
	tags,
	currentCategory,
	currentTag,
	locale,
	translations,
}: BlogSidebarProps) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const isJapanese = locale === 'ja';

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			router.push(
				`/${locale}/blog?search=${encodeURIComponent(searchTerm)}`
			);
		} else {
			router.push(`/${locale}/blog`);
		}
	};

	return (
		<div className="space-y-8">
			{/* Search */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<form onSubmit={handleSearch} className="relative">
					<input
						type="text"
						placeholder={translations.searchPlaceholder}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={`w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#06B6D4] focus:bg-white/15 transition-all duration-300 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					/>
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
					<button
						type="submit"
						className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#06B6D4] text-white text-sm rounded-md hover:bg-[#06B6D4]/80 transition-colors"
					>
						{translations.searchButton}
					</button>
				</form>
			</motion.div>

			{/* Categories */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<h3
					className={`flex items-center gap-2 text-lg font-semibold text-white mb-4 ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
				>
					<Folder className="w-5 h-5 text-[#06B6D4]" />
					{translations.categoriesTitle}
				</h3>
				<div className="space-y-2">
					<Link
						href={`/${locale}/blog`}
						className={`block px-4 py-2.5 rounded-lg transition-all duration-300 ${
							!currentCategory && !currentTag
								? 'bg-gradient-to-r from-[#FF851B] to-[#FF851B]/80 text-white shadow-lg'
								: 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
						} ${isJapanese ? 'font-notoSansJP' : ''}`}
					>
						{translations.allCategories}
					</Link>
					{categories.map((category) => {
						const postCount =
							category.postCount[locale as 'en' | 'ja'];
						if (postCount === 0) return null;

						return (
							<Link
								key={category._id}
								href={`/${locale}/blog?category=${category.slug.current}`}
								className={`block px-4 py-2.5 rounded-lg transition-all duration-300 group ${
									currentCategory === category.slug.current
										? 'text-white shadow-lg'
										: 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
								} ${isJapanese ? 'font-notoSansJP' : ''}`}
								style={{
									backgroundColor:
										currentCategory ===
										category.slug.current
											? category.color || '#4F46E5'
											: undefined,
								}}
							>
								<span className="flex justify-between items-center">
									<span className="flex items-center gap-2">
										<span
											className="w-2 h-2 rounded-full"
											style={{
												backgroundColor:
													category.color || '#4F46E5',
											}}
										/>
										{category.title[locale as 'en' | 'ja']}
									</span>
									<span className="text-xs opacity-70">
										{postCount}
									</span>
								</span>
							</Link>
						);
					})}
				</div>
			</motion.div>

			{/* Tags */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<h3
					className={`flex items-center gap-2 text-lg font-semibold text-white mb-4 ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
				>
					<Tag className="w-5 h-5 text-[#06B6D4]" />
					{translations.tagsTitle}
				</h3>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => {
						const postCount = tag.postCount[locale as 'en' | 'ja'];
						if (postCount === 0) return null;

						return (
							<Link
								key={tag._id}
								href={`/${locale}/blog?tag=${tag.slug.current}`}
								className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
									currentTag === tag.slug.current
										? 'bg-[#06B6D4] text-white shadow-lg'
										: 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
								} ${isJapanese ? 'font-notoSansJP' : ''}`}
							>
								#{tag.title[locale as 'en' | 'ja']}
								<span className="ml-1 text-xs opacity-70">
									{postCount}
								</span>
							</Link>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
}
