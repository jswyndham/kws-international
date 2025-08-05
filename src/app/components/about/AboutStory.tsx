'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Globe, Code, Search, Users } from 'lucide-react';

const AboutStory = () => {
	const t = useTranslations('AboutPage');
	const locale = useLocale();
	const isJapanese = locale === 'ja';

	const milestones = [
		{
			year: '2012',
			icon: Globe,
			titleKey: 'arrivedInJapan',
			descriptionKey: 'arrivedInJapanDesc',
		},
		{
			year: '2016-2022',
			icon: Users,
			titleKey: 'academicResearch',
			descriptionKey: 'academicResearchDesc',
		},
		{
			year: '2023',
			icon: Search,
			titleKey: 'romancingJapan',
			descriptionKey: 'romancingJapanDesc',
		},
		{
			year: '2024',
			icon: Code,
			titleKey: 'kyotoWebStudio',
			descriptionKey: 'kyotoWebStudioDesc',
		},
	];

	return (
		<section className="py-20 bg-[#001F3F]">
			{/* Header with animation */}
			<div className="mb-16 pl-8 md:pl-20">
				<div className="relative h-[120px] md:h-[100px] flex items-center">
					<motion.div
						className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30 z-20"
						initial={{ scaleX: 0 }}
						whileInView={{ scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, ease: 'easeOut' }}
					/>

					<div className="absolute bottom-0 left-0 right-0 h-full">
						<motion.h2
							className={`absolute text-3xl md:text-6xl lg:text-8xl font-light text-white tracking-wide ${
								isJapanese
									? 'font-notoSansJP'
									: 'font-helvetica'
							}`}
							style={{ bottom: '10px' }}
							initial={{
								x: 'calc(50vw - 50% - 80px)',
								y: 120,
								opacity: 0,
							}}
							whileInView={{
								x: 0,
								y: 0,
								opacity: 1,
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
									delay: 1.2,
									duration: 1.5,
									ease: 'easeInOut',
								},
								opacity: { delay: 0.8, duration: 0.8 },
							}}
						>
							{t('story.title')}
						</motion.h2>
					</div>
				</div>

				<motion.p
					className={`text-xl text-white/70 max-w-3xl mt-6 ${
						isJapanese ? 'font-zenOldMincho' : ''
					}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 1.5 }}
				>
					{t('story.subtitle')}
				</motion.p>
			</div>

			<div className="max-w-5xl mx-auto px-6">
				{/* Timeline */}
				<div className="relative">
					{/* Vertical line */}
					<motion.div
						className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/20"
						initial={{ scaleY: 0 }}
						whileInView={{ scaleY: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, delay: 0.5 }}
					/>

					{/* Milestones */}
					<div className="space-y-12">
						{milestones.map((milestone, index) => {
							const Icon = milestone.icon;
							return (
								<motion.div
									key={milestone.year}
									className="relative flex items-start gap-8"
									initial={{ opacity: 0, x: -50 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.8,
										delay: index * 0.2,
									}}
								>
									{/* Icon */}
									<motion.div
										className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#FF851B] to-[#06B6D4] rounded-full flex items-center justify-center shadow-lg"
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.3 }}
									>
										<Icon className="w-8 h-8 text-white" />
									</motion.div>

									{/* Content */}
									<div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
										<div className="flex items-center gap-4 mb-2">
											<span className="text-[#06B6D4] font-bold text-lg">
												{milestone.year}
											</span>
											<h3
												className={`text-xl font-semibold text-white ${
													isJapanese
														? 'font-notoSansJP'
														: ''
												}`}
											>
												{t(
													`story.milestones.${milestone.titleKey}`
												)}
											</h3>
										</div>
										<p
											className={`text-white/70 ${
												isJapanese
													? 'font-zenOldMincho'
													: ''
											}`}
										>
											{t(
												`story.milestones.${milestone.descriptionKey}`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* Special Skills */}
				<motion.div
					className="mt-20 grid md:grid-cols-3 gap-6"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					{[
						'bilingualAdvantage',
						'academicApproach',
						'localKnowledge',
					].map((skill, index) => (
						<motion.div
							key={skill}
							className="bg-gradient-to-br from-[#4F46E5]/20 to-[#06B6D4]/20 rounded-xl p-6 border border-white/10"
							whileHover={{ y: -5 }}
							transition={{ duration: 0.3 }}
						>
							<h4
								className={`text-white font-semibold mb-2 ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{t(`story.skills.${skill}.title`)}
							</h4>
							<p
								className={`text-white/70 text-sm ${
									isJapanese ? 'font-zenOldMincho' : ''
								}`}
							>
								{t(`story.skills.${skill}.description`)}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default AboutStory;
