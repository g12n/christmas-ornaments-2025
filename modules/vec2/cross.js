/**
 * Calculate the cross product of two 2D vectors.
 *
 * @param {vec2} a - The first vector.
 * @param {vec2} b - The second vector.
 * @returns {Number} The cross product of the input vectors.
 */
export const cross = (a, b) => {
	return a[0] * b[1] - a[1] * b[0];
};
