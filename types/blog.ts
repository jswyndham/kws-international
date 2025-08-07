// types/blog.ts
import { PortableTextBlock } from '@portabletext/types';

export interface Author {
	_id: string;
	name: string;
	slug: string;
	image?: {
		asset: {
			_id: string;
			url: string;
		};
	};
	bio?: string;
	role?: string;
}

export interface Category {
	_id: string;
	title: string;
	slug: string;
	description?: string;
}

export interface Tag {
	_id: string;
	title: string;
	slug: string;
}

export interface Image {
	_type: 'image';
	asset: {
		_id: string;
		url: string;
		metadata?: {
			dimensions: {
				width: number;
				height: number;
			};
			lqip?: string;
			blurhash?: string;
		};
	};
	alt?: string;
	caption?: string;
}

export interface FAQ {
	_id: string;
	question: string;
	answer: string;
}

export interface Post {
	_id: string;
	_createdAt: string;
	_updatedAt?: string;
	name: string;
	slug: string;
	pageName?: string;
	description: string;
	image: Image;
	content: PortableTextBlock[];
	author: Author[];
	category: Category[];
	tag?: Tag[];
	faqs?: FAQ[];
	summary: PortableTextBlock[];
	summaryShort: PortableTextBlock[];
	views?: number;
}

// Portable Text Custom Block Types based on your schema
export interface YouTubeBlock {
	_type: 'youTube';
	url: string;
	title?: string;
	caption?: string;
}

export interface TableBlock {
	_type: 'table';
	rows: Array<{
		cells: string[];
	}>;
}

export interface AccessBlock {
	_type: 'access';
	location?: {
		latitude: number;
		longitude: number;
		placeName: string;
	};
	admissionPrice?: string;
	openingHours?: string;
	closedDays?: string;
	officialWebsite?: string;
	transportation?: string;
}

export interface CodeBlock {
	_type: 'code';
	language: 'javascript' | 'html' | 'css';
	code: string;
	filename?: string;
}

export interface PageProps {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
	commentsOrder?: string;
}
