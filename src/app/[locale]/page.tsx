// src/app/[locale]/page.tsx
import Hero from '../components/home/Hero';
import Portfolio from '../components/home/Portfolio';
import Services from '../components/home/Services';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'HomeMeta' });
	const isJapanese = locale === 'ja';

	const baseUrl = 'https://kyotowebstudio.com';
	const url = locale === 'ja' ? baseUrl : `${baseUrl}/${locale}`;

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: url,
			siteName: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			type: 'website',
			images: [
				{
					url: '/og-image.jpg',
					width: 1200,
					height: 630,
					alt: t('ogImageAlt'),
				},
			],
			locale: locale === 'ja' ? 'ja_JP' : 'en_US',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/twitter-image.jpg'],
		},
		alternates: {
			canonical: url,
			languages: {
				en: '/en',
				ja: '/',
			},
		},
	};
}

export default async function Home({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'HomeMeta' });
	const isJapanese = locale === 'ja';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': 'https://kyotowebstudio.com/#website',
		url: 'https://kyotowebstudio.com',
		name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
		description: t('description'),
		publisher: {
			'@type': 'Organization',
			'@id': 'https://kyotowebstudio.com/#organization',
			name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			alternateName: 'KWS',
			url: 'https://kyotowebstudio.com',
			logo: {
				'@type': 'ImageObject',
				url: 'https://kyotowebstudio.com/logo.png',
				width: 600,
				height: 60,
			},
			image: {
				'@id': 'https://kyotowebstudio.com/#logo',
			},
			address: {
				'@type': 'PostalAddress',
				addressLocality: isJapanese ? '京都市' : 'Kyoto',
				addressRegion: isJapanese ? '京都府' : 'Kyoto',
				addressCountry: 'JP',
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: 35.0116,
				longitude: 135.7681,
			},
			contactPoint: {
				'@type': 'ContactPoint',
				telephone: '+81-75-123-4567',
				contactType: 'customer service',
				areaServed: ['JP', 'WW'],
				availableLanguage: ['Japanese', 'English'],
			},
			sameAs: [
				'https://twitter.com/kyotowebstudio',
				'https://www.linkedin.com/company/kyotowebstudio',
				'https://github.com/kyotowebstudio',
			],
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `https://kyotowebstudio.com/${locale}/search?q={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
		inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
	};

	// Service Schema
	const servicesJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': 'https://kyotowebstudio.com/#services',
		serviceType: isJapanese
			? 'ウェブ開発・SEOサービス'
			: 'Web Development & SEO Services',
		provider: {
			'@id': 'https://kyotowebstudio.com/#organization',
		},
		areaServed: {
			'@type': 'Country',
			name: 'Japan',
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: isJapanese
				? 'ウェブ開発サービス'
				: 'Web Development Services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese
							? 'WordPressサイト開発'
							: 'WordPress Development',
						description: isJapanese
							? 'プロフェッショナルなWordPressウェブサイトの設計と開発'
							: 'Professional WordPress website design and development',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese
							? 'React/Next.js開発'
							: 'React/Next.js Development',
						description: isJapanese
							? '最新のReactとNext.jsを使用した高性能ウェブアプリケーション'
							: 'High-performance web applications using modern React and Next.js',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese ? 'SEO最適化' : 'SEO Optimization',
						description: isJapanese
							? '日本市場とグローバル市場向けの包括的なSEO戦略'
							: 'Comprehensive SEO strategies for Japanese and global markets',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese
							? 'ウェブサイトメンテナンス'
							: 'Website Maintenance',
						description: isJapanese
							? '継続的なサポートとアップデート'
							: 'Ongoing support and updates for your website',
					},
				},
			],
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(servicesJsonLd),
				}}
			/>
			<div className="min-h-screen w-screen bg-[#001F3F]">
				<main>
					<Hero />
					<Portfolio />
					<Services />
				</main>
			</div>
		</>
	);
}
