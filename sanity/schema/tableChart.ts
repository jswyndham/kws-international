import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'tableChart',
	title: 'Table',
	type: 'object',
	fields: [
		defineField({
			name: 'columns',
			title: 'Columns',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'rows',
			title: 'Rows',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'cells',
							title: 'Cells',
							type: 'array',
							of: [{ type: 'string' }],
						},
					],
				},
			],
		}),
	],
});
