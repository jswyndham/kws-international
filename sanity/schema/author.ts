// sanity/schemas/author.ts
import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'author',
	title: 'Author',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'biography',
			title: 'Biography',
			type: 'object',
			fields: [
				{
					name: 'en',
					title: 'English Biography',
					type: 'array',
					of: [
						{
							title: 'Block',
							type: 'block',
							styles: [
								{ title: 'Normal', value: 'normal' },
								{ title: 'H3', value: 'h3' },
								{ title: 'H4', value: 'h4' },
								{ title: 'Quote', value: 'blockquote' },
							],
							lists: [
								{ title: 'Numbered', value: 'number' },
								{ title: 'Bullet', value: 'bullet' },
							],
							marks: {
								decorators: [
									{ title: 'Strong', value: 'strong' },
									{ title: 'Emphasis', value: 'em' },
									{ title: 'Underline', value: 'underline' },
								],
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'External link',
										fields: [
											{
												name: 'href',
												type: 'url',
												title: 'URL',
											},
											{
												title: 'Open in new tab',
												name: 'blank',
												type: 'boolean',
											},
										],
									},
								],
							},
						},
					],
				},
				{
					name: 'ja',
					title: 'Japanese Biography (日本語の経歴)',
					type: 'array',
					of: [
						{
							title: 'Block',
							type: 'block',
							styles: [
								{ title: 'Normal', value: 'normal' },
								{ title: 'H3', value: 'h3' },
								{ title: 'H4', value: 'h4' },
								{ title: 'Quote', value: 'blockquote' },
							],
							lists: [
								{ title: 'Numbered', value: 'number' },
								{ title: 'Bullet', value: 'bullet' },
							],
							marks: {
								decorators: [
									{ title: 'Strong', value: 'strong' },
									{ title: 'Emphasis', value: 'em' },
									{ title: 'Underline', value: 'underline' },
								],
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'External link',
										fields: [
											{
												name: 'href',
												type: 'url',
												title: 'URL',
											},
											{
												title: 'Open in new tab',
												name: 'blank',
												type: 'boolean',
											},
										],
									},
								],
							},
						},
					],
				},
			],
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: 'social',
			title: 'Social Links',
			type: 'object',
			fields: [
				{
					name: 'twitter',
					title: 'Twitter/X URL',
					type: 'url',
				},
				{
					name: 'linkedin',
					title: 'LinkedIn URL',
					type: 'url',
				},
				{
					name: 'github',
					title: 'GitHub URL',
					type: 'url',
				},
				{
					name: 'website',
					title: 'Personal Website',
					type: 'url',
				},
			],
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
		},
	},
});
