'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, Code2, Palette, Search, Smartphone } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';

const Portfolio = () => {
	const t = useTranslations('Portfolio');
	const locale = useLocale();
	const isJapanese = locale === 'ja';
	const containerRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	// Subtle parallax for background
	const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

	const projects = [
		{
			id: 'romancing-japan',
			title: 'Romancing Japan',
			logo: '/images/portfolio/logos/romancing-japan.png',
			image: '/images/portfolio/site-image/romancing-japan.jpg',
			url: 'https://www.romancing-japan.com/',
			color: '#FF851B',
			techStack: [
				'Next.js 14',
				'Tailwind CSS',
				'Sanity.io',
				'SEO Optimized',
			],
			highlights: [
				{ icon: Code2, text: t('romancingPoint1') },
				{ icon: Search, text: t('romancingPoint2') },
				{ icon: Smartphone, text: t('romancingPoint3') },
			],
		},
		{
			id: 'asobi-lodge',
			title: 'Asobi Lodge',
			logo: '/images/portfolio/logos/asobi-lodge.png',
			image: '/images/portfolio/site-image/asobi-lodge.jpg',
			url: 'https://asobilodge.com/',
			color: '#06B6D4',
			techStack: [
				'WordPress',
				'Elementor Pro',
				'Custom CSS',
				'Booking Integration',
			],
			highlights: [
				{ icon: Palette, text: t('asobiPoint1') },
				{ icon: Code2, text: t('asobiPoint2') },
				{ icon: Smartphone, text: t('asobiPoint3') },
			],
		},
		{
			id: 'noru-kyoto',
			title: 'Noru Kyoto Bike Tours',
			logo: '/images/portfolio/logos/noru-kyoto.png',
			image: '/images/portfolio/site-image/noru-kyoto.jpg',
			url: 'https://noru.cc/',
			color: '#4F46E5',
			techStack: [
				'Next.js 15',
				'Tailwind CSS',
				'Sanity.io',
				'Multilingual SEO',
			],
			highlights: [
				{ icon: Search, text: t('noruPoint1') },
				{ icon: Code2, text: t('noruPoint2') },
				{ icon: Smartphone, text: t('noruPoint3') },
			],
		},
	];

	return (
		<section
			ref={containerRef}
			className="relative py-20 bg-[#001F3F] overflow-hidden"
		>
			{/* Subtle animated background */}
			<motion.div
				className="absolute inset-0 opacity-10"
				style={{ y: backgroundY }}
			>
				<div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-[#06B6D4]/20" />
			</motion.div>

			{/* Header */}
			<div className="relative z-10 mb-20 pl-8 md:pl-20">
				{/* Container for the entire animation */}
				<div className="relative h-[120px] md:h-[100px] flex items-center">
					{/* Horizontal line - acts as the "ground" */}
					<motion.div
						className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 z-20"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: 'easeOut' }}
					/>

					{/* Mask container - hides everything below the line */}
					<div className="absolute bottom-0 left-0 right-0 h-full">
						<motion.h2
							className={`absolute text-3xl md:text-6xl lg:text-8xl font-light text-white tracking-wide ${
								isJapanese
									? 'font-zenOldMincho'
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
							{t('titleHighlight')}
						</motion.h2>
					</div>
				</div>

				{/* Subtitle */}
				<motion.p
					className={`text-xl text-white/70 max-w-3xl mt-6 ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 1.5 }}
				>
					{t('subtitle')}
				</motion.p>
			</div>

			{/* Projects */}
			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="space-y-32">
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							isJapanese={isJapanese}
						/>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<motion.div
				className="relative z-10 text-center mt-32"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<p
					className={`text-2xl text-white/70 mb-8 ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
				>
					{t('cta')}
				</p>
				<Link
					href="/contact"
					className={`inline-flex items-center px-8 py-4 bg-[#FF851B] text-white font-semibold rounded-full hover:bg-[#FF851B]/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
				>
					{t('ctaButton')}
					<ArrowUpRight className="ml-2 w-5 h-5" />
				</Link>
			</motion.div>
		</section>
	);
};

export default Portfolio;
