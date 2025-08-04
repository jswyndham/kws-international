// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['ja', 'en'],

	// Used when no locale matches
	defaultLocale: 'ja',

	// The prefix for the locale segment in the URL
	localePrefix: 'always', // This means all locales will have a prefix in the URL
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing);
