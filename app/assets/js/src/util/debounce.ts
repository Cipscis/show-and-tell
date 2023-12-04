/**
 * Debounce a function so it won't be called again until a specified
 * duration has passed since the last time it was attempted.
 */
export function debounce<
	T extends (...args: any[]) => unknown
>(fn: T, delay: number): (this: OmitThisParameter<ThisParameterType<T>>, ...args: Parameters<T>) => void {
	let timeout: number | null = null;

	return function (this: OmitThisParameter<ThisParameterType<T>>, ...args: Parameters<T>) {
		if (timeout === null) {
			fn.apply(this, args);
		} else {
			window.clearTimeout(timeout);
		}

		timeout = window.setTimeout(() => timeout = null, delay);
	};
}
