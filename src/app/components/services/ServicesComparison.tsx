'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Check, X } from 'lucide-react';
import { OptimizedMotionDiv } from '../ui/OptimizedMotionDiv';

const ServicesComparison = () => {
	const t = useTranslations('ServicesPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	const comparisonData = [
		{
			feature: 'initialCost',
			wordpress: 'low',
			custom: 'high',
		},
		{
			feature: 'developmentTime',
			wordpress: '4-6 weeks',
			custom: '8-12 weeks',
		},
		{
			feature: 'customization',
			wordpress: 'limited',
			custom: 'unlimited',
		},
		{
			feature: 'performance',
			wordpress: 'good',
			custom: 'excellent',
		},
		{
			feature: 'scalability',
			wordpress: 'moderate',
			custom: 'high',
		},
		{
			feature: 'maintenance',
			wordpress: 'regular',
			custom: 'minimal',
		},
		{
			feature: 'seoCapability',
			wordpress: 'good',
			custom: 'excellent',
		},
		{
			feature: 'ecommerce',
			wordpress: true,
			custom: true,
		},
		{
			feature: 'multilingual',
			wordpress: true,
			custom: true,
		},
		{
			feature: 'idealFor',
			wordpress: 'smb',
			custom: 'enterprise',
		},
	];

	const renderValue = (value: any) => {
		if (typeof value === 'boolean') {
			return value ? (
				<Check className="w-5 h-5 text-green-500 mx-auto" />
			) : (
				<X className="w-5 h-5 text-red-500 mx-auto" />
			);
		}

		if (typeof value === 'string') {
			const colorMap: { [key: string]: string } = {
				low: 'text-green-500',
				high: 'text-yellow-500',
				limited: 'text-yellow-500',
				unlimited: 'text-green-500',
				good: 'text-blue-500',
				excellent: 'text-green-500',
				moderate: 'text-yellow-500',
				regular: 'text-yellow-500',
				minimal: 'text-green-500',
			};

			return (
				<span
					className={`${colorMap[value] || 'text-white/80'} ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
				>
					{t(`comparison.values.${value}`)}
				</span>
			);
		}

		return value;
	};

	return (
		<section className="py-20 bg-[#001F3F]/90">
			<div className="max-w-5xl mx-auto px-6">
				<OptimizedMotionDiv
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
						{t('comparison.title')}
					</h2>
					<p
						className={`text-xl text-white/70 ${
							isJapanese ? 'font-zenOldMincho' : ''
						}`}
					>
						{t('comparison.subtitle')}
					</p>
				</OptimizedMotionDiv>

				<OptimizedMotionDiv
					className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-white/10">
									<th className="text-left p-6 text-white font-semibold">
										<span
											className={
												isJapanese
													? 'font-notoSansJP'
													: ''
											}
										>
											{t('comparison.feature')}
										</span>
									</th>
									<th className="text-center p-6 text-white font-semibold bg-[#FF851B]/10">
										<span
											className={
												isJapanese
													? 'font-notoSansJP'
													: ''
											}
										>
											WordPress
										</span>
									</th>
									<th className="text-center p-6 text-white font-semibold bg-[#4F46E5]/10">
										<span
											className={
												isJapanese
													? 'font-notoSansJP'
													: ''
											}
										>
											{t('comparison.custom')}
										</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{comparisonData.map((row, index) => (
									<motion.tr
										key={row.feature}
										className="border-b border-white/5 hover:bg-white/5 transition-colors"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.5,
											delay: index * 0.05,
										}}
									>
										<td
											className={`p-6 text-white/80 ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t(
												`comparison.features.${row.feature}`
											)}
										</td>
										<td className="p-6 text-center bg-[#FF851B]/5">
											{renderValue(row.wordpress)}
										</td>
										<td className="p-6 text-center bg-[#4F46E5]/5">
											{renderValue(row.custom)}
										</td>
									</motion.tr>
								))}
							</tbody>
						</table>
					</div>
				</OptimizedMotionDiv>

				<OptimizedMotionDiv
					className="mt-8 p-6 bg-gradient-to-r from-[#FF851B]/20 to-[#4F46E5]/20 rounded-xl border border-white/10"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<p
						className={`text-white/80 text-center ${
							isJapanese ? 'font-zenOldMincho' : ''
						}`}
					>
						{t('comparison.note')}
					</p>
				</OptimizedMotionDiv>
			</div>
		</section>
	);
};

export default ServicesComparison;
