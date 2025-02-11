/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a the vector to calculate the length of
 * @returns {Number} the length of the vector
 */
export const length = (a) => {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
};