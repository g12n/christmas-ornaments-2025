/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
export const squaredDistance = (a, b) => {
	var x = b[0] - a[0],
		y = b[1] - a[1];
	return x * x + y * y;
};
