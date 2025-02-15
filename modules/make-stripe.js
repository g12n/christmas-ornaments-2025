import { rotate, add } from "./vec2/index.js";

/*
 * p1 ----- p2
 *      • center
 * p4 ----- p3
 * */

/**
 * make to paralel lines
 * @param {Array} center - center of the stripe
 * @param {Number} thickness - thickness of the stripe
 * @param {Number} length - thickness of the stripe
 * @param {Number} degrees - angle in degres* @
 *
 * @returns {Array} – an array of lines
 */

export const makeStripe = (
	center = [0, 0],
	thickness = 20,
	length = 100,
	degrees = 0
) => {
	let radians = degrees * (Math.PI / 180);

	let p1 = rotate([-length / 2, -thickness / 2], radians);
	let p2 = rotate([length / 2, -thickness / 2], radians);
	let p3 = rotate([length / 2, thickness / 2], radians);
	let p4 = rotate([-length / 2, thickness / 2], radians);

	p1 = add(p1, center);
	p2 = add(p2, center);
	p3 = add(p3, center);
	p4 = add(p4, center);
	return [
		[p1, p2],
		[p3, p4],
	];
};
