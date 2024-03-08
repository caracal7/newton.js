import * as Physics from './index.js';

import { collision } from "./utils/collision.js";
import { Space } from "./shapes/space.js";
import { Body } from "./Body.js";
import { Shape } from "./shapes/shape.js";
import { stats } from "./utils/stats.js";
import { MouseJoint } from "./joints/joint_mouse.js";
import { Bounds, pixel2meter, meter2pixel, vec2 } from './utils/math.js';

const HELPER_JOINT_ANCHOR_RADIUS = pixel2meter(2.5);
const PIXEL_UNIT = pixel2meter(1);

const randomColor = ["#BEB", "#48B", "#CAA", "#8D5", "#6BE", "#98D", "#E78", "#7BC", "#E9E", "#BCD", "#EB6", "#EE7"]; // Random colors for drawing bodies

function bodyColor(body) {
    if (!body.isDynamic()) return "#777";
    if (!body.isAwake()) return "#999";
    return randomColor[(body.id) % randomColor.length];
}

function Runner(renderer, app, settings = {}) {
    console.log('Runner',this)

    this.renderer = renderer;
    this.app = app;

    this.settings = Object.assign({
        gravity: new vec2(0, -10),
    	frameRateHz: 60,
    	velocityIterations: 8,
    	positionIterations: 4,
    	warmStarting: true,
    	allowSleep: true,
    	enableDirtyBounds: true,
    	showJoints: true,
        backgroundColor: "rgb(95, 105, 118)",
    	jointAnchorColor: "#004000",
    }, settings);

    // canvas rendering stuffs
    this.camera = {
        origin: new vec2(0, 0),
        scale: 1,
        minScale: 0.5,
        maxScale: 8.0,
        bounds: new Bounds,
        scroll: new vec2(0, 0)
    };

    this.dirtyBounds = new Bounds; // dirty bounds in world space

    this.onResize = () => {
        this.renderer.resize();
        // Set dirtyBounds to full screen
        this.dirtyBounds.set(this.canvasToWorld(new vec2(0, this.renderer.height)), this.canvasToWorld(new vec2(this.renderer.width, 0)));
        this.static_outdated = true;
        if(this.pause) this.drawFrame(0);
    }

    window.addEventListener('resize', this.onResize);
    this.onResize();


    collision.init();
    this.space = new Space();
/*
            this.mouseBody = new Body(Body.KINETIC);
            this.mouseBody.resetMassData();
            this.space.addBody(this.mouseBody);
*/
    this.resetScene();

    const update = () => {
        this.runFrame();
        if(!this.pause) window.requestAnimationFrame(update);
    }
    window.requestAnimationFrame(update);
}

Runner.prototype.destroy = function() {
    this.pause = true;
    this.space.clear();
    window.removeEventListener('resize', this.onResize);
}

Runner.prototype.resetScene = function() {
    this.space.clear();
    this.space.gravity.copy(this.settings.gravity);
    this.app.init(this.space);
    this.initFrame();
}

Runner.prototype.initFrame = function() {
    this.time = {
        fps: 0,
        fps_frameCount: 0,
        fps_time: 0,
        frameCount: 0,
        lastTime: Date.now(),
        timeDelta: 0
    }
    // Set dirtyBounds to full screen
    this.dirtyBounds.set(this.canvasToWorld(new vec2(0, this.renderer.height)), this.canvasToWorld(new vec2(this.renderer.width, 0)));
    this.static_outdated = true;
}

Runner.prototype.runFrame = function() {
    var time = Date.now();
    var frameTime = (time - this.time.lastTime) / 1000;
    frameTime = Math.floor(frameTime * 60 + 0.5) / 60;
    this.time.lastTime = time;

/*
    if (!mouseDown) {
        var p = this.canvasToWorld(mousePosition);
        var body = this.space.findBodyByPoint(p);
        domCanvas.style.cursor = body ? "pointer" : "default";
    }
*/
    if (!this.pause || this.step) {
        var h = 1 / this.settings.frameRateHz;

        this.time.timeDelta += frameTime;

        if (this.step) {
            this.step = false;
            this.time.timeDelta = h;
        }

        stats.timeStep = 0;
        stats.stepCount = 0;

        for (var maxSteps = 4; maxSteps > 0 && this.time.timeDelta >= h; maxSteps--) {
            var t0 = Date.now();
            this.space.step(h, this.settings.velocityIterations, this.settings.positionIterations, this.settings.warmStarting, this.settings.allowSleep);
            stats.timeStep += Date.now() - t0;
            stats.stepCount++;
            this.time.timeDelta -= h;
        }

        if (this.time.timeDelta > h) this.time.timeDelta = 0;

        this.app.runFrame();
    }

    if (stats.stepCount > 0) this.render(frameTime);

    this.time.frameCount++;

    // Calculate frame per second
    this.time.fps_frameCount++;
    this.time.fps_time += frameTime;

    if (this.time.fps_time >= 1.0) {
        this.time.fps = this.time.fps_frameCount / this.time.fps_time;
        this.time.fps_time -= 1.0;
        this.time.fps_frameCount = 0;
    }
}

