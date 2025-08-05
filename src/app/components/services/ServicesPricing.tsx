'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight } from 'lucide-react';
import { Wordpress } from '../../components/ui/Wordpress';
import { Code2, TrendingUp } from 'lucide-react';

const ServicesPricing = () => {
	const t = useTranslations('ServicesPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';
	const [activeTab, setActiveTab] = useState('wordpress');

	const services = {
		wordpress: {
			icon: Wordpress,
			color: '#FF851B',
			packages: [
				{
					name: 'starter',
					price: '¥200,000',
					priceRange: '¥200,000 - ¥350,000',
					features: [
						'pages5to10',
						'responsiveDesign',
						'basicSEO',
						'contactForm',
						'revisions2',
						'delivery4weeks',
					],
				},
				{
					name: 'professional',
					price: '¥350,000',
					priceRange: '¥350,000 - ¥600,000',
					popular: true,
					features: [
						'pages10to20',
						'customDesign',
						'advancedSEO',
						'blog',
						'analytics',
						'revisions3',
						'delivery6weeks',
					],
				},
				{
					name: 'enterprise',
					price: '¥600,000+',
					priceRange: '¥600,000+',
					features: [
						'pagesUnlimited',
						'ecommerce',
						'membershipSystem',
						'multilingual',
						'customFeatures',
						'revisionsUnlimited',
						'prioritySupport',
					],
				},
			],
		},
		custom: {
			icon: Code2,
			color: '#4F46E5',
			packages: [
				{
					name: 'landingPage',
					price: '¥300,000',
					priceRange: '¥300,000 - ¥500,000',
					features: [
						'singlePage',
						'reactNextjs',
						'animations',
						'apiIntegration',
						'performanceOptimized',
						'delivery3weeks',
					],
				},
				{
					name: 'webApp',
					price: '¥600,000',
					priceRange: '¥600,000 - ¥1,200,000',
					popular: true,
					features: [
						'fullApplication',
						'userAuth',
						'database',
						'adminPanel',
						'realtime',
						'testing',
						'delivery8weeks',
					],
				},
				{
					name: 'enterprise',
					price: '¥1,200,000+',
					priceRange: '¥1,200,000+',
					features: [
						'complexSystem',
						'microservices',
						'cloudDeployment',
						'cicd',
						'security',
						'sla',
						'dedicatedTeam',
					],
				},
			],
		},
		seo: {
			icon: TrendingUp,
			color: '#06B6D4',
			packages: [
				{
					name: 'aiContent',
					price: '¥50,000',
					priceRange: '¥50,000/月',
					features: [
						'aiArticles',
						'mecabAnalysis',
						'keywordOptimization',
						'compoundNounTargeting',
						'monthlyArticles4',
						'seoRankTracking',
						'contentCalendar',
					],
				},
				{
					name: 'comprehensive',
					price: '¥80,000',
					priceRange: '¥80,000/月',
					popular: true,
					features: [
						'aiArticles',
						'monthlyArticles8',
						'technicalSEO',
						'linkBuilding',
						'competitorAnalysis',
						'monthlyReports',
						'consultations',
					],
				},
				{
					name: 'enterprise',
					price: '¥150,000',
					priceRange: '¥150,000+/月',
					features: [
						'unlimitedAiArticles',
						'customAiTraining',
						'multilingualContent',
						'fullSeoStrategy',
						'dedicatedManager',
						'weeklyReports',
						'prioritySupport',
					],
				},
			],
		},
	};

	const currentService = services[activeTab as keyof typeof services];

	return (
		<section className="py-20 bg-[#001F3F]">
			{/* Header with animation */}
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
							{t('pricing.title')}
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
					{t('pricing.subtitle')}
				</motion.p>
			</div>

			<div className="max-w-7xl mx-auto px-6">
				{/* Service Tabs */}
				<motion.div
					className="flex flex-wrap justify-center gap-4 mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					{Object.entries(services).map(([key, service]) => {
						const Icon = service.icon;
						return (
							<motion.button
								key={key}
								onClick={() => setActiveTab(key)}
								className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all ${
									activeTab === key
										? 'bg-white text-[#001F3F] border-white'
										: 'bg-transparent text-white border-white/30 hover:border-white/60'
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Icon className="w-5 h-5" />
								<span
									className={`font-semibold ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									{t(`pricing.tabs.${key}`)}
								</span>
							</motion.button>
						);
					})}
				</motion.div>

				{/* Pricing Cards */}
				<motion.div
					className="grid md:grid-cols-3 gap-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					{currentService.packages.map((pkg, index) => (
						<motion.div
							key={pkg.name}
							className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 ${
								pkg.popular
									? 'border-[#FF851B] shadow-2xl shadow-[#FF851B]/20'
									: 'border-white/10'
							}`}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ y: -10 }}
						>
							{pkg.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="bg-[#FF851B] text-white px-4 py-1 rounded-full text-sm font-semibold">
										{t('pricing.popular')}
									</span>
								</div>
							)}

							<h3
								className={`text-2xl font-bold text-white mb-2 ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{t(
									`pricing.packages.${activeTab}.${pkg.name}.name`
								)}
							</h3>

							<div className="mb-6">
								<p className="text-3xl font-bold text-white mb-1">
									{t(
										`pricing.packages.${activeTab}.${pkg.name}.price`
									)}
								</p>
								<p className="text-white/60 text-sm">
									{t(
										`pricing.packages.${activeTab}.${pkg.name}.description`
									)}
								</p>
							</div>

							<ul className="space-y-3 mb-8">
								{pkg.features.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-3"
									>
										<Check className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
										<span
											className={`text-white/80 text-sm ${
												isJapanese
													? 'font-notoSansJP'
													: ''
											}`}
										>
											{t(`pricing.features.${feature}`)}
										</span>
									</li>
								))}
							</ul>

							<Link
								href="/contact"
								className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-all ${
									pkg.popular
										? 'bg-[#FF851B] text-white hover:bg-[#FF851B]/90'
										: 'bg-white/10 text-white hover:bg-white/20'
								} ${isJapanese ? 'font-notoSansJP' : ''}`}
							>
								{t('pricing.cta')}
								<ArrowRight className="w-4 h-4" />
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* Additional Services Note */}
				<motion.div
					className="mt-12 text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<p
						className={`text-white/70 ${
							isJapanese ? 'font-zenOldMincho' : ''
						}`}
					>
						{t('pricing.additionalServices')}
					</p>
					<div className="flex flex-wrap justify-center gap-4 mt-4">
						{[
							'maintenance',
							'hosting',
							'content',
							'automation',
						].map((service) => (
							<span
								key={service}
								className="text-[#06B6D4] font-semibold"
							>
								{t(`pricing.additional.${service}`)}
							</span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ServicesPricing;
