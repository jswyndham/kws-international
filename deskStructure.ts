// sanity/deskStructure.ts
import { StructureBuilder } from 'sanity/structure';
import {
	Settings as CogIcon,
	FileText as DocumentTextIcon,
	Tag as TagIcon,
	Users as UsersIcon,
	Folder as FolderIcon,
	Home as HomeIcon,
	MessageCircle as ChatBubbleLeftRightIcon,
	HelpCircle as QuestionMarkCircleIcon,
	BarChart3 as ChartIcon,
	Clock as ClockIcon,
	Globe as GlobeIcon,
	TrendingUp as TrendingUpIcon,
	Eye as EyeIcon,
	Languages as LanguagesIcon,
	PenTool as PenToolIcon,
} from 'lucide-react';

export const deskStructure = (S: StructureBuilder) =>
	S.list()
		.title('Content Management')
		.items([
			// Site Configuration Section
			S.listItem()
				.title('Site Configuration')
				.icon(CogIcon)
				.child(
					S.list()
						.title('Site Settings')
						.items([
							S.listItem()
								.title('General Settings')
								.icon(CogIcon)
								.child(
									S.document()
										.schemaType('siteSettings')
										.documentId('siteSettings')
										.title('Site Settings')
								),
						])
				),

			S.divider(),

			// Blog/Articles Management Section
			S.listItem()
				.title('Articles / 記事')
				.icon(DocumentTextIcon)
				.child(
					S.list()
						.title('Article Management')
						.items([
							// Language Grouped Views
							S.listItem()
								.title('Articles by Language')
								.icon(LanguagesIcon)
								.child(
									S.list()
										.title('Select Language')
										.items([
											S.listItem()
												.title('English Articles')
												.icon(GlobeIcon)
												.child(
													S.documentList()
														.title(
															'English Articles'
														)
														.filter(
															'_type == "post" && language == "en"'
														)
														.defaultOrdering([
															{
																field: 'publishedAt',
																direction:
																	'desc',
															},
														])
												),
											S.listItem()
												.title(
													'Japanese Articles (日本語記事)'
												)
												.icon(GlobeIcon)
												.child(
													S.documentList()
														.title(
															'Japanese Articles'
														)
														.filter(
															'_type == "post" && language == "ja"'
														)
														.defaultOrdering([
															{
																field: 'publishedAt',
																direction:
																	'desc',
															},
														])
												),
										])
								),

							// All Posts
							S.listItem()
								.title('All Articles')
								.icon(DocumentTextIcon)
								.child(
									S.documentList()
										.title('All Articles')
										.filter('_type == "post"')
										.defaultOrdering([
											{
												field: 'publishedAt',
												direction: 'desc',
											},
										])
								),

							S.divider(),

							// Content Strategy Views
							S.listItem()
								.title('Content Strategy')
								.icon(PenToolIcon)
								.child(
									S.list()
										.title('By Content Type')
										.items([
											S.listItem()
												.title('Original Content')
												.child(
													S.documentList()
														.title(
															'Original Articles'
														)
														.filter(
															'_type == "post" && contentStrategy == "original"'
														)
												),
											S.listItem()
												.title('Translations')
												.child(
													S.documentList()
														.title(
															'Translated Articles'
														)
														.filter(
															'_type == "post" && contentStrategy == "translation"'
														)
												),
											S.listItem()
												.title('Localized Adaptations')
												.child(
													S.documentList()
														.title(
															'Adapted Articles'
														)
														.filter(
															'_type == "post" && contentStrategy == "adaptation"'
														)
												),
										])
								),

							// Articles with/without translations
							S.listItem()
								.title('Translation Status')
								.icon(LanguagesIcon)
								.child(
									S.list()
										.title('Translation Status')
										.items([
											S.listItem()
												.title(
													'Articles with Translations'
												)
												.child(
													S.documentList()
														.title(
															'Translated Articles'
														)
														.filter(
															'_type == "post" && defined(translation)'
														)
												),
											S.listItem()
												.title(
													'Articles without Translations'
												)
												.child(
													S.documentList()
														.title(
															'Untranslated Articles'
														)
														.filter(
															'_type == "post" && !defined(translation)'
														)
												),
										])
								),

							S.divider(),

							// Filtered Views
							S.listItem()
								.title('Articles by Category')
								.icon(FolderIcon)
								.child(
									S.documentTypeList('category')
										.title('Select a Category')
										.child((categoryId: string) =>
											S.documentList()
												.title('Articles')
												.filter(
													'_type == "post" && $categoryId in category[]._ref'
												)
												.params({ categoryId })
												.defaultOrdering([
													{
														field: 'publishedAt',
														direction: 'desc',
													},
												])
										)
								),

							S.listItem()
								.title('Articles by Tag')
								.icon(TagIcon)
								.child(
									S.documentTypeList('tag')
										.title('Select a Tag')
										.child((tagId: string) =>
											S.documentList()
												.title('Articles')
												.filter(
													'_type == "post" && $tagId in tag[]._ref'
												)
												.params({ tagId })
												.defaultOrdering([
													{
														field: 'publishedAt',
														direction: 'desc',
													},
												])
										)
								),

							S.listItem()
								.title('Articles by Author')
								.icon(UsersIcon)
								.child(
									S.documentTypeList('author')
										.title('Select an Author')
										.child((authorId: string) =>
											S.documentList()
												.title('Articles')
												.filter(
													'_type == "post" && $authorId in author[]._ref'
												)
												.params({ authorId })
												.defaultOrdering([
													{
														field: 'publishedAt',
														direction: 'desc',
													},
												])
										)
								),

							S.divider(),

							// Draft vs Published
							S.listItem()
								.title('Draft Articles')
								.icon(ClockIcon)
								.child(
									S.documentList()
										.title('Draft Articles')
										.filter(
											'_type == "post" && (_id in path("drafts.**"))'
										)
								),

							S.listItem()
								.title('Published Articles')
								.icon(DocumentTextIcon)
								.child(
									S.documentList()
										.title('Published Articles')
										.filter(
											'_type == "post" && !(_id in path("drafts.**"))'
										)
										.defaultOrdering([
											{
												field: 'publishedAt',
												direction: 'desc',
											},
										])
								),
						])
				),

			S.divider(),

			// Analytics & Performance
			S.listItem()
				.title('Analytics & Performance')
				.icon(ChartIcon)
				.child(
					S.list()
						.title('Article Performance')
						.items([
							S.listItem()
								.title('Popular Articles (All)')
								.icon(TrendingUpIcon)
								.child(
									S.documentList()
										.title('Articles by Views')
										.filter('_type == "post" && views > 0')
										.defaultOrdering([
											{
												field: 'views',
												direction: 'desc',
											},
										])
								),
							S.listItem()
								.title('Popular English Articles')
								.icon(EyeIcon)
								.child(
									S.documentList()
										.title('Popular English Articles')
										.filter(
											'_type == "post" && language == "en" && views > 0'
										)
										.defaultOrdering([
											{
												field: 'views',
												direction: 'desc',
											},
										])
								),
							S.listItem()
								.title('Popular Japanese Articles')
								.icon(EyeIcon)
								.child(
									S.documentList()
										.title('Popular Japanese Articles')
										.filter(
											'_type == "post" && language == "ja" && views > 0'
										)
										.defaultOrdering([
											{
												field: 'views',
												direction: 'desc',
											},
										])
								),
							S.listItem()
								.title('Recently Updated')
								.icon(ClockIcon)
								.child(
									S.documentList()
										.title('Recently Updated Articles')
										.filter(
											'_type == "post" && defined(modifiedAt)'
										)
										.defaultOrdering([
											{
												field: 'modifiedAt',
												direction: 'desc',
											},
										])
								),
						])
				),

			S.divider(),

			// Content Organization
			S.listItem()
				.title('Content Organization')
				.icon(FolderIcon)
				.child(
					S.list()
						.title('Organize Content')
						.items([
							S.listItem()
								.title('Categories')
								.icon(FolderIcon)
								.schemaType('category')
								.child(
									S.documentTypeList('category').title(
										'All Categories'
									)
								),

							S.listItem()
								.title('Tags')
								.icon(TagIcon)
								.schemaType('tag')
								.child(
									S.documentTypeList('tag').title('All Tags')
								),

							S.listItem()
								.title('Authors')
								.icon(UsersIcon)
								.schemaType('author')
								.child(
									S.documentTypeList('author').title(
										'All Authors'
									)
								),

							S.listItem()
								.title('FAQs')
								.icon(QuestionMarkCircleIcon)
								.schemaType('faqs')
								.child(
									S.documentTypeList('faqs').title('All FAQs')
								),
						])
				),

			S.divider(),

			// SEO & Performance Notes
			S.listItem()
				.title('SEO Management')
				.icon(TrendingUpIcon)
				.child(
					S.list()
						.title('SEO & Keywords')
						.items([
							S.listItem()
								.title('Articles with Keywords')
								.child(
									S.documentList()
										.title('Articles with Keywords')
										.filter(
											'_type == "post" && defined(keywords) && length(keywords) > 0'
										)
								),
							S.listItem()
								.title('Articles Missing Keywords')
								.child(
									S.documentList()
										.title('Articles without Keywords')
										.filter(
											'_type == "post" && (!defined(keywords) || length(keywords) == 0)'
										)
								),
							S.listItem()
								.title('Articles with Performance Notes')
								.child(
									S.documentList()
										.title('Performance Tracked Articles')
										.filter(
											'_type == "post" && defined(performanceNotes)'
										)
								),
						])
				),

			S.divider(),

			// Remaining document types (if any)
			...S.documentTypeListItems().filter(
				(listItem) =>
					![
						'siteSettings',
						'post',
						'category',
						'tag',
						'author',
						'faqs',
						'media.tag', // Exclude media tags if you have them
					].includes(listItem.getId() as string)
			),
		]);
