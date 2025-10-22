import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
	projectId: 'hewwg73z',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	token: process.env.SANITY_API_READ_TOKEN,
	apiVersion: '2024-01-01',
	useCdn: process.env.NODE_ENV === 'production',
});


