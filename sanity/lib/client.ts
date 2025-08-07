import { createClient } from 'next-sanity';

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2024-01-01',
	token: process.env.SANITY_API_READ_TOKEN,
	useCdn: true, // Set to false if you're using ISR or on-demand revalidation
});
