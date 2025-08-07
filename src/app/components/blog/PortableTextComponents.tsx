// src/app/components/blog/PortableTextComponents.tsx
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { PortableTextComponents } from '@portabletext/react';
import { useLocale } from 'next-intl';
import { urlFor } from '../../../../lib/urlFor';

// Type definitions for portable text values
interface ImageValue {
	_type: 'image';
	asset?: any;
	caption?: string;
	alt?: string;
}

interface YouTubeValue {
	_type: 'youTube';
	url?: string;
}

interface TableValue {
	_type: 'table';
	columns?: string[];
	rows?: Array<{ cells: string[] }>;
}

interface CodeFieldValue {
	_type: 'code';
	code: string;
	language?: string;
	filename?: string;
}

interface ExtendedLinkMark {
	_type: 'link';
	href?: string;
	blank?: boolean;
}

interface ExtendedInternalLinkMark {
	_type: 'internalLink';
	reference?: {
		slug?: { current: string };
	};
	slug?: string;
}

// Dynamic imports for performance
const YouTubeEmbed = dynamic(() => import('../portable-text/YouTubeEmbed'), {
	loading: () => (
		<div className="animate-pulse bg-white/10 h-96 rounded-lg flex items-center justify-center">
			<span className="text-white/50">Loading video...</span>
		</div>
	),
});

const TableComponent = dynamic(
	() => import('../portable-text/TableComponent'),
	{
		loading: () => (
			<div className="animate-pulse bg-white/10 h-32 rounded-lg flex items-center justify-center">
				<span className="text-white/50">Loading table...</span>
			</div>
		),
	}
);

const CodeBlock = dynamic(() => import('../portable-text/CodeBlock'), {
	loading: () => (
		<div className="animate-pulse bg-black/50 h-32 rounded-lg flex items-center justify-center">
			<span className="text-white/50">Loading code...</span>
		</div>
	),
});

