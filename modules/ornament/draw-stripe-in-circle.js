import { intersectLineCircle } from "../intersect/intersect-line-circle.js";
import { makeStripe } from "./make-stripe.js";

/**
 * Returns the Path of a stripe clipped by a circle
 *
 * @param {Array} center - center point of the circle
 * @param {Number} r - radius of the circle
 * @param {Number} thickness - thickness of the stripe
 * @param {Number} degrees - angle of the stripe
 * @param {Array} position - center point of the stripe
 * @returns {String} - clipped stripe as svg path
 */

export const drawStripeInCircle = (
	center = [0, 0],
	r = 80,
	thickness = 20,
	degrees = 0,
	position = center
) => {
	let stripe = makeStripe(position, thickness, r, degrees);
	let [[p1, p2], [p3, p4]] = stripe;

	[p1, p2] = intersectLineCircle(p1, p2, center, r);
	[p3, p4] = intersectLineCircle(p3, p4, center, r);

	let path = "";
	if (p1 && p2) {
		path += `M ${p1}L${p2}`;
		if (p3 && p4) {
			path += `A ${r} ${r} 0 0 1 ${p3}`;
			path += `L ${p4}`;
			path += `A ${r} ${r} 0 0 1 ${p1}`;
		} else {
			path += `A ${r} ${r} 0 0 1 ${p1}`;
		}
	} else if (p3 && p4) {
		path += `M ${p4}`;
		path += `L${p3}`;
		path += `A ${r} ${r} 0 0 0 ${p4}`;
	}
	console.log(path);
	return path;
};
