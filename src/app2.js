/*
* Copyright (c) 2012 Ju Hyung Lee
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software
* and associated documentation files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or
* substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
* BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { addEvent, ready, isAppleMobileDevice } from './base.js';

import { pixel2meter, meter2pixel, vec2, Bounds } from './utils/math.js';

import { DemoCircles } from "./demo/demo_circles.js";
import { DemoCar } from "./demo/demo_car.js";
import { DemoRagDoll } from "./demo/demo_ragdoll.js";
import { DemoSeeSaw } from "./demo/demo_seesaw.js";
import { DemoPyramid } from "./demo/demo_pyramid.js";
import { DemoCrank } from "./demo/demo_crank.js";
import { DemoRope } from "./demo/demo_rope.js";
import { DemoWeb } from "./demo/demo_web.js";
import { DemoBounce } from "./demo/demo_bounce.js";

import { RendererCanvas } from "./renderers/renderer_canvas.js";

import { collision } from "./utils/collision.js";
import { Shape } from "./shapes/shape.js";


import { World } from "./World.js";
import { Body } from "./Body.js";
import { stats } from "./utils/stats.js";

import { MouseJoint } from "./joints/joint_mouse.js";



const App = function() {

	var HELPER_JOINT_ANCHOR_RADIUS = pixel2meter(2.5);
	var PIXEL_UNIT = pixel2meter(1);

	// DOM objects
	var domCanvas;

	// canvas rendering stuffs
	var fg = {};
	var bg = {};
	var renderer;
	var activeWindow = true;
	var camera = {
		origin: new vec2(0, 0),
		scale: 1,
		minScale: 0.5,
		maxScale: 8.0,
		bounds: new Bounds,
		scroll: new vec2(0, 0)
	};
	var dirtyBounds = new Bounds; // dirty bounds in world space

	var pause = false;
	var step = false;
	var frameCount;
	var lastTime;
	var timeDelta;
	var fps_frameCount = 0;
	var fps_time = 0;
	var fps = 0;


	var world;
	const demoArr = [DemoCircles, DemoCar, DemoRagDoll, DemoSeeSaw, DemoPyramid, DemoCrank, DemoRope, DemoWeb, DemoBounce];
	const demo = demoArr[0];

	const randomColor = ["#BEB", "#48B", "#CAA", "#8D5", "#6BE", "#98D", "#E78", "#7BC", "#E9E", "#BCD", "#EB6", "#EE7"]; // Random colors for drawing bodies
	var mouseBody;
	var mouseJoint;



	var backgroundColor = "rgb(95, 105, 118)";
	var jointAnchorColor = "#004000";


	// mouse & touch variables
	var mouseDown = false;
	var mouseDownMoving = false;
	var mousePosition = new vec2;
	var mousePositionOld = new vec2;
	var mouseDownPosition = new vec2;
	var touchPosOld = new Array(2);
	var gestureStartScale;
	var gestureScale;

	// settings variables
	var gravity = new vec2(0, -10);
	var frameRateHz = 60;
	var velocityIterations = 8;
	var positionIterations = 4;
	var warmStarting = true;
	var allowSleep = true;
	var enableDirtyBounds = true;
	var showJoints = true;

	function onReady() {
		// Initialize canvas context
		domCanvas = document.getElementById("canvas");
		fg.canvas = domCanvas;
		fg.ctx = fg.canvas.getContext("2d");

		bg.canvas = document.createElement("canvas");
		bg.ctx = bg.canvas.getContext("2d");


		//addEvent(window, "focus", function(ev) { activeWindow = true; });
		//addEvent(window, "blur", function(ev) { activeWindow = false; });
		addEvent(window, "resize", onResize);
		addEvent(domCanvas, "mousedown", onMouseDown);
		addEvent(domCanvas, "mousemove", onMouseMove);
		addEvent(domCanvas, "mouseup", onMouseUp);
		addEvent(domCanvas, "mouseleave", onMouseLeave);
		addEvent(domCanvas, "dblclick", onMouseDoubleClick);

		var eventname = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
		addEvent(domCanvas, eventname, onMouseWheel);

		addEvent(domCanvas, "touchstart", touchHandler);
		addEvent(domCanvas, "touchmove", touchHandler);
		addEvent(domCanvas, "touchend", touchHandler);
		addEvent(domCanvas, "touchcancel", touchHandler);

		addEvent(domCanvas, "gesturestart", onGestureStart);
		addEvent(domCanvas, "gesturechange", onGestureChange);
		addEvent(domCanvas, "gestureend", onGestureEnd);
		addEvent(window, "orientationchange", onResize);

		// Prevent elastic scrolling on iOS
		addEvent(document.body, "touchmove", function(ev) { ev.preventDefault(); });


		// Horizontal & vertical scrollbar will be hidden
		document.documentElement.style.overflowX = "hidden";
		document.documentElement.style.overflowY = "hidden";
		document.body.scroll = "no"; // ie only
	}

	function onLoad() {
		// HACK
		onResize();

		renderer = RendererCanvas;
		collision.init();

		world = new World();

		mouseBody = new Body(Body.KINETIC);
		mouseBody.resetMassData();
		world.addBody(mouseBody);

		resetScene();

		if (window.requestAnimationFrame) {
			function update() {
				runFrame();
	            window.requestAnimationFrame(update);
	        }
	        window.requestAnimationFrame(update);
		}
		else {
			window.setInterval(runFrame, 1000 / 60);
		}
	}



	function resetScene() {
		world.clear();
		world.gravity.copy(gravity);
		demo.init(world);
		initFrame();
	}

	function initFrame() {
		frameCount = 0;
		lastTime = Date.now();
		timeDelta = 0;
		// Set dirtyBounds to full screen
		dirtyBounds.set(canvasToWorld(new vec2(0, domCanvas.height)), canvasToWorld(new vec2(domCanvas.width, 0)));
		bg.outdated = true;
	}

	function worldToCanvas(p) {
		return new vec2(
			domCanvas.width * 0.5 + (p.x * (camera.scale * meter2pixel(1)) - camera.origin.x),
			domCanvas.height - (p.y * (camera.scale * meter2pixel(1)) - camera.origin.y));
	}

	function canvasToWorld(p) {
		return new vec2(
			(camera.origin.x + (p.x - domCanvas.width * 0.5)) / (camera.scale * meter2pixel(1)),
			(camera.origin.y - (p.y - domCanvas.height)) / (camera.scale * meter2pixel(1)));
	}

	function bodyColor(body) {
		if (!body.isDynamic()) {
			return "#777";
		}

		if (!body.isAwake()) {
			return "#999";
		}

		return randomColor[(body.id) % randomColor.length];
	}

	function runFrame() {
		var time = Date.now();
		var frameTime = (time - lastTime) / 1000;
		lastTime = time;

		if (activeWindow) {
			if (window.requestAnimationFrame) {
				frameTime = Math.floor(frameTime * 60 + 0.5) / 60;
			}


			if (!mouseDown) {
				var p = canvasToWorld(mousePosition);
				var body = world.findBodyByPoint(p);
				domCanvas.style.cursor = body ? "pointer" : "default";
			}

			if (!pause || step) {
				var h = 1 / frameRateHz;

				timeDelta += frameTime;

				if (step) {
					step = false;
					timeDelta = h;
				}

				stats.timeStep = 0;
				stats.stepCount = 0;

				for (var maxSteps = 4; maxSteps > 0 && timeDelta >= h; maxSteps--) {
					var t0 = Date.now();
					world.step(h, velocityIterations, positionIterations, warmStarting, allowSleep);
					stats.timeStep += Date.now() - t0;
					stats.stepCount++;

					timeDelta -= h;
				}

				if (timeDelta > h) {
					timeDelta = 0;
				}

				demo.runFrame();

			}

			if (stats.stepCount > 0) {
				updateScreen(frameTime);
			}

		}

		frameCount++;

		// Calculate frame per second
		fps_frameCount++;
		fps_time += frameTime;

		if (fps_time >= 1.0) {
			fps = fps_frameCount / fps_time;
			fps_time -= 1.0;
			fps_frameCount = 0;
		}
	}

	function updateScreen(frameTime) {
		var t0 = Date.now();
		drawFrame(frameTime);
		stats.timeDrawFrame = Date.now() - t0;
	}

	function drawFrame(frameTime) {
		// camera.bounds for culling
		camera.bounds.set(canvasToWorld(new vec2(0, domCanvas.height)), canvasToWorld(new vec2(domCanvas.width, 0)));

		// Check the visibility of shapes for all bodies
		for (var i = 0; i < world.bodyArr.length; i++) {
			var body = world.bodyArr[i];
			if (!body) {
				continue;
			}

			body.visible = false;

			for (var j = 0; j < body.shapeArr.length; j++) {
				var shape = body.shapeArr[j];
				var bounds = new Bounds(shape.bounds.mins, shape.bounds.maxs);
				if (camera.bounds.intersectsBounds(bounds)) {
					shape.visible = true;
					body.visible = true;
				}
				else {
					shape.visible = false;
				}
			}
		}

		// Update whole background canvas if we needed
		if (bg.outdated) {
			bg.outdated = false;
			bg.ctx.fillStyle = backgroundColor;
			bg.ctx.fillRect(0, 0, domCanvas.width, domCanvas.height);

			bg.ctx.save();
			bg.ctx.setTransform(camera.scale * meter2pixel(1), 0, 0, -(camera.scale * meter2pixel(1)), domCanvas.width * 0.5 - camera.origin.x, domCanvas.height + camera.origin.y);

			// Draw static bodies
			for (var i = 0; i < world.bodyArr.length; i++) {
				var body = world.bodyArr[i];
				if (body && body.isStatic()) {
					drawBody(bg.ctx, body, PIXEL_UNIT, "#000", bodyColor(body));
				}
			}

			bg.ctx.restore();
		}

		// Transform dirtyBounds world to screen
		if (enableDirtyBounds) {
			if (!dirtyBounds.isEmpty()) {
				var mins = worldToCanvas(dirtyBounds.mins);
				var maxs = worldToCanvas(dirtyBounds.maxs);
				var x = Math.max(Math.floor(mins.x), 0);
				var y = Math.max(Math.floor(maxs.y), 0);
				var w = Math.min(Math.ceil(maxs.x), domCanvas.width) - x;
				var h = Math.min(Math.ceil(mins.y), domCanvas.height) - y;

				if (w > 0 && h > 0) {
					fg.ctx.drawImage(bg.canvas, x, y, w, h, x, y, w, h);
				}
			}
		}
		else {
			fg.ctx.drawImage(bg.canvas, 0, 0);
		}

		fg.ctx.save();

		// Transform view coordinates to screen canvas
		/*fg.ctx.translate(domCanvas.width * 0.5, domCanvas.height);
		fg.ctx.scale(1, -1);

		// Transform world coordinates to view
		fg.ctx.translate(-camera.origin.x, -camera.origin.y);
		fg.ctx.scale(camera.scale, camera.scale);*/

		fg.ctx.setTransform(camera.scale * meter2pixel(1), 0, 0, -(camera.scale * meter2pixel(1)), domCanvas.width * 0.5 - camera.origin.x, domCanvas.height + camera.origin.y);

		dirtyBounds.clear();

		// Draw bodies except for static bodies
		for (var i = 0; i < world.bodyArr.length; i++) {
			var body = world.bodyArr[i];
			if (body && body.visible) {
				if (!body.isStatic()) {
					drawBody(fg.ctx, body, PIXEL_UNIT, "#000", bodyColor(body));
				}
			}
		}

		// Draw joints
		if (showJoints) {
			for (var i = 0; i < world.jointArr.length; i++) {
				if (world.jointArr[i]) {
					drawHelperJointAnchors(fg.ctx, world.jointArr[i]);
				}
			}
		}

		fg.ctx.restore();
	}

	function drawBody(ctx, body, lineWidth, outlineColor, fillColor) {
		for (var i = 0; i < body.shapeArr.length; i++) {
			var shape = body.shapeArr[i];
			if (!shape.visible) {
				continue;
			}

			drawBodyShape(ctx, shape, lineWidth, outlineColor, fillColor);

			if (!body.isStatic()) {
				var expand = PIXEL_UNIT * 3;
				var bounds = Bounds.expand(shape.bounds, expand, expand);
				dirtyBounds.addBounds(bounds);
			}
		}
	}

	function drawBodyShape(ctx, shape, lineWidth, outlineColor, fillColor) {
		switch (shape.type) {
		case Shape.TYPE_CIRCLE:
			renderer.drawCircle(ctx, shape.tc, shape.r, shape.body.a, lineWidth, outlineColor, fillColor);
			break;
		case Shape.TYPE_SEGMENT:
			renderer.drawSegment(ctx, shape.ta, shape.tb, shape.r, lineWidth, outlineColor, fillColor);
			break;
		case Shape.TYPE_POLY:
			if (shape.convexity) renderer.drawPolygon(ctx, shape.tverts, lineWidth, outlineColor, fillColor);
			else renderer.drawPolygon(ctx, shape.tverts, lineWidth * 2, "#F00", fillColor);
			break;
		}
	}

	function drawCanvasTransformedBodyShape(ctx, shape, lineWidth, outlineColor, fillColor) {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);

		lineWidth *= camera.scale;

		switch (shape.type) {
		case Shape.TYPE_CIRCLE:
			renderer.drawCircle(ctx, worldToCanvas(shape.tc), shape.r * camera.scale * meter2pixel(1), -shape.body.a, lineWidth, outlineColor, fillColor);
			break;
		case Shape.TYPE_SEGMENT:
			renderer.drawSegment(ctx, worldToCanvas(shape.ta), worldToCanvas(shape.tb), shape.r * camera.scale * meter2pixel(1), lineWidth, outlineColor, fillColor);
			break;
		case Shape.TYPE_POLY:
			var ctverts = new Array(shape.tverts.length);
			for (var i = 0; i < ctverts.length; i++) {
				ctverts[i] = worldToCanvas(shape.tverts[i]);
			}
			renderer.drawPolygon(ctx, ctverts, lineWidth, outlineColor, fillColor);
			break;
		}

		ctx.restore();
	}



	function drawHelperJointAnchors(ctx, joint) {
		var body1 = joint.body1;
		var body2 = joint.body2;

		var bounds = new Bounds;

		var p1 = joint.getWorldAnchor1();
		var p2 = joint.getWorldAnchor2();

		var rvec = new vec2(HELPER_JOINT_ANCHOR_RADIUS, 0);
		var uvec = new vec2(0, HELPER_JOINT_ANCHOR_RADIUS);

		renderer.drawBox(ctx, p1, rvec, uvec, 0, "", jointAnchorColor);
		renderer.drawBox(ctx, p2, rvec, uvec, 0, "", jointAnchorColor);

		bounds.addExtents(p1, HELPER_JOINT_ANCHOR_RADIUS, HELPER_JOINT_ANCHOR_RADIUS);
		bounds.addExtents(p2, HELPER_JOINT_ANCHOR_RADIUS, HELPER_JOINT_ANCHOR_RADIUS);

		renderer.drawLine(ctx, p1, p2, PIXEL_UNIT, jointAnchorColor);

		bounds.addPoint(p1);
		bounds.addPoint(p2);

		if (!body1.isStatic() || !body2.isStatic()) {
			bounds.expand(PIXEL_UNIT * 2, PIXEL_UNIT * 2);
			dirtyBounds.addBounds(bounds);
		}
	}


	function onResize(ev) {
		window.scrollTo(0, 0);

		fg.canvas.width = window.innerWidth;// - domView.offsetLeft;
		fg.canvas.height = window.innerHeight;// - domView.offsetTop;

		//console.log(fg.canvas.width, fg.canvas.height);

		bg.canvas.width = fg.canvas.width;
		bg.canvas.height = fg.canvas.height;

		// Set dirtyBounds to full screen
		dirtyBounds.set(canvasToWorld(new vec2(0, domCanvas.height)), canvasToWorld(new vec2(domCanvas.width, 0)));
		bg.outdated = true;
	}

	function getMousePosition(ev) {
		return new vec2(
			ev.clientX + document.body.scrollLeft,// - domView.offsetLeft,
			ev.clientY + document.body.scrollTop/* - domView.offsetTop*/);
	}

	function onMouseDown(ev) {
		mouseDown = true;
		mouseDownMoving = false;

		var pos = getMousePosition(ev);

		mousePosition.x = pos.x;
		mousePosition.y = pos.y;

		mouseDownPosition.x = mousePosition.x;
		mouseDownPosition.y = mousePosition.y;

		// Remove previous mouse joint
		if (mouseJoint) {
			world.removeJoint(mouseJoint);
			mouseJoint = null;
		}

		var p = canvasToWorld(pos);

		// If we picked shape then create mouse joint
		var body = world.findBodyByPoint(p);
		if (body) {
			mouseBody.p.copy(p);
			mouseBody.syncTransform();
			mouseJoint = new MouseJoint(mouseBody, body, p);
			mouseJoint.maxForce = body.m * 1000;
			world.addJoint(mouseJoint);
		}

		// for the touch device
		mousePositionOld.x = mousePosition.x;
		mousePositionOld.y = mousePosition.y;

		ev.preventDefault();
	}

	function onMouseUp(ev) {
		var pos = getMousePosition(ev);
		var p = canvasToWorld(pos);

		if (mouseJoint) {
			world.removeJoint(mouseJoint);
			mouseJoint = null;
		}

		mouseDown = false;
		mouseDownMoving = false;

		ev.preventDefault();
	}

	function scrollView(dx, dy) {
		camera.origin.x += dx;
		camera.origin.y += dy;
		// Set dirtyBounds to full screen
		dirtyBounds.set(canvasToWorld(new vec2(0, domCanvas.height)), canvasToWorld(new vec2(domCanvas.width, 0)));
		bg.outdated = true;
	}

	function onMouseMove(ev) {
		mousePosition = getMousePosition(ev);


		if (mouseDown) {
			if (mouseJoint) {
				mouseBody.p.copy(canvasToWorld(mousePosition));
				mouseBody.syncTransform();
			}
			else {
				var dx = mousePosition.x - mousePositionOld.x;
				var dy = mousePosition.y - mousePositionOld.y;

				scrollView(-dx, dy);
			}
		}


		mousePositionOld.x = mousePosition.x;
		mousePositionOld.y = mousePosition.y;

		if (mouseDown) {
			mouseDownMoving = true;
		}

		ev.preventDefault();
	}

	function onMouseLeave(ev) {
		if (mouseJoint) {
			world.removeJoint(mouseJoint);
			mouseJoint = null;
		}
	}

	function onMouseDoubleClick(ev) {
		var pos = getMousePosition(ev);
		var p = canvasToWorld(pos);
	}

	function onMouseWheel(ev) {
		var wheelDeltaX = 0;
		var wheelDeltaY = 0;

		if (ev.detail) { // Mozilla
			if (ev.axis == ev.HORIZONTAL_AXIS)
				wheelDeltaX = -40 * ev.detail;
			else
				wheelDeltaY = -40 * ev.detail;
		}
		else if (ev.wheelDeltaX) {
			wheelDeltaX = ev.wheelDeltaX;
			wheelDeltaY = ev.wheelDeltaY;
		}
		else if (ev.wheelDelta) { // IE, Opera
			wheelDeltaY = ev.wheelDelta;
		}

		// Zoom in and out using vertical mouse wheel
		var ds = -wheelDeltaY * 0.001;
		var oldViewScale = camera.scale;
		camera.scale = Math.clamp(oldViewScale + ds, camera.minScale, camera.maxScale);
		ds = camera.scale - oldViewScale;
		ds *= meter2pixel(1);

		// Adjust view origin for focused zoom in and out
		// p = (1 + ds) * p - ds * p
		var p = canvasToWorld(getMousePosition(ev));
		camera.origin.x += p.x * ds;
		camera.origin.y += p.y * ds;

		// Horizontal scroll using horizontal mouse wheel
		var dx = wheelDeltaX * 0.2;
		camera.origin.x -= dx;

		// Clamp view origin limit
		//camera.origin.y = Math.clamp(camera.origin.y, 0, 0);

		// Set dirtyBounds to full screen
		dirtyBounds.set(canvasToWorld(new vec2(0, domCanvas.height)), canvasToWorld(new vec2(domCanvas.width, 0)));
		bg.outdated = true;

		ev.preventDefault();
	}

	function touchHandler(ev) {
		if (ev.touches.length <= 1) {
			var first = ev.changedTouches[0];
			var type = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup" }[ev.type] || "";
			//initMouseEvent(type, canBubble, cancelable, view, clickCount, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
			var simulatedEvent = document.createEvent("MouseEvent");
			simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
			first.target.dispatchEvent(simulatedEvent);
		}
		else {
			var handler = {touchstart: onTouchStart, touchmove: onTouchMove, touchend: onTouchEnd}[ev.type];
			if (handler) {
				handler(ev);
			}
		}

		ev.preventDefault();
	}

	function onTouchStart(ev) {
		if (mouseJoint) {
			world.removeJoint(mouseJoint);
			mouseJoint = null;
		}
		if (ev.touches.length == 2) {
			touchPosOld[0] = getMousePosition(ev.touches[0]);
			touchPosOld[1] = getMousePosition(ev.touches[1]);
			ev.preventDefault();
		}
	}

	function onTouchMove(ev) {
		if (ev.touches.length == 2) {
			var touchPos = [];

			touchPos[0] = getMousePosition(ev.touches[0]);
			touchPos[1] = getMousePosition(ev.touches[1]);

			var v1 = vec2.sub(touchPos[0], touchPosOld[0]);
			var v2 = vec2.sub(touchPos[1], touchPosOld[1]);

			var d1 = v1.length();
			var d2 = v2.length();

			if (d1 > 0 || d2 > 0) {
				var touchScaleCenter = canvasToWorld(vec2.lerp(touchPos[0], touchPos[1], d1 / (d1 + d2)));

				var oldScale = camera.scale;
				camera.scale  = Math.clamp(gestureScale, camera.minScale, camera.maxScale);
				var ds = camera.scale  - oldScale;
				ds *= meter2pixel(1);

				camera.origin.x += touchScaleCenter.x * ds;
				camera.origin.y += touchScaleCenter.y * ds;

				scrollView(-(v1.x + v2.x) * 0.5, (v1.y + v2.y) * 0.5);
			}

			touchPosOld[0] = touchPos[0];
			touchPosOld[1] = touchPos[1];

			ev.preventDefault();
		}
	}

	function onTouchEnd(ev) {
	}

	function onGestureStart(ev) {
		gestureStartScale = camera.scale;

		ev.preventDefault();
	}

	function onGestureChange(ev) {
		var threhold = Math.clamp(ev.scale - 1, -0.1, 0.1);
		gestureScale = gestureStartScale * (ev.scale - threhold);

		ev.preventDefault();
	}

	function onGestureEnd(ev) {
	}


	return { onReady: onReady, onLoad: onLoad };
}();

ready(App.onReady);

addEvent(window, "load", App.onLoad);
