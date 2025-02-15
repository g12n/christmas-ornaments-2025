/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
export let multiply = (a, b) => {
	let out = [];
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	return out;
};
