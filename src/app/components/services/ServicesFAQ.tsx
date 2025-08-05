'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';

const ServicesFAQ = () => {
	const t = useTranslations('ServicesPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const faqItems = [
		{
			question: 'wordpressVsCustom',
			answer: 'wordpressVsCustomAnswer',
		},
		{
			question: 'aiContent',
			answer: 'aiContentAnswer',
		},
		{
			question: 'timeline',
			answer: 'timelineAnswer',
		},
		{
			question: 'pricing',
			answer: 'pricingAnswer',
		},
		{
			question: 'maintenance',
			answer: 'maintenanceAnswer',
		},
		{
			question: 'seo',
			answer: 'seoAnswer',
		},
		{
			question: 'multilingual',
			answer: 'multilingualAnswer',
		},
		{
			question: 'hosting',
			answer: 'hostingAnswer',
		},
		{
			question: 'payment',
			answer: 'paymentAnswer',
		},
	];

	return (
		<section className="py-20 bg-[#001F3F]">
			<div className="max-w-4xl mx-auto px-6">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2
						className={`text-3xl md:text-5xl font-bold text-white mb-4 ${
							isJapanese ? 'font-notoSansJP' : 'font-anton'
						}`}
					>
						{t('faq.title')}
					</h2>
					<p
						className={`text-xl text-white/70 ${
							isJapanese ? 'font-zenOldMincho' : ''
						}`}
					>
						{t('faq.subtitle')}
					</p>
				</motion.div>

				<motion.div
					className="space-y-4"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{faqItems.map((item, index) => (
						<motion.div
							key={item.question}
							className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
						>
							<button
								onClick={() =>
									setOpenIndex(
										openIndex === index ? null : index
									)
								}
								className="w-full p-6 text-left flex items-center justify-between group hover:bg-white/5 transition-colors"
							>
								<h3
									className={`text-lg font-semibold text-white pr-4 ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									{t(`faq.items.${item.question}`)}
								</h3>
								<motion.div
									animate={{
										rotate: openIndex === index ? 180 : 0,
									}}
									transition={{ duration: 0.3 }}
								>
									<ChevronDown className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
								</motion.div>
							</button>

							<AnimatePresence>
								{openIndex === index && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<div className="px-6 pb-6">
											<p
												className={`text-white/70 leading-relaxed ${
													isJapanese
														? 'font-zenOldMincho'
														: ''
												}`}
											>
												{t(`faq.items.${item.answer}`)}
											</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default ServicesFAQ;
