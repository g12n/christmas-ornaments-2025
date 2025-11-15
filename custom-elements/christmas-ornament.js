import { drawStripeInCircle } from "../modules/ornament/draw-stripe-in-circle.js";
import { drawHanger } from "../modules/ornament/draw-hanger.js";

/**
 * Christmas Ornament Custom Element
 * Generates a decorative SVG ornament with random colored stripes
 * @tagname christmas-ornament
 */
class ChristmasOrnament extends HTMLElement {
  static observedAttributes = ["radius", "color-count", "seed"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.childNodes.length > 0) {
      this.render();
    }
  }

  get radius() {
    return Number(this.getAttribute("radius")) || 50;
  }

  get colorCount() {
    return Number(this.getAttribute("color-count")) || 6;
  }

  get seed() {
    return Number(this.getAttribute("seed")) || Math.random();
  }

  // Simple seeded random number generator
  seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  generateColors() {
    const colors = [];
    let currentSeed = this.seed;

    for (let i = 0; i < this.colorCount; i++) {
      const lightness = this.seededRandom(currentSeed++) * 0.75 + 0.15;
      const hue = this.seededRandom(currentSeed++) * 45 + 20;
      colors.push(`oklch(${lightness} 0.4 ${hue})`);
    }

    return colors;
  }

  render() {
    const svgNS = "http://www.w3.org/2000/svg";
    const radius = this.radius;
    const diameter = radius * 2;
    const center = [radius + 10, radius + 40]; // Add padding for hanger
    const colors = this.generateColors();
    const thickness = diameter / (colors.length - 1);

    // Create SVG
    const svg = document.createElementNS(svgNS, "svg");
    const viewBoxWidth = diameter + 20;
    const viewBoxHeight = diameter + 80; // Extra space for hanger
    svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    svg.setAttribute("width", viewBoxWidth);
    svg.setAttribute("height", viewBoxHeight);

    // Create stripes group
    const stripeGroup = document.createElementNS(svgNS, "g");

    // Generate stripes
    let currentSeed = this.seed + 1000; // Offset seed for stripe angles
    for (let i = 0; i < colors.length; i++) {
      const stripe = document.createElementNS(svgNS, "path");
      const [cx, cy] = center;
      const t = i / (colors.length - 1);
      const angle = -15 + 30 * this.seededRandom(currentSeed++);
      const position = [cx, cy - radius + radius * 2 * t];
      const path = drawStripeInCircle(center, radius, thickness, angle, position);

      stripe.setAttribute("d", path);
      stripe.setAttribute("fill", colors[i]);
      stripe.setAttribute("opacity", "0.9");
      stripeGroup.appendChild(stripe);
    }

    // Add hanger
    const hanger = document.createElementNS(svgNS, "path");
    hanger.setAttribute("d", drawHanger(center, radius + 2, 32, 12, -60));
    hanger.setAttribute("fill", colors[0]);
    stripeGroup.appendChild(hanger);

    svg.appendChild(stripeGroup);

    // Clear and append
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(svg);
  }
}

customElements.define("christmas-ornament", ChristmasOrnament);
