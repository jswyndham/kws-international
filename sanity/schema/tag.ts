// sanity/schemas/tag.ts
import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'tag',
	title: 'Tag',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'object',
			fields: [
				{
					name: 'en',
					title: 'English',
					type: 'string',
					validation: (Rule) => Rule.required(),
				},
				{
					name: 'ja',
					title: 'Japanese (日本語)',
					type: 'string',
					validation: (Rule) => Rule.required(),
				},
			],
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title.en',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			titleEn: 'title.en',
			titleJa: 'title.ja',
		},
		prepare({ titleEn, titleJa }) {
			return {
				title: titleEn || titleJa || 'Untitled Tag',
				subtitle: titleJa ? `🇯🇵 ${titleJa}` : '',
			};
		},
	},
});
