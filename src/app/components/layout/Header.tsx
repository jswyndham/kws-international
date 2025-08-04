'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '../../../i18n/routing';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Header = () => {
	const t = useTranslations('Header');
	const [scrolled, setScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const headerVariants = {
		initial: {
			backgroundColor: 'rgba(0, 31, 63, 0)',
			backdropFilter: 'blur(0px)',
		},
		scrolled: {
			backgroundColor: 'rgba(0, 31, 63, 0.95)',
			backdropFilter: 'blur(12px)',
			transition: {
				backgroundColor: { duration: 0.6, ease: 'easeInOut' as const },
				backdropFilter: { duration: 0.6, ease: 'easeInOut' as const },
			},
		},
	};

	const logoVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: 0.2,
				ease: 'easeOut' as const,
			},
		},
	};

	const navItems = [
		{ href: '#services', label: 'services' },
		{ href: '#portfolio', label: 'portfolio' },
		{ href: '#about', label: 'about' },
		{ href: '#contact', label: 'contact' },
	];

	return (
		<motion.header
			className="fixed top-0 w-full z-50"
			initial="initial"
			animate={scrolled ? 'scrolled' : 'initial'}
			variants={headerVariants}
		>
			<nav className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex justify-between items-center">
					<Link href="/" className="flex items-center space-x-2">
						<AnimatePresence mode="wait">
							{scrolled ? (
								<motion.div
									key="logo"
									initial="hidden"
									animate="visible"
									exit="hidden"
									variants={logoVariants}
								>
									<Image
										src="/images/logo.png"
										alt="Kyoto Web Studio Logo"
										width={100}
										height={80}
									/>
								</motion.div>
							) : null}
						</AnimatePresence>
					</Link>

					<div className="flex items-center gap-8">
						<ul className="hidden md:flex space-x-8 mt-12">
							{navItems.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										className="text-white font-semibold hover:text-[#06B6D4] transition-colors relative group"
									>
										{t(item.label)}
										<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF851B] transition-all group-hover:w-full"></span>
									</a>
								</li>
							))}
						</ul>

						{/* Language Switcher with enhanced positioning */}
						<div className="mt-12">
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</nav>
		</motion.header>
	);
};

export default Header;
