import {
	motion,
	HTMLMotionProps,
	AnimationDefinition,
	TargetAndTransition,
} from 'framer-motion';
import { useEffect, useState, forwardRef } from 'react';

type OptimizedMotionDivProps = Omit<HTMLMotionProps<'div'>, 'ref'> & {
	skipOptimization?: boolean;
	preserveStackingContext?: boolean;
	forceNoTransform?: boolean; // New prop for elements that absolutely cannot have transforms
};

/**
 * OptimizedMotionDiv - A wrapper for motion.div that handles iOS/Safari performance issues
 * while preserving proper stacking contexts for overlays and modals.
 */
export const OptimizedMotionDiv = forwardRef<
	HTMLDivElement,
	OptimizedMotionDivProps
>(function OptimizedMotionDiv(
	{
		children,
		className = '',
		style,
		initial,
		animate,
		exit,
		whileHover,
		whileTap,
		skipOptimization = false,
		preserveStackingContext = false,
		forceNoTransform = false,
		onAnimationStart,
		onAnimationComplete,
		...props
	},
	ref
) {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isAppleDevice, setIsAppleDevice] = useState(false);

	useEffect(() => {
		// Detect Apple devices
		const checkApple = () => {
			const isApple =
				/iPad|iPhone|iPod/.test(navigator.userAgent) ||
				(navigator.userAgent.includes('Mac') &&
					'ontouchend' in document) ||
				(navigator.maxTouchPoints > 1 &&
					navigator.vendor === 'Apple Computer, Inc.');
			setIsAppleDevice(isApple);
		};
		checkApple();
	}, []);

	// If optimization is skipped, return plain motion.div
	if (skipOptimization) {
		return (
			<motion.div
				ref={ref}
				{...props}
				initial={initial}
				animate={animate}
				exit={exit}
				whileHover={whileHover}
				whileTap={whileTap}
				style={style}
				className={className}
				onAnimationStart={onAnimationStart}
				onAnimationComplete={onAnimationComplete}
			>
				{children}
			</motion.div>
		);
	}

	// Handle animation lifecycle with proper typing
	const handleAnimationStart = (definition: AnimationDefinition) => {
		setIsAnimating(true);
		onAnimationStart?.(definition);
	};

	const handleAnimationComplete = (definition: AnimationDefinition) => {
		setIsAnimating(false);
		onAnimationComplete?.(definition);
	};

	// Check if this element or its children might have overlays
	const mightHaveOverlays = () => {
		// Check className for common overlay indicators
		const overlayIndicators = [
			'gallery',
			'lightbox',
			'modal',
			'dialog',
			'overlay',
			'popup',
			'dropdown',
			'tooltip',
			'z-[4-9]', // High z-index
			'z-[1-9][0-9]', // Very high z-index
		];

		return overlayIndicators.some((indicator) =>
			className.toLowerCase().includes(indicator)
		);
	};

	// Build optimized styles based on context
	const getOptimizedStyle = () => {
		const baseStyle = { ...style };

		// Check if this is a fixed/absolute positioned element or might have overlays
		const isOverlay =
			className.includes('fixed') ||
			className.includes('absolute') ||
			style?.position === 'fixed' ||
			style?.position === 'absolute';

		const hasOverlays = mightHaveOverlays();

		// Don't add hardware acceleration to overlays/modals or elements that might spawn them
		if (
			preserveStackingContext ||
			isOverlay ||
			forceNoTransform ||
			hasOverlays
		) {
			// Remove any transform that might have been added
			if (
				baseStyle.transform === 'translate3d(0, 0, 0)' ||
				baseStyle.transform === 'translateZ(0)'
			) {
				delete baseStyle.transform;
			}
			return baseStyle;
		}

		// Only add will-change during animations to avoid memory issues
		if (isAnimating && isAppleDevice) {
			// Use will-change for properties that will actually change
			const willChangeProps = [];
			if (
				animate &&
				typeof animate === 'object' &&
				!Array.isArray(animate)
			) {
				if ('x' in animate || 'y' in animate)
					willChangeProps.push('transform');
				if ('opacity' in animate) willChangeProps.push('opacity');
				if ('scale' in animate) willChangeProps.push('transform');
			}
			if (willChangeProps.length > 0) {
				baseStyle.willChange = willChangeProps.join(', ');
			}
		}

		// For Apple devices, add minimal GPU hints only when absolutely necessary
		if (isAppleDevice && isAnimating && !hasOverlays) {
			// Check if transform is a string before using includes
			const transformString =
				typeof style?.transform === 'string' ? style.transform : '';

			// Only add perspective for 3D transforms
			if (transformString && transformString.includes('3d')) {
				baseStyle.perspective = 1000;
			}
			// Ensure smooth rendering on iOS
			baseStyle.WebkitFontSmoothing = 'antialiased';
			// Only add backface visibility if doing 3D transforms
			if (
				transformString &&
				(transformString.includes('rotate') ||
					transformString.includes('3d'))
			) {
				baseStyle.backfaceVisibility = 'hidden';
			}
		}

		return baseStyle;
	};

	// Fix blur animations for Apple devices - with proper return type
	const getOptimizedInitial = (): typeof initial => {
		if (!isAppleDevice || !initial || typeof initial !== 'object') {
			return initial;
		}

		// Type guard to check if this is an animation object (not an array or boolean)
		if (Array.isArray(initial) || typeof initial === 'boolean') {
			return initial;
		}

		// Create a properly typed copy that matches TargetAndTransition
		const initialCopy = { ...initial } as TargetAndTransition;

		// Remove blur filter on Apple devices as it causes performance issues
		if ('filter' in initialCopy && typeof initialCopy.filter === 'string') {
			if (initialCopy.filter.includes('blur')) {
				delete initialCopy.filter;
				// Use opacity instead for a similar effect if not already set
				if (!('opacity' in initialCopy)) {
					initialCopy.opacity = 0;
				}
			}
		}

		return initialCopy;
	};

	// Build optimized className
	const getOptimizedClassName = () => {
		const classes = [className];

		// Only add optimization classes for non-overlay elements
		const isOverlay =
			className.includes('fixed') ||
			className.includes('absolute') ||
			preserveStackingContext ||
			forceNoTransform ||
			mightHaveOverlays();

		if (!isOverlay && isAppleDevice && isAnimating) {
			classes.push('ios-optimized-active');
		} else if (!isOverlay && isAppleDevice) {
			classes.push('ios-optimized');
		}

		return classes.filter(Boolean).join(' ');
	};

	return (
		<motion.div
			ref={ref}
			{...props}
			initial={getOptimizedInitial()}
			animate={animate}
			exit={exit}
			whileHover={whileHover}
			whileTap={whileTap}
			style={getOptimizedStyle()}
			className={getOptimizedClassName()}
			onAnimationStart={handleAnimationStart}
			onAnimationComplete={handleAnimationComplete}
		>
			{children}
		</motion.div>
	);
});
