// src/app/[locale]/about/page.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutHero from '@/app/components/about/AboutHero';
import AboutStory from '@/app/components/about/AboutStory';
import AboutPhilosophy from '@/app/components/about/AboutPhilosophy';
import AboutCTA from '@/app/components/about/AboutCTA';

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'AboutMeta' });
	const isJapanese = locale === 'ja';

	const baseUrl = 'https://kyotowebstudio.com';
	const url = `${baseUrl}/${locale}/about`;

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
					url: '/og-about.jpg',
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
			images: ['/twitter-about.jpg'],
		},
		alternates: {
			canonical: url,
			languages: {
				en: '/en/about',
				ja: '/ja/about',
			},
		},
	};
}

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	const isJapanese = locale === 'ja';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		mainEntity: {
			'@type': 'Person',
			name: 'James Saunders-Wyndham',
			jobTitle: isJapanese
				? 'ファウンダー / ウェブ開発者'
				: 'Founder / Web Developer',
			worksFor: {
				'@type': 'Organization',
				name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			},
			alumniOf: {
				'@type': 'CollegeOrUniversity',
				name: 'Academic Background in Education & Technology',
			},
			knowsAbout: [
				'Web Development',
				'SEO',
				'Japanese Language',
				'WordPress',
				'React',
				'Next.js',
				'AI Content Generation',
			],
			nationality: {
				'@type': 'Country',
				name: 'United Kingdom',
			},
			homeLocation: {
				'@type': 'City',
				name: 'Kyoto, Japan',
			},
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<main>
				<AboutHero />
				<AboutStory />
				<AboutPhilosophy />
				<AboutCTA />
			</main>
		</>
	);
}
