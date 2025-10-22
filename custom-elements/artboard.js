class Artboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.layerPaths = new Map();
  }

  connectedCallback() {
    this.addEventListener("layerchange", e => this.updateLayer(e.detail.source));
    this.render();
  }

  get width() {
    return this.getAttribute("width") || 100;
  }

  get height() {
    return this.getAttribute("height") || 100;
  }

  render() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", this.width);
    svg.setAttribute("height", this.height);

    const bg = document.createElementNS(svgNS, "rect");
    bg.setAttribute("width", this.width);
    bg.setAttribute("height", this.height);
    bg.setAttribute("fill", "deeppink");
    svg.appendChild(bg);

    this.layerPaths.clear();
    this.querySelectorAll("gfx-layer, gfx-circle, gfx-polygon " ).forEach((layer, index) => {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", layer.fillGeometry);
      path.setAttribute("fill", "black");
      const layerId = layer.id || `layer-${index}`;
      path.dataset.layerId = layerId;
      svg.appendChild(path);
      this.layerPaths.set(layer, path);
    });

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(svg);
  }

  updateLayer(layer) {
    const path = this.layerPaths.get(layer);
    if (path) {
      // Update existing path’s geometry
      path.setAttribute("d", layer.fillGeometry);
    } else {
      // Layer might be new: render it fresh
      this.render();
    }
  }
}

customElements.define("gfx-artboard", Artboard);