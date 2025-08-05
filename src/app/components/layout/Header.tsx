'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../i18n/routing';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { Menu, X } from 'lucide-react';

const Header = () => {
	const t = useTranslations('Header');
	const locale = useLocale();
	const isJapanese = locale === 'ja';
	const [scrolled, setScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMenuOpen]);

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
		{ href: '#about', label: 'about' },
		{ href: '#contact', label: 'contact' },
	];

	const handleNavClick = (href: string) => {
		setIsMenuOpen(false);
		// Small delay to allow menu to close before scrolling
		setTimeout(() => {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}, 300);
	};

	// Mobile menu overlay variants
	const menuVariants = {
		closed: {
			x: '100%',
			transition: {
				type: 'spring' as const,
				stiffness: 300,
				damping: 30,
			},
		},
		open: {
			x: 0,
			transition: {
				type: 'spring' as const,
				stiffness: 300,
				damping: 30,
				bounce: 0.25,
			},
		},
	};

	// Stagger animation for menu items
	const menuItemVariants = {
		closed: {
			x: 50,
			opacity: 0,
		},
		open: {
			x: 0,
			opacity: 1,
			transition: {
				type: 'spring' as const,
				stiffness: 300,
				damping: 30,
			},
		},
	};

	const menuContainerVariants = {
		closed: {
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
		open: {
			transition: {
				staggerChildren: 0.07,
				delayChildren: 0.2,
			},
		},
	};

	return (
		<>
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
								) : (
									<motion.div
										key="logo-mobile"
										className="md:hidden"
										initial="hidden"
										animate="visible"
										variants={logoVariants}
									>
										<Image
											src="/images/logo.png"
											alt="Kyoto Web Studio Logo"
											width={80}
											height={64}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-8">
							<ul className="flex space-x-8 mt-12">
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
							<div className="mt-12">
								<LanguageSwitcher />
							</div>
						</div>

						{/* Mobile Menu Button */}
						<motion.button
							className="md:hidden relative z-60 w-12 h-12 flex items-center justify-center"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							whileTap={{ scale: 0.95 }}
						>
							<AnimatePresence mode="wait">
								{isMenuOpen ? (
									<motion.div
										key="close"
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<X className="w-8 h-8 text-white" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<Menu className="w-8 h-8 text-white" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</nav>
			</motion.header>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						{/* Background Overlay */}
						<motion.div
							className="fixed inset-0 bg-black/50 z-40 md:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsMenuOpen(false)}
						/>

						{/* Menu Panel */}
						<motion.div
							className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#001F3F] z-50 md:hidden"
							variants={menuVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							<div className="flex flex-col h-full">
								{/* Menu Header */}
								<div className="flex justify-between items-center p-6 border-b border-white/10">
									<Image
										src="/images/logo.png"
										alt="Kyoto Web Studio Logo"
										width={100}
										height={80}
									/>
									<motion.button
										onClick={() => setIsMenuOpen(false)}
										whileTap={{ scale: 0.95 }}
										className="w-10 h-10 flex items-center justify-center"
									>
										<X className="w-6 h-6 text-white" />
									</motion.button>
								</div>

								{/* Language Switcher at Top */}
								<motion.div
									className="px-6 py-4 border-b border-white/10"
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
									<LanguageSwitcher />
								</motion.div>

								{/* Navigation Items */}
								<motion.nav
									className="flex-1 px-6 py-8"
									variants={menuContainerVariants}
									initial="closed"
									animate="open"
									exit="closed"
								>
									{navItems.map((item, index) => (
										<motion.div
											key={item.label}
											variants={menuItemVariants}
											custom={index}
										>
											<button
												onClick={() =>
													handleNavClick(item.href)
												}
												className={`block w-full text-left py-4 text-2xl font-semibold text-white hover:text-[#06B6D4] transition-colors relative group ${
													isJapanese
														? 'font-notoSansJP'
														: ''
												}`}
											>
												{t(item.label)}
												<motion.span
													className="absolute bottom-3 left-0 h-0.5 bg-[#FF851B]"
													initial={{ width: 0 }}
													whileHover={{
														width: '100%',
													}}
													transition={{
														duration: 0.3,
													}}
												/>
											</button>
										</motion.div>
									))}
								</motion.nav>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;
