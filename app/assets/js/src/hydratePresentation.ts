import hljs from 'highlight.js';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';

import { clamp } from 'util/clamp';
import { debounce } from 'util/debounce';

// highlight.js treats HTML and XML as aliases
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);

/**
 * Automatically give slides an ID, to use with fragment links.
 */
function addSlideIndex(slide: HTMLElement, i: number): void {
	const slideNumber = i + 1;
	slide.id = `slide-${slideNumber}`;
}

/**
 * Apply syntax highlighting to any `<code>` elements with a `data-language` attribute.
 */
function applySyntaxHighlighting(slide: HTMLElement): void {
	const codeEls = slide.querySelectorAll<HTMLElement>('code[data-language]');
	for (const codeEl of codeEls) {
		const language = codeEl.dataset.language;
		if (typeof language === 'undefined') {
			continue;
		}

		// If parts of code need to move around with view transitions, highlight them independently
		const parts = codeEl.querySelectorAll<HTMLElement>('[style*="view-transition-name"]');
		if (parts.length === 0) {
			const highlightResult = hljs.highlight(codeEl.textContent ?? '', { language });
			codeEl.innerHTML = highlightResult.value;
		} else {
			for (const part of parts) {
				const highlightResult = hljs.highlight(part.textContent ?? '', { language });
				part.innerHTML = highlightResult.value;
			}
		}
	}
}

/**
 * Adds JavaScript interaction to a presentation element, if found.
 */
export function hydratePresentation(): void {
	const presentation = document.querySelector<HTMLElement>('.js-presentation');
	if (!presentation) {
		return;
	}

	const slides = Array.from(presentation.querySelectorAll<HTMLElement>('.js-slide'));
	slides.forEach((slide, i) => {
		addSlideIndex(slide, i);
		applySyntaxHighlighting(slide);
	});

	const progress = document.createElement('progress');

	// Set up initial slide and slide count
	if (slides.length > 0) {
		const targetSelector = new URL(document.location.href).hash;
		const initialSlideIndex = (() => {
			try {
				if (targetSelector) {
					const targetIndex = slides.findIndex((slide) => slide.matches(targetSelector));
					if (targetIndex !== -1) {
						return targetIndex;
					}
				}
			} catch (e) {
				// The selector may have been invalid, just keep going
			}

			const newUrl = new URL(document.location.href);
			newUrl.hash = '';
			history.replaceState(undefined, '', newUrl);

			return 0;
		})();
		slides[initialSlideIndex].ariaCurrent = String(true);

		presentation.dataset.slideNumber = String(initialSlideIndex + 1);
		progress.value = initialSlideIndex / (slides.length - 1);
	}

	presentation.append(progress);
	presentation.classList.add('hydrated');

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
		const currentSlideIndex = slides.findIndex((slide) => slide.ariaCurrent === String(true));

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

		const beforeChange = () => {
			slides[currentSlideIndex].classList.add('transitioning-out');
		};

		const changeSlide = () => {
			document.documentElement.dataset.currentSlide = String(currentSlideIndex);
			document.documentElement.dataset.nextSlide = String(newSlideIndex);

			slides[currentSlideIndex].ariaCurrent = null;
			slides[newSlideIndex].ariaCurrent = String(true);
			slides[newSlideIndex].classList.add('transitioning-in');

			progress.value = newSlideIndex / (slides.length - 1);
			presentation.dataset.slideNumber = String(newSlideIndex + 1);

			const newUrl = new URL(document.location.href);
			newUrl.hash = `slide-${newSlideIndex + 1}`;
			history.replaceState(undefined, '', newUrl);
		};

		const afterChange = () => {
			delete document.documentElement.dataset.currentSlide;
			delete document.documentElement.dataset.nextSlide;

			presentation.querySelector('.slide.transitioning-in')?.classList.remove('transitioning-in');
			presentation.querySelector('.slide.transitioning-out')?.classList.remove('transitioning-out');
		};

		// If we can't do a view transition, or we're not
		// moving to the next slide, just change immediately
		if (
			!document.startViewTransition ||
			(newSlideIndex - currentSlideIndex) !== 1
		) {
			beforeChange();
			changeSlide();
			afterChange();
			return Promise.resolve();
		}

		// Change slide with a view transition
		beforeChange();
		const viewTransition = document.startViewTransition(() => {
			changeSlide();
		});
		viewTransition.finished.then(afterChange);

		return viewTransition.finished;
	};

	// Keyboard controls to change slides
	document.addEventListener('keydown', (e) => {
		if (e.repeat) {
			// Don't fire on repeated events from held keys
			return;
		}

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
		// If there's any text selection, ignore the click
		const selection = getSelection();
		if (
			selection &&
			(
				selection.rangeCount > 1 ||
				!selection.getRangeAt(0).collapsed
			)
		) {
			return;
		}

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
