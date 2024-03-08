import { Runner, CanvasRenderer } from './index.js';

import { DemoCircles } from "./demo/demo_circles.js";

document.addEventListener('DOMContentLoaded', () => {
    const renderer = new CanvasRenderer(document.getElementById("canvas"));
    const runner = new Runner(renderer, DemoCircles);
});
