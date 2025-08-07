// src/app/components/blog/Pagination.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	baseUrl: string;
	queryParams?: {
		category?: string;
		tag?: string;
		search?: string;
	};
}

export default function Pagination({
	currentPage,
	totalPages,
	baseUrl,
	queryParams = {},
}: PaginationProps) {
	const getPageUrl = (page: number) => {
		const params = new URLSearchParams();
		if (page > 1) params.set('page', page.toString());
		if (queryParams.category) params.set('category', queryParams.category);
		if (queryParams.tag) params.set('tag', queryParams.tag);
		if (queryParams.search) params.set('search', queryParams.search);

		const queryString = params.toString();
		return queryString ? `${baseUrl}?${queryString}` : baseUrl;
	};

	const renderPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start < maxVisible - 1) {
			start = Math.max(1, end - maxVisible + 1);
		}

		if (start > 1) {
			pages.push(
				<Link
					key={1}
					href={getPageUrl(1)}
					className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
				>
					1
				</Link>
			);
			if (start > 2) {
				pages.push(
					<span key="ellipsis-start" className="text-white/50">
						...
					</span>
				);
			}
		}

		for (let i = start; i <= end; i++) {
			pages.push(
				<Link
					key={i}
					href={getPageUrl(i)}
					className={`px-4 py-2 rounded-lg font-medium transition-all ${
						i === currentPage
							? 'bg-gradient-to-r from-[#FF851B] to-[#FF851B]/80 text-white shadow-lg'
							: 'bg-white/10 text-white hover:bg-white/20'
					}`}
				>
					{i}
				</Link>
			);
		}

		if (end < totalPages) {
			if (end < totalPages - 1) {
				pages.push(
					<span key="ellipsis-end" className="text-white/50">
						...
					</span>
				);
			}
			pages.push(
				<Link
					key={totalPages}
					href={getPageUrl(totalPages)}
					className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
				>
					{totalPages}
				</Link>
			);
		}

		return pages;
	};

	return (
		<nav className="flex justify-center">
			<div className="flex items-center gap-2">
				{/* Previous Button */}
				<Link
					href={getPageUrl(Math.max(1, currentPage - 1))}
					className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
						currentPage === 1
							? 'bg-white/5 text-white/30 cursor-not-allowed pointer-events-none'
							: 'bg-white/10 text-white hover:bg-white/20'
					}`}
				>
					<ChevronLeft className="w-4 h-4" />
					<span className="hidden sm:inline">Previous</span>
				</Link>

				{/* Page Numbers */}
				{renderPageNumbers()}

				{/* Next Button */}
				<Link
					href={getPageUrl(Math.min(totalPages, currentPage + 1))}
					className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
						currentPage === totalPages
							? 'bg-white/5 text-white/30 cursor-not-allowed pointer-events-none'
							: 'bg-white/10 text-white hover:bg-white/20'
					}`}
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRight className="w-4 h-4" />
				</Link>
			</div>
		</nav>
	);
}
