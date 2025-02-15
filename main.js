import { drawStripeInCircle } from "./modules/draw-stripe-in-circle.js";
import { drawHanger } from "./modules/draw-hanger.js";
const stripeGroup = document.getElementById("stripes");

const radius = 50;

const diameter = radius * 2;
const center = [100, 100];

new EventSource("/esbuild").addEventListener("change", () => location.reload());

let colors = [];

for (var i = 0; i <= 5; i++) {
	const lightness = Math.random() * 0.75 + 0.15;
	const hue = Math.random() * 45 + 20;

	colors.push(`oklch(${lightness} 0.4 ${hue})`);
}

const thickness = diameter / (colors.length - 1);

for (var i = 0; i <= colors.length; i++) {
	const stripe = document.createElementNS("http://www.w3.org/2000/svg", "path");
	const [cx, cy] = center;
	const t = i / (colors.length - 1);
	const angle = -15 + 30 * Math.random();
	const position = [cx, cy - radius + radius * 2 * t];
	let path = drawStripeInCircle(center, radius, thickness, angle, position);
	stripe.setAttribute("d", path);
	stripe.setAttribute("fill", colors[i]);
	stripe.setAttribute("opacity", 0.9);
	stripeGroup.appendChild(stripe);
}

const hanger = document.createElementNS("http://www.w3.org/2000/svg", "path");
hanger.setAttribute("d", drawHanger(center, radius + 2, 32, 12, -60));
hanger.setAttribute("fill", colors[0]);
stripeGroup.appendChild(hanger);
