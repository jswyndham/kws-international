// src/app/[locale]/services/page.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ServicesHero from '@/app/components/services/ServicesHero';
import ServicesPricing from '@/app/components/services/ServicesPricing';
import ServicesComparison from '@/app/components/services/ServicesComparison';
import ServicesFAQ from '@/app/components/services/ServicesFAQ';
import ServicesCTA from '@/app/components/services/ServicesCTA';

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'ServicesMeta' });
	const isJapanese = locale === 'ja';

	const baseUrl = 'https://kyotowebstudio.com';
	const url = `${baseUrl}/${locale}/services`;

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
					url: '/og-services.jpg',
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
			images: ['/twitter-services.jpg'],
		},
		alternates: {
			canonical: url,
			languages: {
				en: '/en/services',
				ja: '/ja/services',
			},
		},
	};
}

export default async function ServicesPage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'ServicesMeta' });
	const isJapanese = locale === 'ja';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Web Development and SEO Services',
		provider: {
			'@type': 'LocalBusiness',
			'@id': 'https://kyotowebstudio.com/#organization',
			name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			image: 'https://kyotowebstudio.com/logo.png',
		},
		areaServed: [
			{
				'@type': 'Country',
				name: 'Japan',
			},
			{
				'@type': 'Country',
				name: 'Global',
			},
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: t('servicesTitle'),
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese
							? 'WordPress開発'
							: 'WordPress Development',
						description: isJapanese
							? 'プロフェッショナルなWordPressサイト開発'
							: 'Professional WordPress website development',
					},
					priceSpecification: {
						'@type': 'PriceSpecification',
						priceCurrency: 'JPY',
						minPrice: 200000,
						maxPrice: 600000,
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese
							? 'カスタム開発'
							: 'Custom Development',
						description: isJapanese
							? 'React/Next.jsによるカスタムウェブアプリケーション開発'
							: 'Custom web application development with React/Next.js',
					},
					priceSpecification: {
						'@type': 'PriceSpecification',
						priceCurrency: 'JPY',
						minPrice: 300000,
						maxPrice: 1200000,
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: isJapanese
							? 'AI SEOコンテンツ'
							: 'AI SEO Content',
						description: isJapanese
							? 'MeCab解析を使用したAI日本語記事生成とSEO最適化'
							: 'AI-powered Japanese content generation with MeCab analysis and SEO optimization',
					},
					priceSpecification: {
						'@type': 'PriceSpecification',
						priceCurrency: 'JPY',
						price: 50000,
						unitText: isJapanese ? '月' : 'month',
					},
				},
			],
		},
	};

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: t('faq1Question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faq1Answer'),
				},
			},
			{
				'@type': 'Question',
				name: t('faq2Question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faq2Answer'),
				},
			},
			{
				'@type': 'Question',
				name: t('faq3Question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: t('faq3Answer'),
				},
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<main>
				<ServicesHero />
				<ServicesPricing />
				<ServicesComparison />
				<ServicesFAQ />
				<ServicesCTA />
			</main>
		</>
	);
}
