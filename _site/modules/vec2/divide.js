/**
 * Divide a vector by a scalar.
 *
 * @param {vec2} a - The vector to divide.
 * @param {number} factor - The scalar to divide the vector by.
 * @returns {Vector} The divided vector.
 */
export const divide = (a, factor) => {
  return [a[0] / factor, a[1] / factor];
};

