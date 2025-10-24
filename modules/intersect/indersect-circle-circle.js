/**
 * Calculates the intersection points of two circles.
 *
 * Given two circles defined by their centers and radii, this function returns
 * the intersection points where the circles meet. The result can contain:
 * - **two points** if the circles intersect in two places,
 * - **one point** if the circles are tangent (touching at exactly one point),
 * - **an empty array** or `null` if the circles do not intersect or one lies entirely within the other.
 *
 * @see http://www.xarg.org/2016/07/calculate-the-intersection-points-of-two-circles/
 *
 * @param {vec2} p1 - Center point of the first circle `[x, y]`.
 * @param {number} r1 - Radius of the first circle.
 * @param {vec2} p2 - Center point of the second circle `[x, y]`.
 * @param {number} r2 - Radius of the second circle.
 * @returns {?Array<vec2>} - An array of intersection points (`[x, y]`), which may contain
 *   zero, one, or two points. Returns `null` if there is no intersection.
 *
 * @example
 * // Two intersections
 * intersetCircleCircle([0, 0], 10, [10, 0], 10);
 * // → [[5, 8.66], [5, -8.66]]
 *
 * @example
 * // Tangent circles (one intersection)
 * intersetCircleCircle([0, 0], 10, [20, 0], 10);
 * // → [[10, 0]]
 *
 * @example
 * // No intersection
 * intersetCircleCircle([0, 0], 5, [20, 0], 5);
 * // → null
 */

export const intersetCircleCircle = (p1, r1, p2, r2) => {
	let [x1, y1] = p1;
	let [x2, y2] = p2;

	let d = Math.hypot(x2 - x1, y2 - y1);

	let intersections = [];

	if (d <= r1 + r2 && d >= Math.abs(r2 - r1)) {
		let ex = (x2 - x1) / d;
		let ey = (y2 - y1) / d;
		let x = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
		let y = Math.sqrt(r1 * r1 - x * x);

		intersections[0] = [x1 + x * ex - y * ey, y1 + x * ey + y * ex];

		intersections[1] = [x1 + x * ex + y * ey, y1 + x * ey - y * ex];
	} else {
		// No Intersection, far outside or one circle within the other
		intersections = null;
	}

	return intersections;
};
