// lib/urlFor.ts
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { readClient } from '../sanity/config/client-config';

const builder = imageUrlBuilder(readClient);

type UrlOptions = {
	width?: number;
	height?: number;
	quality?: number;
};

export function urlFor(
	source: SanityImageSource | string | null | undefined,
	options: UrlOptions = {}
): string {
	if (!source) return '/placeholder-image.jpg'; // Use a local fallback image

	// Handle direct URL strings
	if (typeof source === 'string' && source.startsWith('http')) {
		return source;
	}

	try {
		// Start with the image
		let imageBuilder = builder.image(source);

		// IMPORTANT: Ignore any existing crop/hotspot data to avoid rect parameters
		imageBuilder = imageBuilder.ignoreImageParams();

		if (options.width) {
			imageBuilder = imageBuilder.width(options.width);
		}

		if (options.height) {
			imageBuilder = imageBuilder.height(options.height);
		}

		if (options.quality) {
			imageBuilder = imageBuilder.quality(options.quality);
		} else {
			imageBuilder = imageBuilder.quality(100);
		}

		return imageBuilder.auto('format').url();
	} catch (error) {
		console.error('Error generating image URL:', error);
		return '/placeholder-image.jpg';
	}
}
