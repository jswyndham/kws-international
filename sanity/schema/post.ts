// sanity/schemas/post.ts
import { defineField, defineType } from 'sanity';

const post = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		// Language selector - determines the language of this specific post
		defineField({
			name: 'language',
			title: 'Language',
			type: 'string',
			options: {
				list: [
					{ title: 'English', value: 'en' },
					{ title: '日本語 (Japanese)', value: 'ja' },
				],
				layout: 'radio',
			},
			validation: (Rule) => Rule.required(),
			initialValue: 'en',
		}),

		// Reference to the translated version of this post
		defineField({
			name: 'translation',
			title: 'Translated Version',
			type: 'reference',
			to: [{ type: 'post' }],
			description: 'Link to the translated version of this article',
			options: {
				filter: ({ document }) => {
					if (!document?.language)
						return { filter: '_type == "post"' };
					const targetLang = document.language === 'en' ? 'ja' : 'en';
					return {
						filter: 'language == $lang && _id != $id',
						params: {
							lang: targetLang,
							id: document._id,
						},
					};
				},
			},
		}),

		// Article title in the selected language
		defineField({
			name: 'name',
			title: 'Article Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			description:
				'The main title of the article in the selected language',
		}),

		// Unique slug for this language version
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
			description:
				'URL-friendly version of the title. Can be optimized for language-specific SEO.',
		}),

		// SEO Page Title
		defineField({
			name: 'pageName',
			title: 'Page Title (SEO)',
			type: 'string',
			validation: (Rule) =>
				Rule.max(60).warning(
					'Longer titles may be truncated in search results'
				),
			description:
				'Title that appears in browser tabs and search results (max 60 characters)',
		}),

		// Categories
		defineField({
			name: 'category',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			validation: (Rule) =>
				Rule.required()
					.min(1)
					.error('At least one category is required'),
		}),

		// Tags
		defineField({
			title: 'Tags',
			name: 'tag',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'tag' } }],
			description: 'Add relevant tags for better content organization',
		}),

		// Featured Image
		defineField({
			name: 'image',
			title: 'Featured Image',
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'caption',
					type: 'string',
					title: 'Caption',
					description:
						'Image caption in the same language as the article',
				},
				{
					name: 'alt',
					type: 'string',
					title: 'Alt Text',
					description: 'Alternative text for accessibility and SEO',
					validation: (Rule) =>
						Rule.required().error(
							'Alt text is required for accessibility'
						),
				},
			],
			validation: (Rule) => Rule.required(),
		}),

		// Main Content
		defineField({
			name: 'content',
			title: 'Article Body',
			type: 'array',
			of: [
				{
					title: 'Block',
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'H4', value: 'h4' },
						{ title: 'H5', value: 'h5' },
						{ title: 'H6', value: 'h6' },
						{ title: 'Quote', value: 'blockquote' },
						{ title: 'Tip', value: 'tip' },
						{ title: 'Highlight', value: 'highlight' },
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
							{ title: 'Strike', value: 'strike-through' },
							{ title: 'Code', value: 'code' },
						],
						annotations: [
							{
								name: 'internalLink',
								type: 'object',
								title: 'Internal link',
								fields: [
									{
										name: 'reference',
										type: 'reference',
										title: 'Reference',
										to: [{ type: 'post' }],
									},
								],
							},
							{
								name: 'link',
								type: 'object',
								title: 'External link',
								fields: [
									{ name: 'href', type: 'url', title: 'URL' },
									{
										title: 'Open in new tab',
										name: 'blank',
										type: 'boolean',
										description:
											'Read https://css-tricks.com/use-target_blank/',
									},
								],
							},
						],
					},
				},
				{
					title: 'Image',
					type: 'image',
					fields: [
						{
							type: 'text',
							name: 'alt',
							title: 'Alternative text',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'caption',
							type: 'string',
							title: 'Caption',
							description: 'Text displayed with the image',
							options: { isHighlighted: true },
						},
					],
				},
				{ type: 'table' },
				{ title: 'YouTube Embed', type: 'youTube' },
				{
					type: 'code',
					name: 'myCodeField',
					title: 'Code Block',
					options: {
						language: 'javascript',
						languageAlternatives: [
							{ title: 'Javascript', value: 'javascript' },
							{ title: 'TypeScript', value: 'typescript' },
							{ title: 'HTML', value: 'html' },
							{ title: 'CSS', value: 'css' },
							{ title: 'JSX', value: 'jsx' },
							{ title: 'TSX', value: 'tsx' },
							{ title: 'JSON', value: 'json' },
						],
						withFilename: true,
					},
				},
			],
			validation: (Rule) => Rule.required(),
		}),

		// FAQs
		defineField({
			name: 'faqs',
			title: 'FAQs',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'faqs' }] }],
			description:
				'Add frequently asked questions related to this article',
		}),

		// Article Summary (for previews and excerpts)
		defineField({
			name: 'summary',
			title: 'Article Summary',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required().max(200),
			description:
				'Brief summary for article previews (approx. 50-75 words)',
		}),

		// Short Summary (for cards and social shares)
		defineField({
			name: 'summaryShort',
			title: 'Short Summary',
			type: 'text',
			rows: 2,
			validation: (Rule) => Rule.required().max(100),
			description:
				'Very brief summary for cards and social media (approx. 25 words)',
		}),

		// Meta Description for SEO
		defineField({
			name: 'description',
			title: 'Meta Description (SEO)',
			type: 'string',
			validation: (Rule) =>
				Rule.required()
					.min(25)
					.warning('Too short for SEO')
					.max(155)
					.warning('Too long - Google will truncate'),
			description:
				'Description for search engine results (25-155 characters)',
		}),

		// Author(s)
		defineField({
			name: 'author',
			title: 'Author(s)',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'author' } }],
			validation: (Rule) => Rule.required().min(1),
		}),

		// Publishing Date
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
			initialValue: () => new Date().toISOString(),
		}),

		// Last Modified Date (for SEO)
		defineField({
			name: 'modifiedAt',
			title: 'Last Modified',
			type: 'datetime',
			description:
				'Update when making significant changes to the article',
		}),

		// View Counter
		defineField({
			name: 'views',
			title: 'Views',
			type: 'number',
			description: 'The number of times this post has been viewed',
			validation: (Rule) => Rule.min(0),
			initialValue: 0,
			readOnly: true,
		}),

		// SEO Keywords
		defineField({
			name: 'keywords',
			title: 'SEO Keywords',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags',
			},
			description:
				"Keywords for SEO optimization in the article's language",
		}),

		// Content Strategy Tracking
		defineField({
			name: 'contentStrategy',
			title: 'Content Strategy',
			type: 'string',
			options: {
				list: [
					{ title: 'Original Content', value: 'original' },
					{ title: 'Translation', value: 'translation' },
					{ title: 'Localized Adaptation', value: 'adaptation' },
				],
				layout: 'radio',
			},
			description:
				'Track whether this is original content, a direct translation, or an adapted version',
			initialValue: 'original',
		}),

		// Performance Notes (internal use)
		defineField({
			name: 'performanceNotes',
			title: 'Performance Notes',
			type: 'text',
			rows: 3,
			description:
				'Internal notes about SEO performance, rankings, or content strategy',
		}),
	],

	preview: {
		select: {
			title: 'name',
			author0: 'author.0.name',
			media: 'image',
			language: 'language',
			publishedAt: 'publishedAt',
			translation: 'translation.name',
			slug: 'slug.current',
		},
		prepare({
			title,
			author0,
			media,
			language,
			publishedAt,
			translation,
			slug,
		}) {
			const authorName = author0 || 'Unknown Author';
			const publishDate = publishedAt
				? new Date(publishedAt).toLocaleDateString()
				: 'Draft';
			const langEmoji = language === 'ja' ? '🇯🇵' : '🇬🇧';
			const hasTranslation = translation ? '🔗' : '';

			return {
				title: `${langEmoji} ${title || 'Untitled'}`,
				subtitle: `${authorName} • ${publishDate} • /${language}/blog/${slug} ${hasTranslation}`,
				media,
			};
		},
	},

	orderings: [
		{
			title: 'Publish Date, New',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
		{
			title: 'Publish Date, Old',
			name: 'publishedAtAsc',
			by: [{ field: 'publishedAt', direction: 'asc' }],
		},
		{
			title: 'Language',
			name: 'language',
			by: [
				{ field: 'language', direction: 'asc' },
				{ field: 'publishedAt', direction: 'desc' },
			],
		},
		{
			title: 'Views',
			name: 'views',
			by: [{ field: 'views', direction: 'desc' }],
		},
	],
});

export default post;
