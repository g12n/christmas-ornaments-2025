/**
 * Math.round the components of a vec2
 *
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
export const  round = (a) => {
  let out = []
  out[0] = Math.round(a[0])
  out[1] = Math.round(a[1])
  return out
}