// src/app/[locale]/contact/page.tsx
import ContactPage from '@/app/components/contact/ContactPageClient';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'ContactMeta' });
	const isJapanese = locale === 'ja';

	const baseUrl = 'https://kyotowebstudio.com';
	const url = `${baseUrl}/${locale}/contact`;

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
					url: '/og-contact.jpg',
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
			images: ['/twitter-contact.jpg'],
		},
		alternates: {
			canonical: url,
			languages: {
				en: '/en/contact',
				ja: '/ja/contact',
			},
		},
	};
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'ContactMeta' });
	const isJapanese = locale === 'ja';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: t('title'),
		description: t('description'),
		url: `https://kyotowebstudio.com/${locale}/contact`,
		mainEntity: {
			'@type': 'LocalBusiness',
			'@id': 'https://kyotowebstudio.com/#organization',
			name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			image: 'https://kyotowebstudio.com/logo.png',
			telephone: '+81-75-123-4567',
			email: 'hello@kyotowebstudio.com',
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
			openingHoursSpecification: [
				{
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: [
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
					],
					opens: '09:00',
					closes: '18:00',
				},
			],
			sameAs: [
				'https://twitter.com/kyotowebstudio',
				'https://www.linkedin.com/company/kyotowebstudio',
			],
			priceRange: '¥¥',
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
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ContactPage />
		</>
	);
}
