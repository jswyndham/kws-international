'use client';

import { useLocale } from 'next-intl';
import { useTransition, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '../../../i18n/routing';

export default function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	const handleChange = (newLocale: string) => {
		startTransition(() => {
			router.replace(pathname, { locale: newLocale });
		});
		setIsOpen(false);
	};

	const languages = [
		{ code: 'ja', label: '日本語', shortLabel: 'JA' },
		{ code: 'en', label: 'English', shortLabel: 'EN' },
	];

	const currentLanguage = languages.find((lang) => lang.code === locale);

	return (
		<div className="relative">
			{/* Toggle Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				disabled={isPending}
			>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<Globe className="w-4 h-4" />
				</motion.div>
				<span className="font-bold text-sm">
					{currentLanguage?.shortLabel}
				</span>
				<motion.svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<path
						d="M3 4.5L6 7.5L9 4.5"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</motion.svg>
			</motion.button>

			{/* Dropdown Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: -10 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className="absolute top-full right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-2xl"
					>
						<div className="bg-white/10 backdrop-blur-md border border-white/20">
							{languages.map((lang, index) => (
								<motion.button
									key={lang.code}
									onClick={() => handleChange(lang.code)}
									disabled={isPending || locale === lang.code}
									className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
										locale === lang.code
											? 'bg-[#FF851B] text-white'
											: 'text-white hover:bg-white/10'
									}`}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									whileHover={{ x: 5 }}
								>
									<motion.span
										className="font-bold text-lg w-10"
										whileHover={{ scale: 1.2 }}
										transition={{
											type: 'spring',
											stiffness: 400,
										}}
									>
										{lang.shortLabel}
									</motion.span>
									<span className="font-semibold">
										{lang.label}
									</span>
									{locale === lang.code && (
										<motion.svg
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className="w-4 h-4 ml-auto"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</motion.svg>
									)}
								</motion.button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Loading Overlay */}
			<AnimatePresence>
				{isPending && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-[#001F3F]/50 backdrop-blur-sm z-50 flex items-center justify-center"
					>
						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 1,
								repeat: Infinity,
								ease: 'linear',
							}}
							className="w-16 h-16 border-4 border-[#FF851B] border-t-transparent rounded-full"
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
