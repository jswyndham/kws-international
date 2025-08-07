'use client';

import React, { useState, useEffect, useRef } from 'react';

interface YouTubeEmbedProps {
	url?: string; // Made optional to fix TypeScript error
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [hasError, setHasError] = useState(false);
	const videoRef = useRef<HTMLDivElement | null>(null);

	// Handle missing URL
	if (!url) {
		return (
			<div className="my-8 p-8 bg-white/5 rounded-xl text-center text-white/60">
				<p>Video unavailable</p>
			</div>
		);
	}

	// Extract video ID
	let videoId: string | null = null;
	try {
		if (url.includes('youtu.be')) {
			videoId = url.split('/').pop()?.split('?')[0] || null;
		} else if (url.includes('youtube.com')) {
			videoId = new URL(url).searchParams.get('v');
		} else {
			// Handle case where just the video ID is provided
			videoId = url;
		}
	} catch (error) {
		console.error('Error parsing YouTube URL:', error);
	}

	if (!videoId) {
		return (
			<div className="my-8 p-8 bg-white/5 rounded-xl text-center text-white/60">
				<p>Invalid YouTube URL</p>
			</div>
		);
	}

	const embedUrl = `https://www.youtube.com/embed/${videoId}`;

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.disconnect(); // Stop observing once it's visible
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (videoRef.current) {
			observer.observe(videoRef.current);
		}

		return () => observer.disconnect();
	}, []);

	if (hasError) {
		return (
			<div className="my-8 p-8 bg-white/5 rounded-xl text-center text-white/60">
				<p>Failed to load video</p>
			</div>
		);
	}

	return (
		<div ref={videoRef} className="my-8">
			<div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
				{isVisible ? (
					<iframe
						className="absolute top-0 left-0 w-full h-full"
						src={embedUrl}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
						onError={() => setHasError(true)}
					/>
				) : (
					<div className="absolute top-0 left-0 w-full h-full bg-white/5 flex items-center justify-center">
						<div className="animate-pulse">
							<svg
								className="w-16 h-16 text-white/30"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
							</svg>
							<p className="text-white/50 mt-2">
								Loading video...
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default YouTubeEmbed;
