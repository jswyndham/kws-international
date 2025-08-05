'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Target, Clock, Zap, Heart } from 'lucide-react';

const AboutPhilosophy = () => {
	const t = useTranslations('AboutPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	const values = [
		{
			icon: Target,
			titleKey: 'userEngagement',
			descriptionKey: 'userEngagementDesc',
			color: 'from-[#FF851B] to-[#FF851B]/60',
		},
		{
			icon: Clock,
			titleKey: 'timeOnPage',
			descriptionKey: 'timeOnPageDesc',
			color: 'from-[#06B6D4] to-[#06B6D4]/60',
		},
		{
			icon: Zap,
			titleKey: 'conversionFocus',
			descriptionKey: 'conversionFocusDesc',
			color: 'from-[#4F46E5] to-[#4F46E5]/60',
		},
		{
			icon: Heart,
			titleKey: 'culturalBridge',
			descriptionKey: 'culturalBridgeDesc',
			color: 'from-[#FF851B] to-[#4F46E5]',
		},
	];

	return (
		<section className="py-20 bg-[#001F3F]/90">
			{/* Header with animation - matching AboutStory component */}
			<div className="mb-16 pl-8 md:pl-20">
				<div className="relative h-[120px] md:h-[100px] flex items-center">
					<motion.div
						className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 z-20"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: 'easeOut' }}
					/>

					<div className="absolute bottom-0 left-0 right-0 h-full">
						<motion.h2
							className={`absolute text-3xl md:text-6xl lg:text-8xl font-light text-white tracking-wide ${
								isJapanese
									? 'font-notoSansJP'
									: 'font-helvetica'
							}`}
							style={{ bottom: '10px' }}
							initial={{
								x: 'calc(50vw - 50% - 80px)',
								y: 120,
								opacity: 0,
							}}
							whileInView={{
								x: 0,
								y: 0,
								opacity: 1,
							}}
							viewport={{ once: true, margin: '-50px' }}
							transition={{
								duration: 1.2,
								ease: [0.25, 0.1, 0.25, 1],
								y: {
									delay: 0.5,
									duration: 0.9,
									ease: 'easeOut',
								},
								x: {
									delay: 1.2,
									duration: 1.5,
									ease: 'easeInOut',
								},
								opacity: { delay: 0.8, duration: 0.8 },
							}}
						>
							{t('philosophy.title')}
						</motion.h2>
					</div>
				</div>

				<motion.p
					className={`text-xl text-white/70 max-w-3xl mt-6 ${
						isJapanese ? 'font-zenOldMincho' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 1.5 }}
				>
					{t('philosophy.subtitle')}
				</motion.p>
			</div>

			<div className="max-w-6xl mx-auto px-6">
				{/* Values Grid */}
				<div className="grid md:grid-cols-2 gap-8 mb-16">
					{values.map((value, index) => {
						const Icon = value.icon;
						return (
							<motion.div
								key={value.titleKey}
								className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								whileHover={{ y: -5 }}
							>
								<motion.div
									className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6`}
									whileHover={{ rotate: 360 }}
									transition={{ duration: 0.5 }}
								>
									<Icon className="w-8 h-8 text-white" />
								</motion.div>

								<h3
									className={`text-2xl font-semibold text-white mb-3 ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									{t(`philosophy.values.${value.titleKey}`)}
								</h3>

								<p
									className={`text-white/70 ${
										isJapanese ? 'font-zenOldMincho' : ''
									}`}
								>
									{t(
										`philosophy.values.${value.descriptionKey}`
									)}
								</p>
							</motion.div>
						);
					})}
				</div>

				{/* AI Innovation Section */}
				<motion.div
					className="bg-gradient-to-r from-[#FF851B]/20 to-[#4F46E5]/20 rounded-2xl p-8 md:p-12 border border-white/10"
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<div className="text-center">
						<h3
							className={`text-2xl md:text-3xl font-bold text-white mb-4 ${
								isJapanese ? 'font-notoSansJP' : ''
							}`}
						>
							{t('philosophy.innovation.title')}
						</h3>
						<p
							className={`text-lg text-white/80 max-w-3xl mx-auto ${
								isJapanese ? 'font-zenOldMincho' : ''
							}`}
						>
							{t('philosophy.innovation.description')}
						</p>
						<motion.div
							className="mt-6 inline-flex items-center gap-4 text-[#06B6D4]"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
						>
							<span className="w-12 h-[2px] bg-[#06B6D4]" />
							<span
								className={`font-semibold ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{t('philosophy.innovation.tagline')}
							</span>
							<span className="w-12 h-[2px] bg-[#06B6D4]" />
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutPhilosophy;
