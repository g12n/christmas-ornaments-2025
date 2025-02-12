(() => {
  // modules/vec2/add.js
  var add = (a, b) => {
    let out = [];
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  };

  // modules/vec2/subtract.js
  var subtract = (a, b) => {
    let out = [];
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  };

  // modules/vec2/mul.js
  var multiply = (a, b) => {
    let out = [];
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  };

  // modules/vec2/rotate.js
  var rotate = (a, angle) => {
    let out = [];
    var cos = Math.cos(angle), sin = Math.sin(angle);
    var x = a[0], y = a[1];
    out[0] = x * cos - y * sin;
    out[1] = x * sin + y * cos;
    return out;
  };

  // modules/intersect/intersect-line-circle.js
  var intersectLineCircle = (p1 = [0, 0], p2 = [1, 1], pc = [0, 0], r = 100) => {
    let localP1 = subtract(p1, pc);
    let localP2 = subtract(p2, pc);
    let P2MinusP1 = subtract(localP2, localP1);
    let a = P2MinusP1[0] * P2MinusP1[0] + P2MinusP1[1] * P2MinusP1[1];
    let b = 2 * (P2MinusP1[0] * localP1[0] + P2MinusP1[1] * localP1[1]);
    let c = localP1[0] * localP1[0] + localP1[1] * localP1[1] - r * r;
    let delta = b * b - 4 * a * c;
    if (delta < 0) {
      return [];
    } else if (delta == 0) {
      let u = -b / (2 * a);
      let out = [];
      out[0] = add(p1, multiply(P2MinusP1, [u, u]));
      return out;
    } else if (delta > 0) {
      let SquareRootDelta = Math.sqrt(delta);
      let u1 = (-b + SquareRootDelta) / (2 * a);
      let u2 = (-b - SquareRootDelta) / (2 * a);
      let out = [];
      out[1] = add(p1, multiply([u1, u1], P2MinusP1));
      out[0] = add(p1, multiply([u2, u2], P2MinusP1));
      return out;
    }
  };

  // modules/make-stripe.js
  var makeStripe = (center2 = [0, 0], thickness2 = 20, length2 = 100, degrees = 0) => {
    let radians = degrees * (Math.PI / 180);
    let p1 = rotate([-length2 / 2, -thickness2 / 2], radians);
    let p2 = rotate([length2 / 2, -thickness2 / 2], radians);
    let p3 = rotate([length2 / 2, thickness2 / 2], radians);
    let p4 = rotate([-length2 / 2, thickness2 / 2], radians);
    p1 = add(p1, center2);
    p2 = add(p2, center2);
    p3 = add(p3, center2);
    p4 = add(p4, center2);
    return [[p1, p2], [p3, p4]];
  };

  // modules/draw-stripe-in-circle.js
  var drawStripeInCircle = (center2 = [0, 0], r = 80, thickness2 = 20, degrees = 0, position = center2) => {
    let stripe = makeStripe(position, thickness2, r, degrees);
    let [[p1, p2], [p3, p4]] = stripe;
    [p1, p2] = intersectLineCircle(p1, p2, center2, r);
    [p3, p4] = intersectLineCircle(p3, p4, center2, r);
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
    console.log(path);
    return path;
  };

  // modules/draw-hanger.js
  var drawHanger = (center2, r, width = 20, thickness2 = 10, angle = -90) => {
    let [[p1, p2], [p3, p4]] = makeStripe(center2, width, r, angle);
    let c1 = intersectLineCircle(p1, p2, center2, r + thickness2)[1];
    let c2 = intersectLineCircle(p3, p4, center2, r + thickness2)[0];
    let c3 = intersectLineCircle(p3, p4, center2, r)[0];
    let c4 = intersectLineCircle(p1, p2, center2, r)[1];
    let path = `M${c1} A ${r + thickness2} ${r + thickness2} 0 0 1 ${c2} L${c3} A ${r} ${r} 0 0 0 ${c4} `;
    return path;
  };

  // main.js
  var stripeGroup = document.getElementById("stripes");
  var radius = 70;
  var diameter = radius * 2;
  var center = [100, 100];
  var colors = [];
  for (i = 0; i <= 4; i++) {
    const lightness = Math.random() * 0.75 + 0.15;
    const hue = Math.random() * 45 + 220;
    colors.push(`oklch(${lightness} 0.4 ${hue})`);
  }
  var i;
  var thickness = diameter / (colors.length - 1);
  for (i = 0; i <= colors.length; i++) {
    const stripe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const [cx, cy] = center;
    const t = i / (colors.length - 1);
    const angle = -15 + 30 * Math.random();
    const position = [cx, cy - radius + radius * 2 * t];
    let path = drawStripeInCircle(center, radius, thickness, angle, position);
    stripe.setAttribute("d", path);
    stripe.setAttribute("fill", colors[i]);
    stripe.setAttribute("opacity", 0.8);
    stripeGroup.appendChild(stripe);
  }
  var i;
  var hanger = document.createElementNS("http://www.w3.org/2000/svg", "path");
  hanger.setAttribute("d", drawHanger(center, radius + 2, 30, 12, -95));
  hanger.setAttribute("fill", colors[0]);
  stripeGroup.appendChild(hanger);
})();