export function createPortableTextComponents(
	isJapanese: boolean
): PortableTextComponents {
	return {
		types: {
			// Image handler
			image: ({ value }: { value: ImageValue }) => {
				if (!value?.asset) return null;

				return (
					<figure className="my-8">
						<div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
							<Image
								src={urlFor(value, {
									width: 1200,
									quality: 90,
								})}
								alt={value.alt || value.caption || 'Blog image'}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
							/>
						</div>
						{value.caption && (
							<figcaption
								className={`text-center text-sm text-white/60 mt-3 ${
									isJapanese ? 'font-notoSansJP' : ''
								}`}
							>
								{value.caption}
							</figcaption>
						)}
					</figure>
				);
			},

			// YouTube embed
			youTube: ({ value }: { value: YouTubeValue }) => {
				return <YouTubeEmbed {...value} />;
			},

			// Table component
			table: ({ value }: { value: TableValue }) => {
				return <TableComponent value={value} isJapanese={isJapanese} />;
			},

			// Code block
			myCodeField: ({ value }: { value: CodeFieldValue }) => {
				const language = value.language || 'javascript';
				return <CodeBlock code={value.code} language={language} />;
			},
		},

		// List styling
		list: {
			bullet: ({ children }) =>
				children ? (
					<ul
						className={`list-disc list-inside space-y-2 my-6 text-white/90 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{children}
					</ul>
				) : null,

			number: ({ children }) =>
				children ? (
					<ol
						className={`list-decimal list-inside space-y-2 my-6 text-white/90 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{children}
					</ol>
				) : null,
		},

		// List item styling
		listItem: {
			bullet: ({ children }) => (
				<li className="ml-4">
					<span className="text-[#FF851B] mr-2">•</span>
					<span>{children}</span>
				</li>
			),
			number: ({ children }) => (
				<li className="ml-4">
					<span className="text-[#06B6D4] mr-2"></span>
					<span>{children}</span>
				</li>
			),
		},

		// Block styling
		block: {
			normal: ({ children }) =>
				children ? (
					<p
						className={`mb-6 text-white/90 leading-relaxed ${
							isJapanese ? 'font-notoSansJP text-lg' : 'text-lg'
						}`}
					>
						{children}
					</p>
				) : null,

			h1: ({ children, value }) =>
				children ? (
					<h1
						id={value?._key}
						className={`text-4xl md:text-5xl font-bold mt-12 mb-6 text-white ${
							isJapanese ? 'font-zenOldMincho' : 'font-helvetica'
						}`}
					>
						{children}
					</h1>
				) : null,

			h2: ({ children, value }) =>
				children ? (
					<div className="relative my-12">
						<div className="relative h-[80px] flex items-center">
							<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF851B] to-[#06B6D4]/30" />
							<h2
								id={value?._key}
								className={`text-3xl md:text-4xl font-bold text-white ${
									isJapanese
										? 'font-zenOldMincho'
										: 'font-helvetica'
								}`}
							>
								{children}
							</h2>
						</div>
					</div>
				) : null,

			h3: ({ children, value }) =>
				children ? (
					<h3
						id={value?._key}
						className={`text-2xl md:text-3xl font-semibold mt-8 mb-4 text-white ${
							isJapanese ? 'font-notoSansJP' : 'font-helvetica'
						}`}
					>
						{children}
					</h3>
				) : null,

			h4: ({ children, value }) =>
				children ? (
					<h4
						id={value?._key}
						className={`text-xl md:text-2xl font-semibold mt-6 mb-3 text-white/90 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{children}
					</h4>
				) : null,

			h5: ({ children, value }) =>
				children ? (
					<h5
						id={value?._key}
						className={`text-lg font-semibold mt-4 mb-2 text-white/90 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{children}
					</h5>
				) : null,

			h6: ({ children, value }) =>
				children ? (
					<h6
						id={value?._key}
						className={`text-base font-semibold mt-4 mb-2 text-white/80 ${
							isJapanese ? 'font-notoSansJP' : ''
						}`}
					>
						{children}
					</h6>
				) : null,

			blockquote: ({ children }) =>
				children ? (
					<blockquote className="relative my-8 pl-6 py-4 border-l-4 border-[#06B6D4] bg-white/5 rounded-r-lg">
						<span className="absolute -left-3 -top-3 text-5xl text-[#06B6D4]/30">
							"
						</span>
						<div
							className={`text-white/80 italic ${
								isJapanese ? 'font-zenOldMincho' : ''
							}`}
						>
							{children}
						</div>
					</blockquote>
				) : null,

			// Custom "Tip" Block
			tip: ({ children }) =>
				children ? (
					<div className="p-6 my-8 bg-gradient-to-r from-[#4F46E5]/20 to-[#06B6D4]/20 border-l-4 border-[#06B6D4] rounded-r-lg backdrop-blur-sm">
						<div className="flex items-start">
							<svg
								className="w-6 h-6 text-[#06B6D4] mr-3 flex-shrink-0 mt-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div>
								<p
									className={`font-bold text-[#06B6D4] mb-1 ${
										isJapanese ? 'font-notoSansJP' : ''
									}`}
								>
									{isJapanese ? 'ヒント:' : 'Pro Tip:'}
								</p>
								<div className="text-white/90">{children}</div>
							</div>
						</div>
					</div>
				) : null,

			// Custom "Highlight" Block
			highlight: ({ children }) =>
				children ? (
					<div className="p-4 my-6 bg-gradient-to-r from-[#FF851B]/20 to-[#FF851B]/10 border-l-4 border-[#FF851B] text-white rounded-r-lg">
						<div className="flex items-start">
							<svg
								className="w-5 h-5 text-[#FF851B] mr-2 flex-shrink-0 mt-0.5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
									clipRule="evenodd"
								/>
							</svg>
							<div>{children}</div>
						</div>
					</div>
				) : null,
		},

		// Mark styling
		marks: {
			strong: ({ children }) =>
				children ? (
					<strong className="font-bold text-[#FF851B]">
						{children}
					</strong>
				) : null,

			em: ({ children }) =>
				children ? (
					<em className="italic text-[#06B6D4]">{children}</em>
				) : null,

			underline: ({ children }) =>
				children ? (
					<span className="underline underline-offset-2 decoration-[#06B6D4]/50">
						{children}
					</span>
				) : null,

			'strike-through': ({ children }) =>
				children ? (
					<del className="line-through text-white/60">{children}</del>
				) : null,

			code: ({ children }) =>
				children ? (
					<code className="px-2 py-1 bg-white/10 text-[#06B6D4] rounded text-sm font-mono">
						{children}
					</code>
				) : null,

			// External link
			link: ({ value, children }) => {
				if (!children) return null;

				const linkValue = value as ExtendedLinkMark;
				const href = linkValue?.href || '#';
				const target =
					linkValue?.blank || href.startsWith('http')
						? '_blank'
						: undefined;
				const rel =
					target === '_blank' ? 'noopener noreferrer' : undefined;

				return (
					<Link
						href={href}
						target={target}
						rel={rel}
						className="text-[#06B6D4] underline underline-offset-4 hover:text-[#FF851B] transition-colors duration-300"
					>
						{children}
						{target === '_blank' && (
							<svg
								className="inline-block w-3 h-3 ml-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						)}
					</Link>
				);
			},

			// Internal link
			internalLink: ({ value, children }) => {
				if (!children) return null;
				const locale = useLocale();

				const internalValue = value as ExtendedInternalLinkMark;
				const slug = internalValue?.reference?.slug?.current;

				if (!slug) return <>{children}</>;

				return (
					<Link
						href={`/${locale}/blog/${slug}`}
						className="text-[#06B6D4] underline underline-offset-4 hover:text-[#FF851B] transition-colors duration-300"
					>
						{children}
					</Link>
				);
			},
		},
	};
}

// Hook to use the portable text components
export function usePortableTextComponents() {
	const locale = useLocale();
	const isJapanese = locale === 'ja';
	return createPortableTextComponents(isJapanese);
}
