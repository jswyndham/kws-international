// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
	matcher: [
        // Match all pathnames except for:
        // - … if they start with `/api`, `/_next`, `/_vercel`
        // - … if they contain a dot (e.g. `favicon.ico`, `sitemap.xml`, `robots.txt`)
        '/((?!api|_next|_vercel|.*\\..*).*)',
        // Only match locales at root and with paths
        '/(ja|en|ko)/:path*'
    ]
};
