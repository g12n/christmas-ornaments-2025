/**
 * Check if two vectors are equal.
 *
 * @param {vec2} a - The first vector to compare.
 * @param {vec2} b - The second vector to compare.
 * @param {number} [tolerance=0] - The tolerance value to consider the vectors equal.
 * @returns {boolean} True if the vectors are equal, false otherwise.
 */
export const equals = (a, b, tolerance = 0) => {
	const diffX = Math.abs(a[0] - b[0]);
	const diffY = Math.abs(a[1] - b[1]);
	return diffX <= tolerance && diffY <= tolerance;
};
