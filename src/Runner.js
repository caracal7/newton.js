
import { collision }    from "./utils/collision.js";
import { World }        from "./World.js";
import { Body }         from "./Body.js";
import { Shape }        from "./shapes/shape.js";
import { stats }        from "./utils/stats.js";
import { MouseJoint }   from "./joints/joint_mouse.js";
import { Bounds, pixel2meter, meter2pixel, vec2, Clamp } from './utils/math.js';


/*
const HELPER_JOINT_ANCHOR_RADIUS = pixel2meter(2.5);
const PIXEL_UNIT = pixel2meter(1);


const randomColor = ["#BEB", "#48B", "#CAA", "#8D5", "#6BE", "#98D", "#E78", "#7BC", "#E9E", "#BCD", "#EB6", "#EE7"]; // Random colors for drawing bodies

function bodyColor(body) {
    if (!body.isDynamic())  return "#777";
    if (!body.isAwake())    return "#999";
    return randomColor[(body.id) % randomColor.length];
}*/

//  Private variables
const App       = Symbol("app");
const Pause     = Symbol("pause");
const Events    = Symbol("events");

const events    = ['beforeRenderBody', 'beforeRenderShape', 'beforeRenderFrame', 'afterRenderFrame'];

const definePrivate = (obj, name, symbol, set) =>  Object.defineProperty(obj, name, { get() { return this[symbol] }, set });

function Runner(renderer, app) {
    this.renderer = renderer;
    this[App] = app;
    this[Events] = {};

//    this.PIXEL_UNIT = PIXEL_UNIT;

    this.settings = Object.assign({
        gravity: new vec2(0, -10),
    	frameRateHz: 60,
    	velocityIterations: 8,
    	positionIterations: 4,
    	warmStarting: true,
    	allowSleep: true,
    //	enableDirtyBounds: true,
        backgroundColor: "rgb(95, 105, 118)",
    	jointAnchorColor: "#11cf00",
    }, app.settings || {});

    const camera = this.camera = Object.assign({
/*        origin: new vec2(0, 0),
        scale: 1,
        minScale: 0.1,
        maxScale: 10,
        minX: -Infinity,
        maxX: Infinity,
        minY: -Infinity,
        maxY: Infinity,
        fit: true,
        bounds: new Bounds,
        scroll: new vec2(0, 0),
        worldOrigin: {}*/
    }, app.camera || {});

    const settings = {
    	showJoints: true,
    }

    Object.defineProperty(this.settings, 'showJoints', {
        get() { return settings.showJoints },
        set(value) {
            renderer.joints_group.visible = settings.showJoints = value;
        }
    });


    //Object.defineProperty(this.camera.worldOrigin, 'x', { get() { return camera.origin.x / camera.scale / meter2pixel(1) } });
    //Object.defineProperty(this.camera.worldOrigin, 'y', { get() { return camera.origin.y / camera.scale / meter2pixel(1) } });

    //this.dirtyBounds = new Bounds; // dirty bounds in world space

    collision.init();
    this.world = new World(renderer);

    this.resetScene();

    definePrivate(this, 'app', App, value => {
        this[App] = value;
        //console.info(value)
        this.settings = Object.assign(this.settings, value.settings || {});
        this.camera = Object.assign(this.camera, value.camera || {});
        this.resetScene();
        this[Pause] && this.start();
    })
    definePrivate(this, 'pause', Pause, value => {
        if(!value) this.start();
        else this[Pause] = true;
    })

    this.onResize = () => {
        this.renderer.resize();
        //this.dirtyBoundsToFullscreen();
        //this.static_outdated = true;
        if(this[Pause]) this.drawFrame(0);
    }

    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.onResize);
    this.onResize();

    this.start();
}

Runner.prototype.start = function() {
    this[Pause] = false;
    const update = () => {
        this.runFrame();
        this[Pause] || window.requestAnimationFrame(update);
    }
    window.requestAnimationFrame(update);
}

Runner.prototype.destroy = function() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
    this[Pause] = true;
    this.world.clear();
}

Runner.prototype.resetScene = function() {
    this.world.clear();
    this.world.gravity.copy(this.settings.gravity);
    this[App].init(this.world, this);
    this.initFrame();
}

Runner.prototype.initFrame = function() {
    this.time = {
        fps:            0,
        fps_frameCount: 0,
        fps_time:       0,
        frameCount:     0,
        lastTime:       Date.now(),
        timeDelta:      0
    }
//    this.dirtyBoundsToFullscreen();
//    this.static_outdated = true;
}

