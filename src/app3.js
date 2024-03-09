import { Runner, CanvasRenderer, Interaction } from './index.js';

import { DemoCircles } from "./demo/demo_circles.js";
import { DemoCar } from "./demo/demo_car.js";
import { DemoRagDoll } from "./demo/demo_ragdoll.js";
import { DemoSeeSaw } from "./demo/demo_seesaw.js";
import { DemoPyramid } from "./demo/demo_pyramid.js";
import { DemoCrank } from "./demo/demo_crank.js";
import { DemoRope } from "./demo/demo_rope.js";
import { DemoWeb } from "./demo/demo_web.js";
import { DemoBounce } from "./demo/demo_bounce.js";

document.addEventListener('DOMContentLoaded', () => {
    const renderer  = new CanvasRenderer(document.getElementById("canvas"));
    const runner    = new Runner(renderer, DemoCar);
    const pointer   = new Interaction(runner);


    // Prevent elastic scrolling on iOS
    document.body.addEventListener("touchmove", event => event.preventDefault());
    // Horizontal & vertical scrollbar will be hidden
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "hidden";
    document.body.scroll = "no"; // ie only

});
