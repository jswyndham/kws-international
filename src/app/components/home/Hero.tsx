'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../i18n/routing';

const Hero = () => {
	const t = useTranslations('Hero');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	const { scrollY } = useScroll();

	// Logo animations based on scroll
	const logoScale = useTransform(scrollY, [0, 300], [1, 1.5]);
	const logoOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
	const logoY = useTransform(scrollY, [0, 300], [0, -100]);

	return (
		<section className="relative min-h-screen flex items-center justify-center p-4">
			{/* Video Background */}
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute top-0 left-0 w-full h-full object-cover"
			>
				<source src="/videos/web-dev-video.mp4" type="video/mp4" />
			</video>

			{/* Overlay */}
			<div className="absolute inset-0 bg-[#001F3F]/80 bg-gradient-to-br from-[#001F3F]/90 to-[#4F46E5]/40"></div>

			{/* Animated Logo */}
			<motion.div
				className="absolute top-[28%] md:top-[30%] lg:top-[33%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
				style={{
					scale: logoScale,
					opacity: logoOpacity,
					y: logoY,
				}}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{
					duration: 1.2,
					ease: 'easeOut',
					delay: 0.3,
				}}
			>
				<div className="relative w-[225px] h-[175px] md:w-[450px] md:h-[375px] lg:w-[700px] lg:h-[400px]">
					<Image
						src="/images/logo.png"
						alt="Kyoto Web Studio Logo"
						fill
						className="object-contain"
						priority
					/>
				</div>
			</motion.div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-56 md:mt-96">
				<motion.h1
					className="mb-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.5, duration: 1 }}
				>
					<span
						className={`block tracking-wide text-2xl md:text-6xl lg:text-7xl text-white leading-none ${
							isJapanese ? 'font-zenOldMincho' : "font-['Anton']"
						}`}
					>
						{t('title')}
					</span>
					<span
						className={`block text-xl md:text-4xl lg:text-5xl text-[#06B6D4] font-light md:mt-3 ${
							isJapanese
								? 'font-notoSansJP'
								: "font-['Open_Sans']"
						}`}
					>
						{t('subtitle')}
					</span>
				</motion.h1>

				<motion.p
					className={`text-md md:text-xl lg:text-2xl text-white/90 mb-10 max-w-2xl mx-auto ${
						isJapanese ? 'font-notoSansJP' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.8, duration: 0.8 }}
				>
					{t('description')}
				</motion.p>

				<motion.div
					className="flex flex-col sm:flex-row gap-4 justify-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.1, duration: 0.8 }}
				>
					<Link
						href="/contact"
						className={`inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-[#FF851B] text-white font-semibold rounded-full hover:bg-[#FF851B]/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{t('ctaPrimary')}
						<ArrowRight className="ml-2 w-5 h-5" />
					</Link>
					<Link
						href="/services"
						className={`inline-flex items-center px-6 py-3 md:px-8 md:py-4 border-2 border-[#06B6D4] text-white font-semibold rounded-full hover:bg-[#06B6D4] hover:border-[#06B6D4] transform hover:-translate-y-1 transition-all duration-300 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{t('ctaSecondary')}
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
