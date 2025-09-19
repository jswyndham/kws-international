'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

const AboutHero = () => {
	const t = useTranslations('AboutPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	return (
		<section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#001F3F] via-black to-black px-4 pt-32 lg:pt-48 pb-32">
			{/* Animated background elements */}
			<motion.div
				className="absolute inset-0 opacity-10"
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
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<h1
							className={`text-4xl md:text-6xl font-bold text-white mb-6 ${
								isJapanese ? 'font-notoSansJP' : 'font-anton'
							}`}
						>
							{t('hero.title')}
						</h1>

						<p
							className={`text-lg md:text-xl text-white/80 mb-8 ${
								isJapanese ? 'font-zenOldMincho' : ''
							}`}
						>
							{t('hero.subtitle')}
						</p>

						<div className="flex flex-wrap gap-4">
							{[
								'ukToJapan',
								'academicBackground',
								'userFocused',
							].map((item, index) => (
								<motion.div
									key={item}
									className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: 0.4 + index * 0.1,
									}}
								>
									<span
										className={`text-white text-sm ${
											isJapanese ? 'font-notoSansJP' : ''
										}`}
									>
										{t(`hero.badges.${item}`)}
									</span>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Image/Visual Element */}
					<motion.div
						className="relative"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<div className="relative w-full h-[400px] rounded-2xl overflow-hidden group">
							{/* Gradient overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/90 via-[#001F3F]/20 to-transparent z-10" />

							{/* Image */}
							<Image
								src="/images/about/james-profile.jpg"
								alt="James - Founder of Kyoto Web Studio"
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-700"
							/>

							{/* Bottom text container with glass morphism */}
							<motion.div
								className="absolute -bottom-2 left-0 right-0 z-20"
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.6 }}
							>
								<div className="p-8">
									{/* Decorative line */}
									<motion.div
										className="w-20 h-1 bg-gradient-to-r from-[#FF851B] to-[#06B6D4] mb-4"
										initial={{ scaleX: 0 }}
										animate={{ scaleX: 1 }}
										transition={{
											duration: 0.6,
											delay: 0.8,
										}}
									/>

									{/* Name with animated reveal */}
									<div className="overflow-hidden mb-2">
										<motion.h3
											className={`text-white text-lg md:text-2xl font-bold ${
												isJapanese
													? 'font-notoSansJP'
													: 'font-helvetica'
											}`}
											initial={{ y: 40 }}
											animate={{ y: 0 }}
											transition={{
												duration: 0.6,
												delay: 0.7,
												ease: 'easeOut',
											}}
										>
											{t('hero.founderName')}
										</motion.h3>
									</div>

									{/* Title with staggered animation */}
									<div className="overflow-hidden">
										<motion.p
											className={`text-[#06B6D4] text-md md:text-lg ${
												isJapanese
													? 'font-zenOldMincho'
													: ''
											}`}
											initial={{ y: 30 }}
											animate={{ y: 0 }}
											transition={{
												duration: 0.6,
												delay: 0.8,
												ease: 'easeOut',
											}}
										>
											{t('hero.founderTitle')}
										</motion.p>
									</div>
								</div>
							</motion.div>

							{/* Optional: Hover effect overlay */}
							<div className="absolute inset-0 bg-gradient-to-br from-[#FF851B]/0 to-[#06B6D4]/0 hover:from-[#FF851B]/10 hover:to-[#06B6D4]/10 transition-all duration-500 z-15" />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutHero;
