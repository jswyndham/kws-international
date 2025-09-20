'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar } from 'lucide-react';
import { OptimizedMotionDiv } from '../ui/OptimizedMotionDiv';

const AboutCTA = () => {
	const t = useTranslations('AboutPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	return (
		<section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#001F3F]/95 to-[#4F46E5]/30">
			<div className="max-w-4xl mx-auto px-6 text-center">
				<OptimizedMotionDiv
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2
						className={`text-3xl md:text-5xl font-bold text-white mb-6 ${
							isJapanese ? 'font-notoSansJP' : 'font-anton'
						}`}
					>
						{t('cta.title')}
					</h2>

					<p
						className={`text-xl text-white/80 mb-8 ${
							isJapanese ? 'font-zenOldMincho' : ''
						}`}
					>
						{t('cta.subtitle')}
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							href="/contact"
							className={`inline-flex items-center px-8 py-4 bg-[#FF851B] text-white font-semibold rounded-full hover:bg-[#FF851B]/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
								isJapanese ? 'font-notoSansJP' : ''
							}`}
						>
							{t('cta.startProject')}
							<ArrowRight className="ml-2 w-5 h-5" />
						</Link>

						<Link
							href="/services"
							className={`inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#001F3F] transform hover:-translate-y-1 transition-all duration-300 ${
								isJapanese ? 'font-notoSansJP' : ''
							}`}
						>
							{t('cta.viewServices')}
							<ArrowRight className="ml-2 w-5 h-5" />
						</Link>
					</div>

					{/* Trust Indicators */}
					<OptimizedMotionDiv
						className="grid grid-cols-2 md:grid-cols-4 gap-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.8 }}
					>
						{[
							'bilingualService',
							'kyotoBased',
							'userFocused',
							'aiPowered',
						].map((item, index) => (
							<OptimizedMotionDiv
								key={item}
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 + index * 0.1 }}
							>
								<div className="text-3xl font-bold text-[#06B6D4] mb-1">
									{t(`cta.stats.${item}.value`)}
								</div>
								<div
									className={`text-white/70 text-sm ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									{t(`cta.stats.${item}.label`)}
								</div>
							</OptimizedMotionDiv>
						))}
					</OptimizedMotionDiv>
				</OptimizedMotionDiv>
			</div>
		</section>
	);
};

export default AboutCTA;
