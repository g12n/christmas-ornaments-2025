

    /**
     * Returns the Path of a stripe clipped by a circle
     *
     * @see http://www.xarg.org/2016/07/calculate-the-intersection-points-of-two-circles/
     * @param {Array} center - center point of the circle
     * @param {Number} r - radius of the circle
     * @param {Number} thickness - thickness of the stripe
     * @param {Number} degrees - angle of the stripe
     * @param {Array} position - center point of the stripe
     * @returns {String}
     */

    import{add, rotate, subtract} from "./vec2/index.js";
    import {intersectLineCircle} from "./intersect-line-circle.js";

    export const drawStripeInCircle = (center=[0,0], r=80, thickness=20, degrees=0, position=center ) =>{
        let radians = degrees * (Math.PI/180);
        const slope = rotate([10,0],radians)
        const normal = rotate([0,thickness/2], radians)

        const p1 = add(position,normal);
        const p1slope = add(p1,slope)
        const p2 = subtract(position,normal)
        const p2slope = add(p2,slope)
        
        const line = intersectLineCircle(p1,p1slope, center, r);
        const line2 = intersectLineCircle(p2,p2slope, center, r);
  
        let path = "";
      if (line.length > 1) {
        path += `M ${line[0]}L${line[1]}`;
        if (line2.length > 1) {
          path += `A ${r} ${r} 0 0 1 ${line2[1][0]} ${line2[1][1]}`;
          path += `L ${line2[1]}L${line2[0]}`;
          path += `A ${r} ${r} 0 0 1 ${line[0][0]} ${line[0][1]}`;
        } else {
          path += `A ${r} ${r} 0 0 1 ${line[0][0]} ${line[0][1]}`;
        }
      } else if (line2.length > 1) {
        path += `M ${line2[0]}L${line2[1]}`;
        path += `A ${r} ${r} 0 0 0 ${line2[0][0]} ${line2[0][1]}`;
      }
    return path;
    }