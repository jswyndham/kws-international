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
		<section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#001F3F] via-[#001F3F]/95 to-[#4F46E5]/20">
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
							className={`text-xl md:text-2xl text-white/80 mb-8 ${
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
						<div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-br from-[#FF851B]/20 to-[#06B6D4]/20" />
							<Image
								src="/images/kyoto-temple.jpg"
								alt="Kyoto Temple"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<motion.div
									className="text-center"
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.8, delay: 0.6 }}
								>
									<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
										<p
											className={`text-[#001F3F] text-2xl font-bold mb-2 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t('hero.founderName')}
										</p>
										<p
											className={`text-[#4F46E5] ${
												isJapanese
													? 'font-zenOldMincho'
													: ''
											}`}
										>
											{t('hero.founderTitle')}
										</p>
									</div>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutHero;
