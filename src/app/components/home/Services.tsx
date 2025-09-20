'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Wrench, Globe, PenTool, Zap, TrendingUp } from 'lucide-react';
import { Wordpress } from '../ui/Wordpress';
import ServiceCard from '../ui/ServiceCard';
import { useTranslations, useLocale } from 'next-intl';
import { OptimizedMotionDiv } from '../ui/OptimizedMotionDiv';

const Services = () => {
	const t = useTranslations('Services');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	const mainServices = [
		{
			icon: Wordpress,
			titleKey: 'wordpress.title',
			descriptionKey: 'wordpress.description',
			featuresKey: 'wordpress.features',
		},
		{
			icon: Code2,
			titleKey: 'react.title',
			descriptionKey: 'react.description',
			featuresKey: 'react.features',
		},
		{
			icon: TrendingUp,
			titleKey: 'seo.title',
			descriptionKey: 'seo.description',
			featuresKey: 'seo.features',
		},
	];

	const additionalServices = [
		{
			icon: Wrench,
			titleKey: 'maintenance.title',
			descriptionKey: 'maintenance.description',
		},
		{
			icon: Globe,
			titleKey: 'hosting.title',
			descriptionKey: 'hosting.description',
		},
		{
			icon: PenTool,
			titleKey: 'content.title',
			descriptionKey: 'content.description',
		},
		{
			icon: Zap,
			titleKey: 'automation.title',
			descriptionKey: 'automation.description',
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring' as const,
				stiffness: 100,
			},
		},
	};

	return (
		<section id="services" className="py-20  bg-[#001F3F]/50">
			{/* Header with Portfolio-style animation */}
			<article className="mb-16 pl-8 md:pl-20">
				{/* Container for the entire animation */}
				<div className="relative h-[120px] md:h-[100px] flex items-center">
					{/* Horizontal line - acts as the "ground" */}
					<OptimizedMotionDiv
						className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 z-20"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: 'easeOut' }}
					/>

					{/* Mask container - hides everything below the line */}
					<div className="absolute bottom-0 left-0 right-0 h-full">
						<motion.h2
							className={`absolute pr-4 text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wide ${
								isJapanese
									? 'font-notoSansJP'
									: 'font-helvetica'
							}`}
							style={{
								bottom: '10px', // Position text to sit just above the line when fully risen
							}}
							initial={{
								x: 'calc(50vw - 50% - 80px)', // Start centered in viewport
								y: 120, // Start below the line
								opacity: 0,
							}}
							whileInView={{
								x: 0, // End at left position
								y: 0, // End at normal position
								opacity: 1, // Fade in as it rises
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
									delay: 1.2, // Start sliding after rising is almost complete
									duration: 1.5,
									ease: 'easeInOut',
								},
								opacity: { delay: 0.8, duration: 0.8 },
							}}
						>
							{t('title')}
						</motion.h2>
					</div>
				</div>

				{/* Subtitle */}
				<motion.p
					className={`text-lg md:text-xl text-white/70 max-w-5xl mt-6 pr-6 ${
						isJapanese ? 'font-zenOldMincho' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 1.5 }}
				>
					{t('subtitle')}
				</motion.p>
			</article>

			<article className="max-w-7xl mx-auto px-6">
				{/* Main Services */}
				<OptimizedMotionDiv
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 auto-rows-fr"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					{mainServices.map((service, index) => (
						<OptimizedMotionDiv key={index} variants={itemVariants}>
							<ServiceCard
								icon={service.icon}
								title={t(service.titleKey)}
								description={t(service.descriptionKey)}
								features={[
									t(`${service.featuresKey}.0`),
									t(`${service.featuresKey}.1`),
									t(`${service.featuresKey}.2`),
									t(`${service.featuresKey}.3`),
								]}
								index={index}
							/>
						</OptimizedMotionDiv>
					))}
				</OptimizedMotionDiv>

				{/* Additional Services */}
				<OptimizedMotionDiv
					className="grid grid-cols-2 md:grid-cols-4 gap-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{additionalServices.map((service, index) => (
						<OptimizedMotionDiv
							key={index}
							variants={itemVariants}
							whileHover={{ scale: 1.05, y: -5 }}
							className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
						>
							<OptimizedMotionDiv
								initial={{ rotate: 0 }}
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.5 }}
							>
								<service.icon className="w-10 h-10 text-[#06B6D4] mx-auto mb-4" />
							</OptimizedMotionDiv>
							<h4
								className={`text-white font-semibold mb-2 ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{t(service.titleKey)}
							</h4>
							<p
								className={`text-white/60 text-sm ${
									isJapanese ? 'zenOldMincho' : ''
								}`}
							>
								{t(service.descriptionKey)}
							</p>
						</OptimizedMotionDiv>
					))}
				</OptimizedMotionDiv>
			</article>
		</section>
	);
};

export default Services;
