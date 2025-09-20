'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { OptimizedMotionDiv } from './OptimizedMotionDiv';

interface ProjectHighlight {
	icon: any;
	text: string;
}

interface Project {
	id: string;
	title: string;
	logo: string;
	image: string;
	url: string;
	color: string;
	techStack: string[];
	highlights: ProjectHighlight[];
}

interface ProjectCardProps {
	project: Project;
	index: number;
	isJapanese: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	index,
	isJapanese,
}) => {
	const cardRef = useRef(null);
	const isInView = useInView(cardRef, { once: true, margin: '-100px' });
	const isEven = index % 2 === 0;

	// Animation variants for sliding
	const imageVariants = {
		hidden: {
			opacity: 0,
			x: isEven ? -100 : 100, // Slide from left if even, right if odd
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.1, 0.25, 1] as const,
			},
		},
	};

	const contentVariants = {
		hidden: {
			opacity: 0,
			x: isEven ? 100 : -100, // Slide from right if even, left if odd
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.1, 0.25, 1] as const,
				delay: 0.2, // Slight delay for staggered effect
			},
		},
	};

	return (
		<div
			ref={cardRef}
			className={`grid lg:grid-cols-2 gap-12 items-center ${
				isEven ? '' : 'lg:flex-row-reverse'
			}`}
		>
			{/* Image Section */}
			<OptimizedMotionDiv
				className={`relative group ${isEven ? '' : 'lg:order-2'}`}
				variants={imageVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					className="block relative overflow-hidden rounded-2xl shadow-2xl"
				>
					{/* Color overlay on hover */}
					<div
						className={`absolute inset-0 bg-gradient-to-br from-${project.color}/0 to-${project.color}/20 group-hover:from-${project.color}/20 group-hover:to-${project.color}/40 transition-all duration-500 z-10`}
					/>

					<Image
						src={project.image}
						alt={project.title}
						width={800}
						height={600}
						className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
					/>

					{/* Logo overlay */}
					<div className="absolute top-8 left-8 z-20">
						<OptimizedMotionDiv
							className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
							whileHover={{ scale: 1.1 }}
						>
							<Image
								src={project.logo}
								alt={`${project.title} logo`}
								width={80}
								height={80}
								className="w-full h-full object-contain"
							/>
						</OptimizedMotionDiv>
					</div>
				</a>
			</OptimizedMotionDiv>

			{/* Content Section */}
			<OptimizedMotionDiv
				className={`space-y-8 ${isEven ? '' : 'lg:order-1'}`}
				variants={contentVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				<div>
					{/* H3 Heading with complementary style */}
					<h3
						className={`text-3xl md:text-4xl mb-4 tracking-wide ${
							isJapanese
								? 'font-notoSansJP font-bold'
								: 'font-helvetica font-light uppercase'
						} text-white`}
					>
						{project.title}
					</h3>

					{/* Tech Stack - Minimal pills */}
					<div className="flex flex-wrap gap-2 mb-8">
						{project.techStack.map((tech: string) => (
							<span
								key={tech}
								className="px-3 py-1 text-sm bg-white/10 backdrop-blur-sm text-white/80 rounded-full border border-white/20"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Highlights with icons */}
				<div className="space-y-4">
					{project.highlights.map((highlight: any, idx: number) => (
						<OptimizedMotionDiv
							key={idx}
							className="flex items-start gap-4"
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{
								duration: 0.6,
								delay: 0.6 + idx * 0.1,
							}}
						>
							<div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
								<highlight.icon className="w-5 h-5 text-[#06B6D4]" />
							</div>
							<p
								className={`text-white/70 leading-relaxed ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{highlight.text}
							</p>
						</OptimizedMotionDiv>
					))}
				</div>

				{/* View Project Link */}
				<OptimizedMotionDiv
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					<a
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						className={`inline-flex items-center gap-2 text-lg font-semibold text-[#06B6D4] hover:text-[#FF851B] transition-colors group ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						View Live Site
						<ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
					</a>
				</OptimizedMotionDiv>
			</OptimizedMotionDiv>
		</div>
	);
};

export default ProjectCard;
