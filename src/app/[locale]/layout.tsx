import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '../../i18n/routing';

const openSans = Open_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-open-sans',
});

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const isJapanese = locale === 'ja';

	const baseUrl = 'https://kyotowebstudio.com';
	const url = locale === 'ja' ? `${baseUrl}/ja` : baseUrl;

	return {
		title: isJapanese
			? '京都ウェブスタジオ - スマートウェブサイト。グローバルSEO。日本製。'
			: 'Kyoto Web Studio - Smart Websites. Global SEO. Made in Japan.',
		description: isJapanese
			? '京都から最先端のウェブ開発とSEOの専門知識でデジタルプレゼンスを変革します。WordPress、React、Next.js開発。'
			: 'Transform your digital presence with cutting-edge web development and SEO expertise. WordPress, React, Next.js development from the heart of Kyoto.',
		keywords: isJapanese
			? 'ウェブ開発, SEO, WordPress, React, Next.js, 京都, 日本, ウェブデザイン, ウェブサイトメンテナンス, ホスティング'
			: 'web development, SEO, WordPress, React, Next.js, Kyoto, Japan, web design, website maintenance, hosting',
		authors: [
			{ name: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio' },
		],
		creator: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
		publisher: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: url,
			languages: {
				en: '/',
				ja: '/ja',
			},
		},
		openGraph: {
			title: isJapanese
				? '京都ウェブスタジオ - スマートウェブサイト。グローバルSEO。日本製。'
				: 'Kyoto Web Studio - Smart Websites. Global SEO. Made in Japan.',
			description: isJapanese
				? '京都から最先端のウェブ開発とSEOの専門知識でデジタルプレゼンスを変革します。'
				: 'Transform your digital presence with cutting-edge web development and SEO expertise from the heart of Kyoto.',
			url: url,
			siteName: isJapanese ? '京都ウェブスタジオ' : 'Kyoto Web Studio',
			images: [
				{
					url: '/og-image.jpg',
					width: 1200,
					height: 630,
					alt: isJapanese
						? '京都ウェブスタジオ - ウェブ開発＆SEOサービス'
						: 'Kyoto Web Studio - Web Development & SEO Services',
				},
			],
			locale: locale === 'ja' ? 'ja_JP' : 'en_US',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: isJapanese
				? '京都ウェブスタジオ - スマートウェブサイト。グローバルSEO。'
				: 'Kyoto Web Studio - Smart Websites. Global SEO.',
			description: isJapanese
				? '最先端のウェブ開発とSEOの専門知識でデジタルプレゼンスを変革します。'
				: 'Transform your digital presence with cutting-edge web development and SEO expertise.',
			images: ['/twitter-image.jpg'],
			creator: '@kyotowebstudio',
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
		icons: {
			icon: [
				{ url: '/favicon.ico' },
				{
					url: '/favicon-16x16.png',
					sizes: '16x16',
					type: 'image/png',
				},
				{
					url: '/favicon-32x32.png',
					sizes: '32x32',
					type: 'image/png',
				},
			],
			apple: [{ url: '/apple-touch-icon.png' }],
			other: [
				{
					rel: 'mask-icon',
					url: '/safari-pinned-tab.svg',
				},
			],
		},
		manifest: '/site.webmanifest',
	};
}

export const viewport: Viewport = {
	themeColor: '#001F3F',
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Ensure that the incoming locale is valid
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Providing all messages to the client
	const messages = await getMessages();

	return (
		<html lang={locale} className={openSans.variable}>
			<body className={`${openSans.className} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
