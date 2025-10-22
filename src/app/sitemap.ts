// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPosts } from '../../sanity/sanity-utils-post';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://kyotowebstudio.com';
    const locales = ['ja', 'en'];
    
    // Static routes
    const routes = [
        '', // homepage
        '/about',
        '/services',
        '/contact',
        '/blog', // blog collection page
    ];
    
    const sitemapEntries: MetadataRoute.Sitemap = [];
    
    // Generate static route entries
    routes.forEach((route) => {
        locales.forEach((locale) => {
            const url = locale === 'ja' 
                ? `${baseUrl}${route}` 
                : `${baseUrl}/${locale}${route}`;
            
            sitemapEntries.push({
                url,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'weekly' : route === '/blog' ? 'daily' : 'monthly',
                priority: route === '' ? 1.0 : route === '/services' ? 0.9 : route === '/blog' ? 0.8 : 0.7,
                alternates: {
                    languages: {
                        ja: `${baseUrl}${route}`,
                        en: `${baseUrl}/en${route}`,
                    },
                },
            });
        });
    });
    
    // Fetch and generate blog article entries
    try {
        // Get all Japanese posts
        const jaPosts = await getAllPosts('ja', 1, 1000);
        const enPosts = await getAllPosts('en', 1, 1000);
        
        // Create a map to link translated posts
        const postMap = new Map();
        
        // Add Japanese posts to map
        jaPosts.posts.forEach(post => {
            postMap.set(post.slug, { ja: post });
        });
        
        // Add English posts to map
        enPosts.posts.forEach(post => {
            const existing = postMap.get(post.slug) || {};
            postMap.set(post.slug, { ...existing, en: post });
        });
        
        // Generate sitemap entries for each post
        postMap.forEach((translations, slug) => {
            const jaPost = translations.ja;
            const enPost = translations.en;
            
            // Determine the most recent update
            const lastModified = new Date(
                Math.max(
                    jaPost?._updatedAt ? new Date(jaPost._updatedAt).getTime() : 0,
                    enPost?._updatedAt ? new Date(enPost._updatedAt).getTime() : 0
                )
            );
            
            // If Japanese version exists
            if (jaPost) {
                sitemapEntries.push({
                    url: `${baseUrl}/blog/${slug}`,
                    lastModified,
                    changeFrequency: 'monthly',
                    priority: 0.7,
                    alternates: {
                        languages: {
                            ja: `${baseUrl}/blog/${slug}`,
                            ...(enPost && { en: `${baseUrl}/en/blog/${slug}` }),
                        },
                    },
                });
            }
            
            // If English version exists
            if (enPost) {
                sitemapEntries.push({
                    url: `${baseUrl}/en/blog/${slug}`,
                    lastModified,
                    changeFrequency: 'monthly',
                    priority: 0.7,
                    alternates: {
                        languages: {
                            ja: `${baseUrl}/blog/${slug}`,
                            en: `${baseUrl}/en/blog/${slug}`,
                        },
                    },
                });
            }
        });
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error);
    }
    
    return sitemapEntries;
}

// Revalidate sitemap every hour
export const revalidate = 3600;