import {regularPolygonPoints} from "../modules/polygon/index.js"
import {polygon2Path} from "../modules/polygon/index.js"

/**
 * @fires layerchange - Layer Contents have changed
 * @summary Basic Layer of the GFX System
 * @tagname gfx-layer
 */
class Layer extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		console.log(`connected ${this.className}`);
	}

   	attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.notifyChange();
        }
    }

	notifyChange() {
		this.dispatchEvent(
			new CustomEvent("layerchange", {
				bubbles: true,
				composed: true,
				detail: { source: this },
			})
		);
	}

	get fillGeometry() {
		return `M0 0`;
	}
}
/*
@attr {number} cx - x position of the circle
@attr {number} cy - y position of the circle
@attr {number} r - radius position of the circle
*/
class Circle extends Layer {
	static observedAttributes = ["cx", "cy", "r"];
	constructor() {
		super();
	}

	get cx() {
		return Number(this.getAttribute("cx")) || 0;
	}
	get cy() {
		return Number(this.getAttribute("cy")) || 0;
	}
	get r() {
		return Number(this.getAttribute("r")) || 0;
	}

	get fillGeometry() {
		console.log("Draw circle");
		return `M${this.cx - this.r} ${this.cy}a ${this.r} ${this.r} 0 0 0 ${
			this.r * 2
		} 0 ${this.r} ${this.r} 0 0 0 ${this.r * -2} 0z `;
	}
}

/*
@attr {number} cx - x position of the circle
@attr {number} cy - y position of the circle
@attr {number} r - radius position of the circle
@attr {number} sides - 
*/
class Polygon extends Circle {
	constructor() {
		super();
	}

    get sides() {
        const sides = Number(this.getAttribute("sides")) || 3;
		return sides > 2 ? sides : 3
	}

    get fillGeometry() {
		console.log("Draw Polygon");
        console.log(this.r);
        let points = regularPolygonPoints([this.cx, this.cy],this.r,this.sides);
        const path =   polygon2Path(points);
        console.log(points, path);
        return polygon2Path(points);
	}
}

customElements.define("gfx-layer", Layer);
customElements.define("gfx-circle", Circle);
customElements.define("gfx-polygon", Polygon);