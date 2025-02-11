// First, import the required dependencies
import vec2 from "gl-vec2";
import {clipLineToCircle} from 'canvas-sketch-util/geometry';
import random from 'canvas-sketch-util/random';
import {intersetCircleCircle} from './modules/indersect-circle-circle.js';

class OrnamentElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['seed', 'cx', 'cy', 'r', 'lines'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    // Get attributes with defaults
    const seed = parseInt(this.getAttribute('seed')) || 10;
    const cx = parseInt(this.getAttribute('cx')) || 0;
    const cy = parseInt(this.getAttribute('cy')) || 0;
    const r = parseInt(this.getAttribute('r')) || 20;
    const lines = parseInt(this.getAttribute('lines')) || random.rangeFloor(3, 9);
    
    random.setSeed(seed);
    
    const colors = ["#8AACA6", "#861F16", "#FED340", "#ED6A66"];
    const thickness = (r * 2.5) / lines;
    const center = [cx, cy];

    // Calculate paths
    const hangerPath = `M${cx},0V${cy - r - 8}`;
    const hangerR = r / 6;
    const pathOffset = hangerR / 4;
    const hangerCenter = [cx, cy - r - pathOffset];
    const intersection = intersetCircleCircle(center, r + pathOffset, hangerCenter, hangerR);
    const [pi1, pi2] = intersection;
    
    let connectorPath = `M${pi1}`;
    connectorPath += `A ${hangerR} ${hangerR} 0 0 0 ${pi2[0]} ${pi2[1]}`;
    connectorPath += `A ${r} ${r} 0 0 1 ${pi1[0]} ${pi1[1]}`;

    const paths = [];
    const fills = [];

    for (let i = 0; i < lines; i++) {
      const angle = random.range(Math.PI / (-lines * 1.5), Math.PI / (lines * 1.5));
      const offset = vec2.lerp([], [0, -r], [0, r], i / (lines - 1));
      vec2.add(offset, offset, [0, random.range(-thickness / 2, thickness / 2)]);

      const lineCenter = vec2.add([], center, offset);
      const barThickness = random.range(thickness / 1.4, thickness / 3);
      const normal = vec2.rotate([], [0, barThickness], angle);

      const p1 = vec2.rotate([], [r, 10], angle);
      const p2 = vec2.negate([], p1);
      vec2.add(p1, p1, lineCenter);
      vec2.add(p2, p2, lineCenter);

      const a = vec2.add([], p1, normal);
      const b = vec2.add([], p2, normal);
      const c = vec2.subtract([], p1, normal);
      const d = vec2.subtract([], p2, normal);

      const line = [];
      const line2 = [];
      clipLineToCircle(a, b, center, r, line);
      clipLineToCircle(c, d, center, r, line2);

      let path = "";
      if (line.length > 1) {
        path += `M ${line[0]}L${line[1]}`;
        if (line2.length > 1) {
          path += `A ${r} ${r} 0 0 0 ${line2[1][0]} ${line2[1][1]}`;
          path += `L ${line2[1]}L${line2[0]}`;
          path += `A ${r} ${r} 0 0 0 ${line[0][0]} ${line[0][1]}`;
        } else {
          path += `A ${r} ${r} 0 0 0 ${line[0][0]} ${line[0][1]}`;
        }
      } else if (line2.length > 1) {
        path += `M ${line2[0]}L${line2[1]}`;
        path += `A ${r} ${r} 0 0 1 ${line2[0][0]} ${line2[0][1]}`;
      }

      if (path !== "") {
        paths.push(path);
        fills.push(random.pick(colors));
      }
    }

    // Create SVG content
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `-${r * 2} -${r * 2} ${r * 4} ${r * 4}`);
    
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Add hanger path
    const hangerPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hangerPathElement.setAttribute("d", hangerPath);
    hangerPathElement.setAttribute("stroke", fills[0]);
    hangerPathElement.setAttribute("stroke-dasharray", "0.01 10");
    hangerPathElement.setAttribute("stroke-linecap", "round");
    hangerPathElement.setAttribute("stroke-width", "4");
    g.appendChild(hangerPathElement);

    // Add connector path
    const connectorPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    connectorPathElement.setAttribute("d", connectorPath);
    connectorPathElement.setAttribute("fill", fills[0]);
    g.appendChild(connectorPathElement);

    // Add ornament paths
    paths.forEach((d, i) => {
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("d", d);
      pathElement.setAttribute("fill", fills[i]);
      pathElement.setAttribute("opacity", "0.8");
      g.appendChild(pathElement);
    });

    svg.appendChild(g);
    
    // Clear and update shadow DOM
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(svg);
  }
}

// Register the custom element
customElements.define('ornament-element', OrnamentElement);