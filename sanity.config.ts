import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { deskStructure } from './deskStructure';
import { table } from '@sanity/table';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './sanity/schema'; // Fixed path - added 's'

const GOOGLE_MAPS_API_KEY =
	process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY ?? 'YOUR_DEFAULT_KEY';

const config = defineConfig({
	name: 'default',
	title: 'Kyoto Web Studio',
	projectId: 'hewwg73z',
	dataset: 'production',
	basePath: '/studio',
	plugins: [
		structureTool({
			structure: deskStructure,
		}),
		visionTool(),
		table(),
		codeInput(),
	],
	schema: { types: schemaTypes }, // Simplified - no need to spread
});

export default config;