Runner.prototype.render = function(frameTime) {
    var t0 = Date.now();
    this.drawFrame(frameTime);
    stats.timeDrawFrame = Date.now() - t0;
}

Runner.prototype.drawFrame = function(frameTime) {
	// camera.bounds for culling
	this.camera.bounds.set(this.canvasToWorld(new vec2(0, this.renderer.height)), this.canvasToWorld(new vec2(this.renderer.width, 0)));

	// Check the visibility of shapes for all bodies
	for (var i = 0; i < this.space.bodyArr.length; i++) {
		var body = this.space.bodyArr[i];
		if (!body) continue;

		body.visible = false;

		for (var j = 0; j < body.shapeArr.length; j++) {
			var shape = body.shapeArr[j];
			var bounds = new Bounds(shape.bounds.mins, shape.bounds.maxs);
			if (this.camera.bounds.intersectsBounds(bounds)) {
				shape.visible = true;
				body.visible = true;
			}
			else {
				shape.visible = false;
			}
		}
	}

	// Update whole background canvas if we needed
	if (this.static_outdated) {
		this.static_outdated = false;
        this.renderer.clearBackground(this.camera, this.settings.backgroundColor)

		// Draw static bodies
		for (var i = 0; i < this.space.bodyArr.length; i++) {
			var body = this.space.bodyArr[i];
			if (body && body.isStatic()) {

                var body_color = bodyColor(body);
                for (var k = 0; k < body.shapeArr.length; k++) {
        	        var shape = body.shapeArr[k];
        	        if (!shape.visible) continue;
                    this.renderer.drawShape(shape, true,  PIXEL_UNIT, "#000", body_color);
        	    }
			}
		}
	}

	// Transform dirtyBounds world to screen
	if (this.settings.enableDirtyBounds) {
		if (!this.dirtyBounds.isEmpty()) {
			var mins = this.worldToCanvas(this.dirtyBounds.mins);
			var maxs = this.worldToCanvas(this.dirtyBounds.maxs);
			var x = Math.max(Math.floor(mins.x), 0);
			var y = Math.max(Math.floor(maxs.y), 0);
			var w = Math.min(Math.ceil(maxs.x), this.renderer.width) - x;
			var h = Math.min(Math.ceil(mins.y), this.renderer.height) - y;

			if (w > 0 && h > 0)  this.renderer.copyBackground(x, y, w, h, x, y, w, h);
		}
	}
	else this.renderer.copyBackground(0, 0);

    this.dirtyBounds.clear();
	this.renderer.beginDynamic(this.camera);

	// Draw bodies except for static bodies
	for (var i = 0; i < this.space.bodyArr.length; i++) {
		var body = this.space.bodyArr[i];
		if (body && body.visible) {
			if (!body.isStatic()) {
                var body_color = bodyColor(body);
                for (var k = 0; k < body.shapeArr.length; k++) {
        	        var shape = body.shapeArr[k];
        	        if (!shape.visible) continue;
                    this.renderer.drawShape(shape, false, PIXEL_UNIT, "#000", body_color);
    	            var expand = PIXEL_UNIT * 3;
    	            var bounds = Bounds.expand(shape.bounds, expand, expand);
    	            this.dirtyBounds.addBounds(bounds);
        	    }
			}
		}
	}

	// Draw joints
	if (this.settings.showJoints) {
		for (var i = 0; i < this.space.jointArr.length; i++) {
			if (this.space.jointArr[i]) {
				drawHelperJointAnchors(this.space.jointArr[i]);
			}
		}
	}
    this.renderer.endDynamic();
}

Runner.prototype.worldToCanvas = function(p) {
    return new vec2(
        this.renderer.width * 0.5 + (p.x * (this.camera.scale * meter2pixel(1)) - this.camera.origin.x),
        this.renderer.height      - (p.y * (this.camera.scale * meter2pixel(1)) - this.camera.origin.y));
}

Runner.prototype.canvasToWorld = function(p) {
    return new vec2(
        (this.camera.origin.x + (p.x - this.renderer.width * 0.5)) / (this.camera.scale * meter2pixel(1)),
        (this.camera.origin.y - (p.y - this.renderer.height))      / (this.camera.scale * meter2pixel(1)));
}

export {
    Runner
}
