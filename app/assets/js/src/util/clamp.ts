/**
 * Clamp a value between minimum and maximum values.
 */
export function clamp(min: number, value: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}
