import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
	icon: LucideIcon | React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	features: string[];
	index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
	icon: Icon,
	title,
	description,
	features,
	index = 0,
}) => {
	const cardVariants = {
		hover: {
			y: -10,
			transition: {
				duration: 0.3,
				ease: 'easeOut' as const,
			},
		},
	};

	const iconVariants = {
		initial: { scale: 1, rotate: 0 },
		hover: {
			scale: 1.1,
			rotate: [0, -10, 10, -10, 0],
			transition: {
				rotate: {
					duration: 0.5,
					ease: 'easeInOut' as const,
				},
				scale: {
					duration: 0.2,
				},
			},
		},
	};

	const featureVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.3,
			},
		}),
	};

	return (
		<motion.div
			className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden h-full flex flex-col"
			variants={cardVariants}
			whileHover="hover"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			{/* Animated background gradient */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-[#FF851B]/20 to-[#06B6D4]/20 opacity-0"
				initial={{ opacity: 0 }}
				whileHover={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			/>

			<div className="relative z-10 flex flex-col h-full">
				<motion.div
					className="w-16 h-16 bg-gradient-to-br from-[#FF851B] to-[#06B6D4] rounded-2xl flex items-center justify-center mb-6"
					variants={iconVariants}
					initial="initial"
					whileHover="hover"
				>
					<Icon className="w-8 h-8 text-white" />
				</motion.div>

				<motion.h3
					className="text-2xl font-bold text-white mb-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 + index * 0.1 }}
				>
					{title}
				</motion.h3>

				<motion.p
					className="text-white/70 mb-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 + index * 0.1 }}
				>
					{description}
				</motion.p>

				<ul className="space-y-2 mt-auto">
					{features.map((feature, i) => (
						<motion.li
							key={i}
							className="text-white/60 text-sm flex items-start"
							custom={i}
							initial="hidden"
							animate="visible"
							variants={featureVariants}
						>
							<motion.span
								className="text-[#06B6D4] mr-2"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									delay: 0.4 + index * 0.1 + i * 0.1,
									type: 'spring',
								}}
							>
								•
							</motion.span>
							{feature}
						</motion.li>
					))}
				</ul>
			</div>

			{/* Animated border effect */}
			<motion.div
				className="absolute inset-0 rounded-2xl"
				initial={{ opacity: 0 }}
				whileHover={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				style={{
					background: `linear-gradient(45deg, transparent 30%, #FF851B 50%, transparent 70%)`,
					backgroundSize: '200% 200%',
					backgroundPosition: '-100% 0',
					mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					maskComposite: 'exclude',
					padding: '1px',
				}}
				animate={{
					backgroundPosition: ['200% 0', '-100% 0'],
				}}
			/>
		</motion.div>
	);
};

export default ServiceCard;
