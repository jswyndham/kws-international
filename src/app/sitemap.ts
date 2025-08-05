// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://kyotowebstudio.com';
	const locales = ['ja', 'en'];

	// Define your routes
	const routes = [
		'', // homepage
		'/about',
		'/services',
		'/contact',
	];

	// Generate entries for each route in each locale
	const sitemapEntries: MetadataRoute.Sitemap = [];

	routes.forEach((route) => {
		locales.forEach((locale) => {
			const url =
				locale === 'ja'
					? `${baseUrl}${route}`
					: `${baseUrl}/${locale}${route}`;

			sitemapEntries.push({
				url,
				lastModified: new Date(),
				changeFrequency: route === '' ? 'weekly' : 'monthly',
				priority:
					route === '' ? 1.0 : route === '/services' ? 0.9 : 0.8,
				alternates: {
					languages: {
						ja: `${baseUrl}${route}`,
						en: `${baseUrl}/en${route}`,
					},
				},
			});
		});
	});

	return sitemapEntries;
}
