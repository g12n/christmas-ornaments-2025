import {add, rotate} from "./vec2/index.js";
import {intersectLineCircle} from "./intersect/intersect-line-circle.js";

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

export const makeStripe =  (center=[0,0], thickness=20, length=100, degrees=0)=>{
  let radians = degrees * (Math.PI/180);

  let p1 = rotate([-length/2, -thickness/2], radians)
  let p2 = rotate([length/2, -thickness/2], radians)
  let p3 = rotate([length/2, thickness/2], radians)
  let p4 = rotate([-length/2, thickness/2], radians)

  p1 = add(p1, center)
  p2 = add(p2, center)
  p3 = add(p3, center)
  p4 = add(p4, center)
  return [[p1, p2],[p3,p4]]
}

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

export const drawStripeInCircle = (center=[0,0], r=80, thickness=20, degrees=0, position=center ) =>{
  
  let stripe =  makeStripe(position, thickness, r, degrees);
  let [[p1, p2],[p3, p4]] = stripe;
  
   [p1, p2] = intersectLineCircle(p1,p2, center, r);
   [p3, p4] = intersectLineCircle(p3,p4, center, r);
   
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
    console.log(path)
  return path;
}