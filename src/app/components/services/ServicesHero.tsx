'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { OptimizedMotionDiv } from '../ui/OptimizedMotionDiv';

const ServicesHero = () => {
	const t = useTranslations('ServicesPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	return (
		<section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-40">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#001F3F] via-[#001F3F]/95 to-[#4F46E5]/20" />

			{/* Animated background elements */}
			<OptimizedMotionDiv
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

			<div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
				<motion.h1
					className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 ${
						isJapanese ? 'font-notoSansJP' : 'font-anton'
					}`}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{t('hero.title')}
				</motion.h1>

				<motion.p
					className={`text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto ${
						isJapanese ? 'font-zenOldMincho' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					{t('hero.subtitle')}
				</motion.p>

				<OptimizedMotionDiv
					className="flex flex-wrap justify-center gap-4 mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					{['transparency', 'quality', 'support'].map(
						(item, index) => (
							<OptimizedMotionDiv
								key={item}
								className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3"
								whileHover={{
									scale: 1.05,
									backgroundColor: 'rgba(255, 255, 255, 0.2)',
								}}
								transition={{ duration: 0.3 }}
							>
								<span
									className={`text-white font-semibold ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									{t(`hero.values.${item}`)}
								</span>
							</OptimizedMotionDiv>
						)
					)}
				</OptimizedMotionDiv>

				<OptimizedMotionDiv
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.8 }}
					className="flex justify-center"
				>
					<OptimizedMotionDiv
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}
					>
						<ChevronDown className="w-8 h-8 text-white/60" />
					</OptimizedMotionDiv>
				</OptimizedMotionDiv>
			</div>
		</section>
	);
};

export default ServicesHero;
