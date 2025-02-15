/**
 * Rotates a vec2 by an angle
 *
 * @param {vec2} a the vector to rotate
 * @param {Number} angle the angle of rotation (in radians)
 * @returns {vec2} out
 */

export const rotate = (a, angle) => {
	let out = [];
	var cos = Math.cos(angle),
		sin = Math.sin(angle);
	var x = a[0],
		y = a[1];

	out[0] = x * cos - y * sin;
	out[1] = x * sin + y * cos;

	return out;
};
