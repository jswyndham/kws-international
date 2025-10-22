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
		authors: [{ name: 'Kyoto Web Studio' }],
		creator: 'Kyoto Web Studio',
		publisher: 'Kyoto Web Studio',
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: url,
			siteName: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			type: 'website',
			images: [
				{
					url: `${baseUrl}/og-image.jpg`,
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
			images: [`${baseUrl}/twitter-image.jpg`],
			creator: '@kyotowebstudio',
			site: '@kyotowebstudio',
		},
		alternates: {
			canonical: url,
			languages: {
				'en-US': `${baseUrl}/en`,
				'ja-JP': baseUrl,
			},
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		verification: {
			google: 'your-google-verification-code', // Add your verification code
		},
	};
}

export default async function Home({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'HomeMeta' });
	const isJapanese = locale === 'ja';
	const baseUrl = 'https://kyotowebstudio.com';

	// Enhanced Schema with @graph structure
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			// Organization Schema
			{
				'@type': 'Organization',
				'@id': `${baseUrl}/#organization`,
				name: 'Kyoto Web Studio',
				alternateName: isJapanese ? '京都ウェブスタジオ' : 'KWS',
				url: baseUrl,
				logo: {
					'@type': 'ImageObject',
					'@id': `${baseUrl}/#logo`,
					url: `${baseUrl}/images/logo.png`,
					width: 600,
					height: 60,
					caption: 'Kyoto Web Studio',
				},
				image: { '@id': `${baseUrl}/#logo` },
				description: t('description'),
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
				contactPoint: [
					{
						'@type': 'ContactPoint',
						contactType: 'customer service',
						areaServed: ['JP', 'US', 'GB'],
						availableLanguage: ['ja', 'en'],
						url: `${baseUrl}/${locale}/contact`,
					},
				],
				sameAs: [
					'https://twitter.com/kyotowebstudio',
					'https://www.linkedin.com/company/kyotowebstudio',
					'https://github.com/kyotowebstudio',
				],
				founder: {
					'@type': 'Person',
					name: 'Your Name', // Add founder name
				},
				foundingDate: '2023', // Add founding year
				slogan: isJapanese
					? 'グローバルSEO。日本製。'
					: 'Global SEO. Made in Japan.',
			},
			// WebSite Schema
			{
				'@type': 'WebSite',
				'@id': `${baseUrl}/#website`,
				url: baseUrl,
				name: 'Kyoto Web Studio',
				description: t('description'),
				publisher: { '@id': `${baseUrl}/#organization` },
				inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: `${baseUrl}/${locale}/blog?search={search_term_string}`,
					},
					'query-input': 'required name=search_term_string',
				},
			},
			// WebPage Schema
			{
				'@type': 'WebPage',
				'@id': `${locale === 'ja' ? baseUrl : `${baseUrl}/${locale}`}#webpage`,
				url: locale === 'ja' ? baseUrl : `${baseUrl}/${locale}`,
				name: t('title'),
				description: t('description'),
				isPartOf: { '@id': `${baseUrl}/#website` },
				about: { '@id': `${baseUrl}/#organization` },
				datePublished: '2023-01-01', // Add your launch date
				dateModified: new Date().toISOString().split('T')[0],
				inLanguage: locale === 'ja' ? 'ja-JP' : 'en-US',
				breadcrumb: {
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: isJapanese ? 'ホーム' : 'Home',
							item: locale === 'ja' ? baseUrl : `${baseUrl}/${locale}`,
						},
					],
				},
			},
			// ProfessionalService Schema
			{
				'@type': 'ProfessionalService',
				'@id': `${baseUrl}/#professionalservice`,
				name: 'Kyoto Web Studio',
				image: `${baseUrl}/images/logo.png`,
				description: t('description'),
				provider: { '@id': `${baseUrl}/#organization` },
				areaServed: [
					{ '@type': 'Country', name: 'Japan' },
					{ '@type': 'Country', name: 'United States' },
					{ '@type': 'Country', name: 'United Kingdom' },
				],
				priceRange: '$$',
				url: baseUrl,
				serviceType: [
					'Web Development',
					'SEO Optimization',
					'WordPress Development',
					'React Development',
					'Next.js Development',
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: isJapanese ? 'サービス' : 'Services',
					itemListElement: [
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: isJapanese
									? 'カスタムウェブサイトデザイン・開発'
									: 'Custom Website Design & Development',
								description: isJapanese
									? 'React、WordPress、Elementor Proを使用したカスタムウェブサイトの設計と開発'
									: 'Custom website design and development using React, WordPress, and Elementor Pro',
								serviceType: 'Web Development',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: isJapanese ? 'SEO最適化' : 'SEO Optimization',
								description: isJapanese
									? 'テクニカルSEO、オンページSEO、コンテンツ作成、戦略立案'
									: 'Technical SEO, on-page SEO, content creation, and strategy planning',
								serviceType: 'SEO Services',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: isJapanese
									? 'ウェブサイトメンテナンス'
									: 'Website Maintenance Plans',
								description: isJapanese
									? '継続的なサポートとアップデート'
									: 'Ongoing support and updates for your website',
								serviceType: 'Maintenance',
							},
						},
						{
							'@type': 'Offer',
							itemOffered: {
								'@type': 'Service',
								name: isJapanese
									? 'ウェブホスティングパッケージ'
									: 'Web Hosting Packages',
								description: isJapanese
									? 'Hostingerビジネスホスティングによるウェブホスティング'
									: 'Web hosting via Hostinger Business Hosting',
								serviceType: 'Hosting',
							},
						},
					],
				},
			},
		],
	};

	return (
		<>
			{/* Enhanced JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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