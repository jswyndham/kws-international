// sanity/schemas/category.ts
import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'category',
	title: 'Category',
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

		defineField({
			name: 'description',
			title: 'Description',
			type: 'object',
			fields: [
				{
					name: 'en',
					title: 'English',
					type: 'text',
					rows: 3,
				},
				{
					name: 'ja',
					title: 'Japanese',
					type: 'text',
					rows: 3,
				},
			],
		}),

		defineField({
			name: 'color',
			title: 'Color',
			type: 'string',
			description: 'Hex color for category badge (e.g., #4F46E5)',
			validation: (Rule) =>
				Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
					name: 'hex color',
					invert: false,
				}).error('Must be a valid hex color (e.g., #4F46E5)'),
		}),
	],
});
