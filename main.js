import {drawStripeInCircle}  from "./modules/draw-stripe-in-circle.js"
import { appendDot } from "./modules/svg/append-dot.js";
import { rotate, add } from "./modules/vec2/index.js";


const stripeGroup = document.getElementById("stripes");

const radius=80;

const diameter = radius *2;
const center = [100,100];

let colors = [];

for(var i=0; i<= 3; i++){
  colors.push("#abc")
  colors.push("#456")
}





const thickness = diameter / (colors.length - 1);

for (var i=0; i<=colors.length; i++){
    const stripe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const [cx, cy] = center;
    const t = i/(colors.length-1);
    const angle=-10 + 20 * Math.random();
    const position = [cx, (cy - radius) + radius * 2  * t  ]
    let path = drawStripeInCircle(center, radius, thickness, angle, position)
    stripe.setAttribute("d", path);
    stripe.setAttribute("fill", colors[i]);
    stripe.setAttribute("opacity", .8);
    stripeGroup.appendChild(stripe)

}