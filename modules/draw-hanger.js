import { intersectLineCircle } from "./intersect/intersect-line-circle.js";
import { makeStripe } from "./make-stripe.js";
import { intersetCircleCircle } from "./intersect/indersect-circle-circle.js";

import { rotate } from "./vec2/rotate.js";
import { add } from "./vec2/add.js";

/**
 * draws a stylized hanger for christmas ornaments
 *
 * @param {Array} center - center point of the circle
 * @param {Number} r - radius of the circle
 * @param {Number} width - thickness the hanger
 * @param {Number} thickness - thickness the hanger
 * @returns {String} - hanger ad svg path
 */

export const drawHanger = (
	center,
	r,
	width = 20,
	thickness = 10,
	degrees = -20
) => {
	let radians = degrees * (Math.PI / 180);

	let r2 = r + thickness;
	let r3 = r2 + 3;

	let hangerRadius = width * 0.3;
	var hangerInnerRadius = hangerRadius - 3;

	let [[p1, p2], [p3, p4]] = makeStripe(center, width, r, degrees);

	let c1 = intersectLineCircle(p1, p2, center, r2)[1];
	let c2 = intersectLineCircle(p3, p4, center, r2)[0];
	let c3 = intersectLineCircle(p3, p4, center, r)[0];
	let c4 = intersectLineCircle(p1, p2, center, r)[1];

	let path = `M${c1} A ${r + thickness} ${
		r + thickness
	} 0 0 1 ${c2} L${c3} A ${r} ${r} 0 0 0 ${c4} `;

	let center2 = add(rotate([r3 + hangerRadius - 5, 0], radians), center);

	let [hangerEdgePoint, hangerEdgePoint2] = intersetCircleCircle(
		center,
		r3,
		center2,
		hangerRadius
	);
	let [hangerEdgePoint3, hangerEdgePoint4] = intersetCircleCircle(
		center,
		r3,
		center2,
		hangerInnerRadius
	);

	path += `M ${hangerEdgePoint}`;
	path += `A ${hangerRadius} ${hangerRadius} 0 1 0 ${hangerEdgePoint2}`;
	path += `A ${r3} ${r3} 0 0 1 ${hangerEdgePoint4}`;
	path += `A ${hangerInnerRadius} ${hangerInnerRadius} 0 1 1 ${hangerEdgePoint3}`;
	path += `A ${r3} ${r3} 0 0 1 ${hangerEdgePoint}`;
	return path;
};
