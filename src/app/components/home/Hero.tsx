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
    
    // Logo animations based on scroll - adjusted for side-by-side layout
    const logoScale = useTransform(scrollY, [0, 300], [1, 1.2]);
    const logoOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
    const logoY = useTransform(scrollY, [0, 300], [0, -50]);
    
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
            
            {/* Main Container - Increased gap from 12 to 16/20 */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-16 2xl:gap-20">
                
                {/* Logo Section - Reduced mobile sizes */}
                <motion.div
                    className="flex-shrink-0"
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
                    <div className="relative 
                        w-[150px] h-[120px] 
                        sm:w-[200px] sm:h-[150px]
                        md:w-[300px] md:h-[250px] 
                        lg:w-[350px] lg:h-[300px]
                        xl:w-[400px] xl:h-[350px]
                        2xl:w-[500px] 2xl:h-[400px]"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Kyoto Web Studio Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>
                
                {/* Content Section - Added blur animation and reduced mobile text */}
                <div className="text-center xl:text-left flex-1">
                    <motion.h1
                        className="mb-4 xl:mb-6"
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        <span
                            className={`block tracking-wide 
                                text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl 
                                text-white leading-none ${
                                isJapanese ? 'font-zenOldMincho' : "font-['Anton']"
                            }`}
                        >
                            {t('title')}
                        </span>
                        <span
                            className={`block 
                                text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 
                                text-[#06B6D4] font-light mt-2 md:mt-3 ${
                                isJapanese
                                    ? 'font-notoSansJP'
                                    : "font-['Open_Sans']"
                            }`}
                        >
                            {t('subtitle')}
                        </span>
                    </motion.h1>
                    
                    <motion.p
                        className={`
                            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                            text-white/90 mb-6 xl:mb-10 
                            max-w-lg xl:max-w-xl mx-auto xl:mx-0 
                            ${isJapanese ? 'font-notoSansJP' : ''}
                        `}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                    >
                        {t('description')}
                    </motion.p>
                    
                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 xl:gap-4 justify-center xl:justify-start"
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 2.1, duration: 0.8 }}
                    >
                        <Link
                            href="/contact"
                            className={`inline-flex items-center 
                                px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 xl:px-8 xl:py-4 
                                text-xs sm:text-sm md:text-base
                                bg-[#FF851B] text-white font-semibold rounded-full 
                                hover:bg-[#FF851B]/90 transform hover:-translate-y-1 
                                transition-all duration-300 shadow-lg hover:shadow-xl 
                                ${isJapanese ? 'font-notoSansJP' : ''}
                            `}
                        >
                            {t('ctaPrimary')}
                            <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </Link>
                        <Link
                            href="/services"
                            className={`inline-flex items-center 
                                px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 xl:px-8 xl:py-4 
                                text-xs sm:text-sm md:text-base
                                border-2 border-[#06B6D4] text-white font-semibold rounded-full 
                                hover:bg-[#06B6D4] hover:border-[#06B6D4] 
                                transform hover:-translate-y-1 transition-all duration-300 
                                ${isJapanese ? 'font-notoSansJP' : ''}
                            `}
                        >
                            {t('ctaSecondary')}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;