Runner.prototype.runFrame = function() {
    var time = Date.now();
    var frameTime = (time - this.time.lastTime) / 1000;
    frameTime = Math.floor(frameTime * 60 + 0.5) / 60;
    this.time.lastTime = time;

    var h = 1 / this.settings.frameRateHz;

    this.time.timeDelta += frameTime;

    if(this[Pause]) this.time.timeDelta = h;

    stats.timeStep = 0;
    stats.stepCount = 0;

    for (var maxSteps = 4; maxSteps > 0 && this.time.timeDelta >= h; maxSteps--) {
        var t0 = Date.now();
        this.world.step(h, this.settings.velocityIterations, this.settings.positionIterations, this.settings.warmStarting, this.settings.allowSleep);
        stats.timeStep += Date.now() - t0;
        stats.stepCount++;
        this.time.timeDelta -= h;
    }

    if (this.time.timeDelta > h) this.time.timeDelta = 0;


    this[App].runFrame && this[App].runFrame();

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

Runner.prototype.redraw = function() {
//    this.dirtyBoundsToFullscreen();
//	this.static_outdated = true;
    this.drawFrame(0);
}

Runner.prototype.drawFrame = function(frameTime = 0) {

    this[Events]?.beforeRenderFrame?.forEach(callback => callback(frameTime));


    for (var i = 0; i < this.world.bodyArr.length; i++) {
        var body = this.world.bodyArr[i]
        this[Events]?.beforeRenderBody?.forEach(callback => callback(body));
        this.renderer.updateBody(body);
    }

    for (var i = 0; i < this.world.jointArr.length; i++) {
        this.renderer?.updateJoint(this.world.jointArr[i]);
    }

    this[Events]?.afterRenderFrame?.forEach(callback => callback(frameTime));

/*
	// camera.bounds for culling
	this.camera.bounds.set(
        this.canvasToWorld(new vec2(0, this.renderer.height)),
        this.canvasToWorld(new vec2(this.renderer.width, 0))
    );

	// Check the visibility of shapes for all bodies
	for (var i = 0; i < this.world.bodyArr.length; i++) {
		var body = this.world.bodyArr[i];
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
*/


/*
	// Update whole background canvas if we needed
	if (this.static_outdated) {
		this.static_outdated = false;
        this.renderer.beginStatic(this.camera, this.settings.backgroundColor)

		// Draw static bodies
		for (var i = 0; i < this.world.bodyArr.length; i++) {
			var body = this.world.bodyArr[i];
			if (body.isStatic()) {
                var body_colors = {
                    outline: "#000",
                    body: bodyColor(body)
                };

                this[Events]?.beforeRenderBody?.forEach(callback => callback(body, body_colors));

                for (var k = 0; k < body.shapeArr.length; k++) {
        	        var shape = body.shapeArr[k];
        	        if (!shape.visible) continue;
                    var shape_colors = {
                        outline: body_colors.outline,
                        body: body_colors.body,
                    };
                    this[Events]?.beforeRenderShape?.forEach(callback => callback(shape, shape_colors));
                    this.renderer.drawShape(shape, true,  PIXEL_UNIT, shape_colors.outline, shape_colors.body);
        	    }
			}
		}
        this.renderer.endStatic();
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

			if (w > 0 && h > 0) this.renderer.copyBackground(x, y, w, h, x, y, w, h);
		}
	}
	else this.renderer.copyBackground(0, 0);

    this.dirtyBounds.clear();
	this.renderer.beginDynamic(this.camera);

	// Draw bodies except for static bodies
	for (var i = 0; i < this.world.bodyArr.length; i++) {
		var body = this.world.bodyArr[i];
		if (body.visible) {
			if (!body.isStatic()) {
                var body_colors = {
                    outline: "#000",
                    body: bodyColor(body)
                };

                this[Events]?.beforeRenderBody?.forEach(callback => callback(body, body_colors));

                for (var k = 0; k < body.shapeArr.length; k++) {
        	        var shape = body.shapeArr[k];
        	        if (!shape.visible) continue;
                    var shape_colors = {
                        outline: body_colors.outline,
                        body: body_colors.body,
                    };
                    this[Events]?.beforeRenderShape?.forEach(callback => callback(shape, shape_colors));
                    this.renderer.drawShape(shape, false, PIXEL_UNIT, shape_colors.outline, shape_colors.body);
    	            var expand = PIXEL_UNIT * 3;
    	            this.dirtyBounds.addBounds(Bounds.expand(shape.bounds, expand, expand));
        	    }
			}
		}
	}
*/

/*
	// Draw joints
	if (this.settings.showJoints) {
		for (var i = 0; i < this.world.jointArr.length; i++) {
            var joint = this.world.jointArr[i];
			if(joint) {
                this.renderer?.updateJoint(joint); /// !!!!!!!!!!!!!!!

                var p1 = joint.getWorldAnchor1();
            	var p2 = joint.getWorldAnchor2();
				this.renderer.drawHelperJointAnchors(p1, p2, HELPER_JOINT_ANCHOR_RADIUS, PIXEL_UNIT, this.settings.jointAnchorColor);

                var bounds = new Bounds;
                bounds.addExtents(p1, HELPER_JOINT_ANCHOR_RADIUS, HELPER_JOINT_ANCHOR_RADIUS);
                bounds.addExtents(p2, HELPER_JOINT_ANCHOR_RADIUS, HELPER_JOINT_ANCHOR_RADIUS);
                bounds.addPoint(p1);
                bounds.addPoint(p2);
                if (!joint.body1.isStatic() || !joint.body2.isStatic()) {
                    bounds.expand(PIXEL_UNIT * 2, PIXEL_UNIT * 2);
                    this.dirtyBounds.addBounds(bounds);
                }
			}
		}
	}
*/


//    this.renderer.endDynamic();
}
/*
Runner.prototype.worldToCanvas = function(p) {
    return new vec2(
        this.renderer.width  * 0.5 + (p.x * (this.camera.scale * meter2pixel(1)) - this.camera.origin.x),
        this.renderer.height * 0.5 - (p.y * (this.camera.scale * meter2pixel(1)) - this.camera.origin.y));
}

Runner.prototype.canvasToWorld = function(p) {
    return new vec2(
        (this.camera.origin.x + (p.x - this.renderer.width  * 0.5)) / (this.camera.scale * meter2pixel(1)),
        (this.camera.origin.y - (p.y - this.renderer.height * 0.5)) / (this.camera.scale * meter2pixel(1)));
}

Runner.prototype.fitCameraToBounds = function(bounds, max = false) {
    var scale = new vec2(
        this.renderer.width  / meter2pixel(1) / (bounds.maxs.x - bounds.mins.x),
        this.renderer.height / meter2pixel(1) / (bounds.maxs.y - bounds.mins.y)
    );
    this.camera.scale = Math[max ? 'max' : 'min'](scale.x, scale.y);
    this.moveCameraTo((bounds.maxs.x + bounds.mins.x) * 0.5, (bounds.maxs.y + bounds.mins.y) * 0.5);
}

Runner.prototype.fitCameraToWorld = function(max = false) {
    this.fitCameraToBounds(this.world.getBounds(), max);
}

Runner.prototype.validateCameraBounds = function(x, y) {
    var pos = new vec2(x, y);
    var rw2  = this.renderer.width * 0.5;
    var rh2  = this.renderer.height * 0.5;

    var scale = this.camera.scale * meter2pixel(1);
    var wx  = pos.x / scale;
    var wy  = pos.y / scale;

    var minX = (wx - this.camera.minX) * scale < rw2;
    var maxX = (this.camera.maxX - wx) * scale < rw2;
    var minY = (wy - this.camera.minY) * scale < rh2;
    var maxY = (this.camera.maxY - wy) * scale < rh2;

    if(minX && maxX) pos.x = (this.camera.maxX + this.camera.minX) * 0.5 * scale;
    else {
        if(minX) pos.x = this.camera.minX * scale + rw2;
        if(maxX) pos.x = this.camera.maxX * scale - rw2;
    }
    if(minY && maxY) pos.y = (this.camera.maxY + this.camera.minY) * 0.5 * scale;
    else {
        if(minY) pos.y = this.camera.minY * scale + rh2;
        if(maxY) pos.y = this.camera.maxY * scale - rh2;
    }
    return pos;
}

Runner.prototype.restrictCameraToBounds = function(bounds, max = false, scaleFactor = 4) {
    this.camera.minX = bounds.mins.x;
    this.camera.maxX = bounds.maxs.x;
    this.camera.minY = bounds.mins.y;
    this.camera.maxY = bounds.maxs.y;
    var scale_v = new vec2(
        this.renderer.width  / meter2pixel(1) / (bounds.maxs.x - bounds.mins.x),
        this.renderer.height / meter2pixel(1) / (bounds.maxs.y - bounds.mins.y)
    );
    this.camera.minScale = Math[max ? 'max' : 'min'](scale_v.x, scale_v.y);
    this.camera.maxScale = this.camera.minScale * scaleFactor;
    this.camera.scale    = Clamp(this.camera.scale, this.camera.minScale, this.camera.maxScale);
    this.camera.origin = this.validateCameraBounds(
        this.camera.origin.x,
        this.camera.origin.y
    );
    this.redraw();
}

Runner.prototype.restrictCameraToWorld = function(max = false, scaleFactor = 4) {
    this.restrictCameraToBounds(this.world.getBounds(), max, scaleFactor);
}

Runner.prototype.resetCameraRestriction = function() {
    this.camera.minX = -Infinity;
    this.camera.maxX =  Infinity;
    this.camera.minY = -Infinity;
    this.camera.minScale = 0.1;
    this.camera.maxScale = 10;
    this.redraw();
}

Runner.prototype.moveCameraTo = function(x, y) {
    this.camera.origin = this.validateCameraBounds(
        x * this.camera.scale * meter2pixel(1),
        y * this.camera.scale * meter2pixel(1)
    );
    this.redraw();
}
*/
Runner.prototype.on = function(event, callback) {
    if(!events.includes(event)) throw `Unknown event "${event}"`;
    if(this[Events][event]) {
        if(this[Events][event].find(cb => cb === callback)) return;
    } else this[Events][event] = [];
    this[Events][event].push(callback);
}

Runner.prototype.off = function(event, callback) {
    if(!events.includes(event)) throw `Unknown event "${event}"`;
    if(!this[Events][event]) return;
    const index = this[Events][event].findIndex(cb => cb === callback);
    if(index !== -1) this[Events][event].splice(index, 1);
}


export {
    Runner
}
