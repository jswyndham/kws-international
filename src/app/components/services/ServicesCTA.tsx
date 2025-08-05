'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, MessageSquare } from 'lucide-react';

const ServicesCTA = () => {
	const t = useTranslations('ServicesPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	return (
		<section className="py-20 bg-gradient-to-br from-[#001F3F] via-[#001F3F]/95 to-[#4F46E5]/30">
			<div className="max-w-4xl mx-auto px-6 text-center">
				<motion.div
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

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/contact"
							className={`inline-flex items-center px-8 py-4 bg-[#FF851B] text-white font-semibold rounded-full hover:bg-[#FF851B]/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
								isJapanese ? 'font-notoSansJP' : ''
							}`}
						>
							{t('cta.consultation')}
							<ArrowRight className="ml-2 w-5 h-5" />
						</Link>

						<Link
							href="/portfolio"
							className={`inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#001F3F] transform hover:-translate-y-1 transition-all duration-300 ${
								isJapanese ? 'font-notoSansJP' : ''
							}`}
						>
							{t('cta.portfolio')}
							<ArrowRight className="ml-2 w-5 h-5" />
						</Link>
					</div>

					<motion.div
						className="mt-12 flex items-center justify-center gap-2 text-white/60"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 0.8 }}
					>
						<MessageSquare className="w-5 h-5" />
						<p className={isJapanese ? 'font-zenOldMincho' : ''}>
							{t('cta.availability')}
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default ServicesCTA;
