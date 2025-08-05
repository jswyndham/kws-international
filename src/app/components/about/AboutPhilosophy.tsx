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
			<div className="max-w-6xl mx-auto px-6">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2
						className={`text-3xl md:text-5xl font-bold text-white mb-6 ${
							isJapanese ? 'font-notoSansJP' : 'font-anton'
						}`}
					>
						{t('philosophy.title')}
					</h2>
					<p
						className={`text-xl text-white/70 max-w-3xl mx-auto ${
							isJapanese ? 'font-zenOldMincho' : ''
						}`}
					>
						{t('philosophy.subtitle')}
					</p>
				</motion.div>

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
