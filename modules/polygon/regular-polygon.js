
/**
 * Create a set of points around a circular path
 *
 * @param {vec2} center center point of the circle
 * @param {Number} radius radius of the circle
 * @param {Number} sides Number of Points generated
 * @param {Number} angleOffset Angle offset in radians for the first point
 * @returns {Array} Polygon 
 */

export const regularPolygonPoints = (center = [0, 0], radius = 100, sides = 6, angleOffset = 0) => {
    const angleStep = (2 * Math.PI) / sides;
    const startRadians =  angleOffset;
    const [cx, cy] = center;
    const points = [];
    for (let i = 0; i < sides; i++) {
        const angle = startRadians + i * angleStep;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        points.push([x, y]);
    }
    return points;
}