/**
 * Math.round the components of a vec2
 *
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
export const toFixed = (a, digits = 2) => {
	let out = [];
	out[0] = Number(a[0]).toFixed(digits);
	out[1] = Number(a[1]).toFixed(digits);
	return out;
};
