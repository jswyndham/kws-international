// sanity/schemas/index.ts

import author from './author';
import blockContent from './blockContent';
import category from './category';
import { faqs } from './faq';
import post from './post';
import siteSettings from './siteSettings';
import tableChart from './tableChart';
import tag from './tag';
import { youTube } from './youTube';

export const schemaTypes = [
	// Documents
	post,
	category,
	tag,
	author,
	siteSettings,
	faqs,
	// Objects
	tableChart,
	youTube,
	blockContent,
];
