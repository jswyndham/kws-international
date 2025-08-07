// src/app/components/blog/BlogHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BlogHeroProps {
	title: string;
	subtitle: string;
	isJapanese?: boolean;
	currentCategory?: any;
	currentTag?: any;
	search?: string;
	locale: string;
}

export default function BlogHero({
	title,
	subtitle,
	isJapanese,
	currentCategory,
	currentTag,
	search,
	locale,
}: BlogHeroProps) {
	return (
		<section className="relative py-24 bg-gradient-to-b from-black via-[#001F3F] to-[#001F3F] overflow-hidden">
			{/* Animated background elements */}
			<motion.div
				className="absolute inset-0 opacity-20"
				initial={{ backgroundPosition: '0% 0%' }}
				animate={{ backgroundPosition: '100% 100%' }}
				transition={{
					duration: 20,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				style={{
					backgroundImage:
						'radial-gradient(circle at 20% 50%, #4F46E5 0%, transparent 50%), radial-gradient(circle at 80% 80%, #06B6D4 0%, transparent 50%)',
					backgroundSize: '150% 150%',
				}}
			/>

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="text-center">
					{/* Title Animation */}
					<motion.h1
						className={`text-5xl md:text-7xl font-bold text-white mb-6 ${
							isJapanese ? 'font-zenOldMincho' : 'font-helvetica'
						}`}
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						{currentCategory ? (
							<span className="flex items-center justify-center gap-3">
								<span
									className="inline-block w-3 h-3 rounded-full"
									style={{
										backgroundColor:
											currentCategory.color || '#4F46E5',
									}}
								/>
								{currentCategory.title[locale as 'en' | 'ja']}
							</span>
						) : currentTag ? (
							<span className="flex items-center justify-center gap-3">
								#{currentTag.title[locale as 'en' | 'ja']}
							</span>
						) : search ? (
							<span className="text-4xl md:text-5xl">
								Search: "{search}"
							</span>
						) : (
							title
						)}
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						className={`text-xl text-white/70 max-w-3xl mx-auto ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{currentCategory?.description?.[
							locale as 'en' | 'ja'
						] || subtitle}
					</motion.p>

					{/* Decorative line */}
					<motion.div
						className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-[#FF851B] to-[#06B6D4]"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					/>
				</div>
			</div>
		</section>
	);
}
