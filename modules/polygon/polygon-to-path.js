import { toFixed, subtract } from "../vec2/index.js"

/**
 * Convert a polygon (array of 2D points) into a relative SVG path string.
 *
 * Each vertex after the first is represented as a relative line (`l`) command
 * from the previous vertex. The first vertex becomes a `moveTo (M)` command.
 * Optionally, the path can be closed using a `z` command.
 *
 * @param {Array<vec2>} polygon - Array of 2D points defining the polygon. 
 * Each point is an array in the form `[x, y]`.
 * @param {boolean} [closed=true] - Whether to close the path with a `z` command.
 * @param {number} [precision=1] - Number of decimal places to keep when rounding coordinates.
 * @returns {string} SVG path string representing the polygon.
 *
 * @example
 * // Returns "M0,0 l10,10  -10,10 z"
 * polygonToSvgPath([[0,0],[10,10],[0,20]]);
 */
export const polygon2Path = (polygon = [[0, 0], [10, 10], [0, 20]], closed = true, precision = 1) => {
    let path = "";
    polygon.map((point, i) => {
        if (i === 0) {
            const p = toFixed(point, precision);
            path += `M${p} l`;
        } else {
            const prev = polygon[i - 1];
            const offset = subtract(point, prev);
            const p = toFixed(offset, precision);
            path += `${p} `;
        }
    });
    if (closed) {
        path += "z";
    }
    return path;
};