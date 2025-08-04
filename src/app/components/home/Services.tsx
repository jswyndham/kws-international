'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Wrench, Globe, PenTool, Zap, TrendingUp } from 'lucide-react';
import { Wordpress } from '../ui/Wordpress';
import ServiceCard from '../ui/ServiceCard';
import { useTranslations } from 'next-intl';

const Services = () => {
	const t = useTranslations('Services');

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
		<section id="services" className="py-20 bg-[#001F3F]/50">
			<div className="max-w-7xl mx-auto px-6">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="font-['Helvetica_Neue'] text-5xl md:text-6xl font-bold text-white mb-6">
						{t('title')}
					</h2>
					<p className="text-xl text-white/70 max-w-3xl mx-auto">
						{t('subtitle')}
					</p>
				</motion.div>

				{/* Main Services */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 auto-rows-fr"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
				>
					{mainServices.map((service, index) => (
						<motion.div key={index} variants={itemVariants}>
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
						</motion.div>
					))}
				</motion.div>

				{/* Additional Services */}
				<motion.div
					className="grid grid-cols-2 md:grid-cols-4 gap-6"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{additionalServices.map((service, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ scale: 1.05, y: -5 }}
							className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300"
						>
							<motion.div
								initial={{ rotate: 0 }}
								whileHover={{ rotate: 360 }}
								transition={{ duration: 0.5 }}
							>
								<service.icon className="w-10 h-10 text-[#06B6D4] mx-auto mb-4" />
							</motion.div>
							<h4 className="text-white font-semibold mb-2">
								{t(service.titleKey)}
							</h4>
							<p className="text-white/60 text-sm">
								{t(service.descriptionKey)}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Services;
