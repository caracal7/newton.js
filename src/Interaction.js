import { Body }                                 from "./Body.js";
import { vec2, meter2pixel, distance, Clamp }   from './utils/math.js';
import { MouseJoint }                           from "./joints/joint_mouse.js";
import { pixel2meter }                          from './utils/math.js';
import { isAppleMobileDevice }                  from './utils/util.js';

const SELECTABLE_LINE_DIST_THREHOLD = pixel2meter(isAppleMobileDevice() ? 8 : 4);

//  Private variables
const Events    = Symbol("events");

const events    = ['mousedown', 'mouseup', 'mousemove'];

function Interaction(runner, settings) {
    this.settings = Object.assign({
        pick: true,
        zoom: true
    }, settings || {});

    this.runner = runner;
    this.runner.interaction = this;

    this.SELECTABLE_LINE_DIST_THREHOLD = SELECTABLE_LINE_DIST_THREHOLD;

    this.state = {
        mouseDown:          false,
        pointerDownMoving:  false,
        /*
        mouseDownPosition:  new vec2(),
        mousePositionOld:   new vec2(),
        touchPosOld:        new Array(2),
        touchDist:          undefined,
        gestureStartScale:  undefined,*/
    };

    this.mouseJoint = null;

    this.mouseBody = new Body(Body.KINETIC);
    this.mouseBody.resetMassData();
    this.runner.world.addBody(this.mouseBody);
    /*
    //------------------------------ mousedown
    this.mousedown = event => {
        var pos = this.getMousePosition(event);
    	this.state.mouseDown = true;
    	this.state.pointerDownMoving = false;
    	this.state.mouseDownPosition.x = pos.x;
    	this.state.mouseDownPosition.y = pos.y;
        // Remove previous mouse joint
    	this.removeJoint();
    	var p = this.runner.canvasToWorld(pos);
    	// If we picked shape then create mouse joint
    	var body = this.runner.world.findBodyByPoint(p);

        var block = false;
        if(this[Events]?.mousedown?.length) {
            this[Events].mousedown.forEach(callback => {
                var b = callback(body, pos, p);
                if(b) block = true;
            });
            if(this.runner.pause) this.runner.drawFrame(0);
        }
        if(block) {
        	this.state.mouseDown = false;
        } else {
            if (this.settings.pick && body) {
        		this.mouseBody.p.copy(p);
        		this.mouseBody.syncTransform();
        		this.mouseJoint = new MouseJoint(this.mouseBody, body, p);
        		this.mouseJoint.maxForce = body.m * 50000;
        		this.runner.world.addJoint(this.mouseJoint);
        	}
        	this.state.mousePositionOld.x = pos.x;
        	this.state.mousePositionOld.y = pos.y;
        }
    	event.preventDefault();
    };
    //------------------------------ mousemove
    this.mousemove = event => {
    	var pos = this.getMousePosition(event);
        // "touchleave" HACK
        if(
            pos.x < 0 || pos.x > this.runner.renderer.width ||
            pos.y < 0 || pos.y > this.runner.renderer.height
        ) return this.mouseleave(event);

    	if (this.state.mouseDown) {
    		if (this.mouseJoint) {
    			this.mouseBody.p.copy(this.runner.canvasToWorld(pos));
    			this.mouseBody.syncTransform();
    		}
    		else {
    			var dx = pos.x - this.state.mousePositionOld.x;
    			var dy = pos.y - this.state.mousePositionOld.y;
                if(dx || dy) { // Android hack
                    this.scrollView(-dx, dy);
                    this.state.mousePositionOld.x = pos.x;
                    this.state.mousePositionOld.y = pos.y;
                    this.state.pointerDownMoving = true;
                }
    		};
            if(this.runner.pause) this.runner.drawFrame(0);
    	};
        if(this[Events]?.mousemove?.length) {
            var p = this.runner.canvasToWorld(pos);
            this[Events].mousemove.forEach(callback => callback(pos, p));
            if(this.runner.pause) this.runner.drawFrame(0);
        };
    	event.preventDefault();
    };

    //------------------------------ mouseup & mouseleave
    this.mouseup = this.mouseleave = event => {
        if(this[Events]?.mouseup?.length) {
        	var pos = this.getMousePosition(event);
            var p = this.runner.canvasToWorld(pos);
            this[Events].mouseup.forEach(callback => callback(
                event.type == 'mouseleave' ? undefined : this.runner.world.findBodyByPoint(p),
                pos, p, this.state.pointerDownMoving
            ));
        };
        this.state.mouseDown = false;
    	this.removeJoint();
        if(this.runner.pause) this.runner.drawFrame(0);
    	event.preventDefault();
    };
    //------------------------------ mousewheel
    this.mousewheel = event => {
        if(!this.settings.zoom) return event.preventDefault();

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
    	this.runner.camera.scale = Clamp(oldViewScale + ds, this.runner.camera.minScale, this.runner.camera.maxScale);
    	ds = this.runner.camera.scale - oldViewScale;
    	ds *= meter2pixel(1);
    	// Adjust view origin for focused zoom in and out
    	// p = (1 + ds) * p - ds * p
    	var p = this.runner.canvasToWorld(this.getMousePosition(event));
    	// Horizontal scroll using horizontal mouse wheel
    	var dx = wheelDeltaX * 0.2;

        this.scrollView(p.x * ds - dx, p.y * ds);

        if(this.runner.pause) this.runner.drawFrame(0);
    	event.preventDefault();
    };
    //------------------------------ touchstart
    this.touchstart = event => {
        this.removeJoint();

        if (event.touches.length === 2) {
        	this.state.pointerDownMoving = false;
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
        if(!this.settings.zoom) return event.preventDefault();

        if (event.touches.length === 2) {
            this.state.pointerDownMoving = true;

            var touch1 = this.getTouchPosition(event.touches[0]);
            var touch2 = this.getTouchPosition(event.touches[1]);
            // "touchleave" HACK
            if(
                touch1.x < 0 || touch1.x > this.runner.renderer.width ||
                touch1.y < 0 || touch1.y > this.runner.renderer.height ||
                touch2.x < 0 || touch2.x > this.runner.renderer.width ||
                touch2.y < 0 || touch2.y > this.runner.renderer.height
            ) return this.mouseleave(event);

            var scale = distance(touch1.x, touch1.y, touch2.x, touch2.y) / this.state.touchDist;
            var threhold = Clamp(scale - 1, -0.1, 0.1);
        	var gestureScale = this.state.gestureStartScale * (scale - threhold);

            var v1 = vec2.sub(touch1, this.state.touchPosOld[0]);
            var v2 = vec2.sub(touch2, this.state.touchPosOld[1]);

            var d1 = v1.length();
            var d2 = v2.length();

            if (d1 > 0 || d2 > 0) {
                var touchScaleCenter = this.runner.canvasToWorld(vec2.lerp(touch1, touch2, d1 / (d1 + d2)));
                var oldScale = this.runner.camera.scale;
                this.runner.camera.scale  = Clamp(gestureScale, this.runner.camera.minScale, this.runner.camera.maxScale);
                var ds = this.runner.camera.scale  - oldScale;
                ds *= meter2pixel(1);
                this.scrollView(-(v1.x + v2.x) * 0.5 + touchScaleCenter.x * ds, (v1.y + v2.y) * 0.5 + touchScaleCenter.y * ds);
            }

            this.state.touchPosOld[0] = touch1;
            this.state.touchPosOld[1] = touch2;

            if(this.runner.pause) this.runner.drawFrame(0);
        }
        event.preventDefault();
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

    //-------------------------------------------------------------------
    ["mousedown", "mousemove", "mouseup", "mouseleave", "mousewheel"]
        .forEach(event => this.runner.renderer.canvas.addEventListener(event, this[event]));

    this.runner.renderer.canvas.addEventListener("touchstart",  this.touchHandler);
    this.runner.renderer.canvas.addEventListener("touchmove",   this.touchHandler);
    this.runner.renderer.canvas.addEventListener("touchend",    this.touchHandler);
    this.runner.renderer.canvas.addEventListener("touchcancel", this.touchHandler);
    */
    this[Events] = {};

    if(!this.runner.renderer.two) return; // Временно



    var renderer =  this.runner.renderer;
    var interaction = this;

    const { Two, two, stage, zui } = renderer;

    var domElement = two.renderer.domElement;
    var mouse = new Two.Vector();
    var touches = {};
    var distance = 0;
    var dragging = false;

    zui.addLimits(0.06, 100);

    const startDrag = (x,y) => {
        console.log('startDrag')
        // Remove previous mouse joint
        interaction.removeJoint();

        const world_pos = zui.clientToSurface(x, y);
        const p = new vec2(world_pos.x, -world_pos.y);
        // If we picked shape then create mouse joint
        dragging = runner.world.findBodyByPoint(p);

        if (dragging) {
            if(dragging.isStatic()) return (dragging = undefined);

            interaction.mouseBody.p.copy(p);
            interaction.mouseBody.syncTransform();
            interaction.mouseJoint = new MouseJoint(interaction.mouseBody, dragging, p);
            interaction.mouseJoint.maxForce = dragging.m * 50000;
            runner.world.addJoint(interaction.mouseJoint);
        }
        return world_pos;
    }

    const createMouseJoint = world_pos_vec => {
        interaction.mouseBody.p.copy(world_pos_vec);
        interaction.mouseBody.syncTransform();
        interaction.mouseJoint = new MouseJoint(interaction.mouseBody, dragging, world_pos_vec);
        interaction.mouseJoint.maxForce = dragging.m * 50000;
        runner.world.addJoint(interaction.mouseJoint);
    }

    //------------------------------ mousedown
    const mousedown = event => {
        this.state.mouseDown = true;
        this.state.pointerDownMoving = false;

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        // Remove previous mouse joint
        interaction.removeJoint();

        const world_pos = zui.clientToSurface(event.offsetX, event.offsetY);
        const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
        // If we picked shape then create mouse joint
        dragging = runner.world.findBodyByPoint(world_pos_vec);

        var block = false;
        if(this[Events]?.mousedown?.length) {
            this[Events].mousedown.forEach(callback => {
                if(callback(dragging, new vec2(event.offsetX, event.offsetY), world_pos_vec))
                    block = true;
            });
            if(this.runner.pause) this.runner.drawFrame(0);
        }

        if(block) {
            dragging = undefined;
            this.state.mouseDown = false;
        } else {
            if (this.settings.pick && dragging) {
                if(dragging.isStatic())
                    dragging = undefined;
                else
                    createMouseJoint(world_pos_vec);
        	}
        }
        window.addEventListener('mousemove', mousemove, false);
        window.addEventListener('mouseup', mouseup, false);
    }
    //------------------------------ mousemove
    const mousemove = event => {
        if(this.state.mouseDown) this.state.pointerDownMoving = true;

        if (dragging) {
            const rect = runner.renderer.canvas.getBoundingClientRect();
            const world_pos = zui.clientToSurface(event.offsetX - rect.left, event.offsetY - rect.top);
            const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
            interaction.mouseBody.p.copy(world_pos_vec);
            interaction.mouseBody.syncTransform();
        } else {
            var dx = event.clientX - mouse.x;
            var dy = event.clientY - mouse.y;
            zui.translateSurface(dx, dy);
            mouse.set(event.clientX, event.clientY);
        }

        if(this[Events]?.mousemove?.length) {
            const rect = runner.renderer.canvas.getBoundingClientRect();
            var x = event.offsetX - rect.left;
            var y = event.offsetY - rect.top;
            const world_pos = zui.clientToSurface(x, y);
            const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
            this[Events].mousemove.forEach(callback => callback(new vec2(x, y), world_pos_vec));
            if(this.runner.pause) this.runner.drawFrame(0);
        };
    }
    //------------------------------ mouseup
    const mouseup = event => {
        if(this[Events]?.mouseup?.length) {
            const rect = runner.renderer.canvas.getBoundingClientRect();
            var x = event.offsetX - rect.left;
            var y = event.offsetY - rect.top;
            const world_pos = zui.clientToSurface(x, y);
            const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
            this[Events].mouseup.forEach(callback => callback(
                event.type == 'mouseleave' ? undefined : runner.world.findBodyByPoint(world_pos_vec),
                new vec2(x, y), world_pos_vec, this.state.pointerDownMoving
            ));
        };

        this.state.mouseDown = false;
        interaction.removeJoint();
        window.removeEventListener('mousemove', mousemove, false);
        window.removeEventListener('mouseup', mouseup, false);
    }
    //------------------------------ mouseleave
    const mouseleave = event => {
        mouseup(event)
    }

    //------------------------------ mousewheel
    const mousewheel = event => {
        var dy = (event.wheelDeltaY || - event.deltaY) / 1000;
        var rect = domElement.getBoundingClientRect();
        zui.zoomBy(dy, event.clientX - rect.left, event.clientY - rect.top);
        event.preventDefault();
    }
    //------------------------------ touchstart
    const touchstart = event => {
        switch (event.touches.length) {
            case 2:
                pinchstart(event);
                break;
            case 1:
                panstart(event)
                break;
        }
        e.preventDefault();
    }
    //------------------------------ touchmove
    const touchmove = event => {
        switch (event.touches.length) {
            case 2:
                pinchmove(event);
                break;
            case 1:
                panmove(event)
                break;
        }
        event.preventDefault();
    }
    //------------------------------ touchend
    const touchend = event => {
        interaction.removeJoint();
        touches = {};
        var touch = event.touches[0];
        if (touch) {  // Pass through for panning after pinching
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
        event.preventDefault();
    }
    //------------------------------ panstart
    const panstart = event => {
        var touch = event.touches[ 0 ];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
        var rect = runner.renderer.canvas.getBoundingClientRect();
        startDrag(touch.clientX - rect.left, touch.clientY - rect.top);
    }
    //------------------------------ panmove
    const panmove = event => {
        var touch = event.touches[0];
        if (dragging) {
            const rect = runner.renderer.canvas.getBoundingClientRect();
            const world_pos = zui.clientToSurface(touch.clientX - rect.left, touch.clientY - rect.top);
            const p = new vec2(world_pos.x, -world_pos.y);
            interaction.mouseBody.p.copy(p);
            interaction.mouseBody.syncTransform();
        } else {
            var dx = touch.clientX - mouse.x;
            var dy = touch.clientY - mouse.y;
            zui.translateSurface(dx, dy);
            mouse.set(touch.clientX, touch.clientY);
        }
    }
    //------------------------------ pinchstart
    const pinchstart = event => {
        var [a, b] = event.touches;
        var dx = b.clientX - a.clientX;
        var dy = b.clientY - a.clientY;
        distance = Math.sqrt(dx * dx + dy * dy);
        mouse.x = dx / 2 + a.clientX;
        mouse.y = dy / 2 + a.clientY;
    }
    //------------------------------ pinchmove
    const pinchmove = event => {
        var [a, b] = event.touches;

        var dx = b.clientX - a.clientX;
        var dy = b.clientY - a.clientY;

        var mx = dx / 2 + a.clientX;
        var my = dy / 2 + a.clientY;
        zui.translateSurface(mx - mouse.x, my - mouse.y);
        mouse.x = mx;
        mouse.y = my;

        var d = Math.sqrt(dx * dx + dy * dy);
        var delta = d - distance;
        var rect = domElement.getBoundingClientRect();
        zui.zoomBy(delta / 250, mouse.x - rect.left, mouse.y - rect.top);
        distance = d;
    }

    domElement.addEventListener('mousedown', mousedown, false);
    domElement.addEventListener('mouseleave', mouseleave, false);
    domElement.addEventListener('mousewheel', mousewheel, false);
    domElement.addEventListener('wheel', mousewheel, false);

    domElement.addEventListener('touchstart', touchstart, false);
    domElement.addEventListener('touchmove', touchmove, false);
    domElement.addEventListener('touchend', touchend, false);
    domElement.addEventListener('touchcancel', touchend, false);

}




Interaction.prototype.destroy = function() {
    /*
    ["mousedown", "mousemove", "mouseup", "mouseleave", "mousewheel"]
        .forEach(event => this.runner.renderer.canvas.removeEventListener(event, this[event]));
    this.runner.renderer.canvas.removeEventListener("touchstart",  this.touchHandler);
    this.runner.renderer.canvas.removeEventListener("touchmove",   this.touchHandler);
    this.runner.renderer.canvas.removeEventListener("touchend",    this.touchHandler);
    this.runner.renderer.canvas.removeEventListener("touchcancel", this.touchHandler);
    */
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
	return new vec2(event.clientX - rect.left, event.clientY - rect.top);
}

Interaction.prototype.scrollView = function(dx, dy) {
    this.runner.camera.origin = this.runner.validateCameraBounds(
        this.runner.camera.origin.x + dx,
        this.runner.camera.origin.y + dy
    );
    this.runner.dirtyBoundsToFullscreen();
	this.runner.static_outdated = true;
}

Interaction.prototype.on = function(event, callback) {
    if(!events.includes(event)) throw `Unknown event "${event}"`;
    if(this[Events][event]) {
        if(this[Events][event].find(cb => cb === callback)) return;
    } else this[Events][event] = [];
    this[Events][event].push(callback);
}

Interaction.prototype.off = function(event, callback) {
    if(!events.includes(event)) throw `Unknown event "${event}"`;
    if(!this[Events][event]) return;
    const index = this[Events][event].findIndex(cb => cb === callback);
    if(index !== -1) this[Events][event].splice(index, 1);
}


export {
    Interaction
}
