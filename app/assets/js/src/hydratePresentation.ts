import { clamp } from 'util/clamp';
import { debounce } from 'util/debounce';

/**
 * Adds JavaScript interaction to a presentation element, if found.
 */
export function hydratePresentation(): void {
	const presentation = document.querySelector('.js-presentation');
	if (!presentation) {
		return;
	}

	const slides = Array.from(presentation.querySelectorAll('.js-slide'));
	if (slides.length > 0) {
		slides[0].ariaCurrent = String(true);
	}
	presentation.classList.add('hydrated');

	const getCurrentSlideIndex = (): number => {
		return slides.findIndex((slide) => slide.ariaCurrent === String(true));
	};

	/**
	 * Navigate to a new slide, either be specified index or based on modifying
	 * the current slide index. When transitioning between slides, a view transition
	 * is triggered if the browser supports them.
	 *
	 * Returns a Promise that resolves when the slide transition is complete.
	 */
	const goToSlide = (
		getNewSlideIndex: ((currentSlideIndex: number) => number) | number
	): Promise<void> => {
		const currentSlideIndex = getCurrentSlideIndex();

		// Don't allow navigating before the first slide or after the last slide
		const newSlideIndex = clamp(
			0,
			typeof getNewSlideIndex === 'function'
				? getNewSlideIndex(currentSlideIndex)
				: getNewSlideIndex,
			slides.length - 1
		);

		// Don't do anything if we're not going to a new slide
		if (
			newSlideIndex === -1 ||
			newSlideIndex === currentSlideIndex
		) {
			return Promise.resolve();
		}

		const changeSlide = () => {
			document.documentElement.dataset.currentSlide = String(currentSlideIndex);
			document.documentElement.dataset.nextSlide = String(newSlideIndex);
			slides[currentSlideIndex].ariaCurrent = null;
			slides[newSlideIndex].ariaCurrent = String(true);
		};

		const cleanup = () => {
			delete document.documentElement.dataset.currentSlide;
			delete document.documentElement.dataset.nextSlide;
		};

		// If we can't do a view transition, just change immediately
		if (!document.startViewTransition) {
			changeSlide();
			cleanup();
			return Promise.resolve();
		}

		// Change slide with a view transition if possible
		const viewTransition = document.startViewTransition(() => {
			changeSlide();
		});
		cleanup();

		return viewTransition.finished;
	};

	// Keyboard controls to change slides
	document.addEventListener('keydown', (e) => {
		if (
			e.key === 'ArrowRight' ||
			e.key === 'ArrowDown' ||
			e.key === 'Enter' ||
			e.key === ' '
		) {
			goToSlide((i) => i + 1);
		} else if (
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowUp' ||
			e.key === 'Backspace'
		) {
			goToSlide((i) => i - 1);
		} else if (e.key === 'Home') {
			goToSlide(0);
		} else if (e.key === 'End') {
			goToSlide(slides.length - 1);
		}
	});

	// Mouse controls to change slides
	document.addEventListener('click', () => {
		goToSlide((i) => i + 1);
	});

	// Scroll wheel controls to change slides
	document.addEventListener('wheel', debounce((e: WheelEvent) => {
		if (e.deltaY > 0) {
			goToSlide((i) => i + 1);
		} else if (e.deltaY < 0) {
			goToSlide((i) => i - 1);
		}
	}, 300), { passive: true });
}
