
import { intersectLineCircle } from "./intersect/intersect-line-circle.js"
import { makeStripe } from "./make-stripe.js"
/**
 * draws a stylized hanger for christmas ornaments
 *
 * @param {Array} center - center point of the circle
 * @param {Number} r - radius of the circle
 * @param {Number} width - thickness the hanger
 * @param {Number} thickness - thickness the hanger
 * @returns {String} - hanger ad svg path
 */

export const drawHanger = (center, r, width=20, thickness=10, angle=-90)=>{
    
    let [[p1,p2],[p3,p4]] = makeStripe(center, width, r, angle);

    let c1 = intersectLineCircle(p1, p2, center, r+thickness)[1]
    let c2 = intersectLineCircle(p3, p4, center, r +thickness)[0]
    let c3 = intersectLineCircle(p3, p4, center, r)[0]
    let c4 = intersectLineCircle(p1, p2, center, r)[1]

    let path = `M${c1} A ${r + thickness} ${r + thickness} 0 0 1 ${c2} L${c3} A ${r} ${r} 0 0 0 ${c4} `;

return path;

}