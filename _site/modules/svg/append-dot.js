const appendDot = (element, center=[0,0]) => {
    // Create circle with correct SVG namespace
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const [x,y] = center;
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", "2");
        dot.setAttribute("fill", "#ff6600");
        element.appendChild(dot);
        return dot;
}