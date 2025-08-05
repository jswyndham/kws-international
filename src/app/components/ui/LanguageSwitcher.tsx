'use client';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from '../../../i18n/routing';

// Pill Switcher with Gradient Border
export function LanguageSwitcherPill() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	const handleChange = (newLocale: string) => {
		startTransition(() => {
			router.replace(pathname, { locale: newLocale });
		});
	};

	return (
		<motion.div
			className="relative p-[2px] rounded-full"
			whileHover={{ scale: 1.05 }}
		>
			{/* Static gradient border */}
			<div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF851B] via-[#06B6D4] to-[#4F46E5]" />

			{/* Inner container */}
			<div className="relative bg-[#001F3F] rounded-full flex p-1">
				{/* Sliding background - now white */}
				<motion.div
					className="absolute h-[36px] w-[70px] bg-white rounded-full"
					animate={{ x: locale === 'ja' ? 2 : 72 }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				/>

				{/* Language options */}
				<button
					onClick={() => handleChange('ja')}
					disabled={isPending}
					className={`relative z-10 px-4 py-2 rounded-full transition-all duration-300 ${
						locale === 'ja'
							? 'text-[#001F3F] font-bold'
							: 'text-white/60 hover:text-white/80'
					}`}
				>
					<span className="font-bold">🇯🇵 JA</span>
				</button>
				<button
					onClick={() => handleChange('en')}
					disabled={isPending}
					className={`relative z-10 px-4 py-2 rounded-full transition-all duration-300 ${
						locale === 'en'
							? 'text-[#001F3F] font-bold'
							: 'text-white/60 hover:text-white/80'
					}`}
				>
					<span className="font-bold">🇬🇧 EN</span>
				</button>
			</div>
		</motion.div>
	);
}

// Export the one you prefer as default
export default LanguageSwitcherPill;
