import { Runner, CanvasRenderer, Interaction } from './index.js';

import { DemoCircles } from "./demo/demo_circles.js";

document.addEventListener('DOMContentLoaded', () => {
    const renderer  = new CanvasRenderer(document.getElementById("canvas"));
    const runner    = new Runner(renderer, DemoCircles);
    const pointer   = new Interaction(runner);

/*
    // Prevent elastic scrolling on iOS
    document.body.addEventListener("touchmove", event => event.preventDefault());
    // Horizontal & vertical scrollbar will be hidden
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "hidden";
    document.body.scroll = "no"; // ie only
*/
});
