import { Body } from "./Body.js";
import { vec2, meter2pixel } from './utils/math.js';
import { MouseJoint } from "./joints/joint_mouse.js";

function Interaction(runner) {
    this.runner = runner;
    this.state = {
        mouseDown:          false,
        mouseDownMoving:    false,
        mousePosition:      new vec2(),
        mousePositionOld:   new vec2(),
        mouseDownPosition:  new vec2(),
        touchPosOld:        new Array(2),
        touchDist:          undefined,
        gestureStartScale:  undefined,
    };

    this.mouseJoint = null;

    this.mouseBody = new Body(Body.KINETIC);
    this.mouseBody.resetMassData();
    this.runner.world.addBody(this.mouseBody);

    //------------------------------ mousedown
    this.mousedown = event => {
        var pos = this.getMousePosition(event);

    	this.state.mouseDown = true;
    	this.state.mouseDownMoving = false;
    	this.state.mouseDownPosition.x = this.state.mousePosition.x = pos.x;
    	this.state.mouseDownPosition.y = this.state.mousePosition.y = pos.y;

        // Remove previous mouse joint
    	this.removeJoint();

    	var p = this.runner.canvasToWorld(pos);

    	// If we picked shape then create mouse joint
    	var body = this.runner.world.findBodyByPoint(p);
    	if (body) {
    		this.mouseBody.p.copy(p);
    		this.mouseBody.syncTransform();
    		this.mouseJoint = new MouseJoint(this.mouseBody, body, p);
    		this.mouseJoint.maxForce = body.m * 1000;
    		this.runner.world.addJoint(this.mouseJoint);
    	}

    	// for the touch device
    	this.state.mousePositionOld.x = this.state.mousePosition.x;
    	this.state.mousePositionOld.y = this.state.mousePosition.y;

    	event.preventDefault();
    };
    //------------------------------ mousemove
    this.mousemove = event => {
    	this.state.mousePosition = this.getMousePosition(event);

    	if (this.state.mouseDown) {
    		if (this.mouseJoint) {
    			this.mouseBody.p.copy(this.runner.canvasToWorld(this.state.mousePosition));
    			this.mouseBody.syncTransform();
    		}
    		else {
    			var dx = this.state.mousePosition.x - this.state.mousePositionOld.x;
    			var dy = this.state.mousePosition.y - this.state.mousePositionOld.y;
    			this.scrollView(-dx, dy);
    		}
    	}

    	this.state.mousePositionOld.x = this.state.mousePosition.x;
    	this.state.mousePositionOld.y = this.state.mousePosition.y;

    	if (this.state.mouseDown) this.state.mouseDownMoving = true;

    	event.preventDefault();
    };
    //------------------------------ mouseup & mouseleave
    this.mouseup = this.mouseleave = event => {
    	this.removeJoint();
    	this.state.mouseDown = false;
    	this.state.mouseDownMoving = false;
    	event.preventDefault();
    };

    //------------------------------ mousewheel
    this.mousewheel = event => {
    	var wheelDeltaX = 0;
    	var wheelDeltaY = 0;

    	if (event.detail) { // Mozilla
    		if (event.axis == event.HORIZONTAL_AXIS)
    			wheelDeltaX = -40 * event.detail;
    		else
    			wheelDeltaY = -40 * event.detail;
    	}
    	else if (event.wheelDeltaX) {
    		wheelDeltaX = event.wheelDeltaX;
    		wheelDeltaY = event.wheelDeltaY;
    	}
    	else if (event.wheelDelta) { // IE, Opera
    		wheelDeltaY = event.wheelDelta;
    	}

    	// Zoom in and out using vertical mouse wheel
    	var ds = -wheelDeltaY * 0.001;
    	var oldViewScale = this.runner.camera.scale;
    	this.runner.camera.scale = Math.clamp(oldViewScale + ds, this.runner.camera.minScale, this.runner.camera.maxScale);
    	ds = this.runner.camera.scale - oldViewScale;
    	ds *= meter2pixel(1);
    	// Adjust view origin for focused zoom in and out
    	// p = (1 + ds) * p - ds * p
    	var p = this.runner.canvasToWorld(this.getMousePosition(event));
    	// Horizontal scroll using horizontal mouse wheel
    	var dx = wheelDeltaX * 0.2;

        this.scrollView(p.x * ds - dx, p.y * ds);
    	event.preventDefault();
    };

    function distance(x1, y1, x2, y2)
    {
        var dx = x1 - x2;                       // delta x
        var dy = y1 - y2;                       // delta y
        return Math.sqrt(dx * dx + dy * dy);    // distance
    };

    //------------------------------ touchstart
    this.touchstart = event => {
        this.removeJoint();
        if (event.touches.length === 2) {
            this.state.gestureStartScale = this.runner.camera.scale;
            this.state.touchPosOld[0] = this.getTouchPosition(event.touches[0]);
            this.state.touchPosOld[1] = this.getTouchPosition(event.touches[1]);

            this.state.touchDist = distance(
                this.state.touchPosOld[0].x,
                this.state.touchPosOld[0].y,
                this.state.touchPosOld[1].x,
                this.state.touchPosOld[1].y
            );

            event.preventDefault();
        }
    }
    //------------------------------ touchmove
    this.touchmove = event => {
        if (event.touches.length === 2) {
            var touch1 = this.getTouchPosition(event.touches[0]);
            var touch2 = this.getTouchPosition(event.touches[1]);

            var dist = distance(touch1.x, touch1.y, touch2.x, touch2.y);

            var scale = dist / this.state.touchDist;
            var threhold = Math.clamp(scale - 1, -0.1, 0.1);
        	var gestureScale = this.state.gestureStartScale * (scale - threhold);

            var v1 = vec2.sub(touch1, this.state.touchPosOld[0]);
            var v2 = vec2.sub(touch2, this.state.touchPosOld[1]);

            var d1 = v1.length();
            var d2 = v2.length();

            if (d1 > 0 || d2 > 0) {
                var touchScaleCenter = this.runner.canvasToWorld(vec2.lerp(touch1, touch2, d1 / (d1 + d2)));
                var oldScale = this.runner.camera.scale;
                this.runner.camera.scale  = Math.clamp(gestureScale, this.runner.camera.minScale, this.runner.camera.maxScale);
                var ds = this.runner.camera.scale  - oldScale;
                ds *= meter2pixel(1);
                this.scrollView(-(v1.x + v2.x) * 0.5 + touchScaleCenter.x * ds, (v1.y + v2.y) * 0.5 + touchScaleCenter.y * ds);
            }

            this.state.touchPosOld[0] = touch1;
            this.state.touchPosOld[1] = touch2;

            event.preventDefault();
        }
    }
    //------------------------------ touchHandler
    this.touchHandler = event => {
    	if (event.touches.length <= 1) {
    		var type = {
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }[event.type] || "";
    		var first = event.changedTouches[0];
        	var simulatedEvent = document.createEvent("MouseEvent");
    		simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
    		first.target.dispatchEvent(simulatedEvent);
    	}
    	else if (this[event.type]) this[event.type](event);

    	event.preventDefault();
    }
    //--------------------------------------------------------------------

    ["mousedown", "mousemove", "mouseup", "mouseleave", "mousewheel"]
        .forEach(event => this.runner.renderer.canvas.addEventListener(event, this[event]));
    this.runner.renderer.canvas.addEventListener("touchstart",  this.touchHandler);
    this.runner.renderer.canvas.addEventListener("touchmove",   this.touchHandler);
    this.runner.renderer.canvas.addEventListener("touchend",    this.touchHandler);
    this.runner.renderer.canvas.addEventListener("touchcancel", this.touchHandler);

}

Interaction.prototype.destroy = function() {
    this.removeJoint();
    this.runner.world.removeBody(this.mouseBody);
}

Interaction.prototype.removeJoint = function() {
    if (this.mouseJoint) {
        this.runner.world.removeJoint(this.mouseJoint);
        this.mouseJoint = null;
    }
}

Interaction.prototype.getMousePosition = function(event) {
	return new vec2(event.offsetX, event.offsetY);
}

Interaction.prototype.getTouchPosition = function(event) {
    var rect = this.runner.renderer.canvas.getBoundingClientRect();
	return new vec2(event.pageX - rect.left, event.pageY - rect.top);
}

Interaction.prototype.scrollView = function(dx, dy) {
	this.runner.camera.origin.x += dx;
	this.runner.camera.origin.y += dy;
	// Set dirtyBounds to full screen
	this.runner.dirtyBounds.set(this.runner.canvasToWorld(new vec2(0, this.runner.renderer.height)), this.runner.canvasToWorld(new vec2(this.runner.renderer.width, 0)));
	this.runner.static_outdated = true;
}

export {
    Interaction
}
