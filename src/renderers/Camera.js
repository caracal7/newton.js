import Two from './two.min.js';


class Camera {

    constructor(group, domElement, renderer) {
        this.renderer = renderer;

        this.limits = {
            minScale: -Infinity,
            maxScale: Infinity,
            minX: -Infinity,
            maxX: Infinity,
            minY: -Infinity,
            maxY: Infinity,
        };

        this.viewport = domElement;
        this.viewportMatrix = new Two.Matrix();
        this.surfaceMatrix  = new Two.Matrix();

        this.scale = 1.0;
        this.surface = group;
    }

    setScaleLimits(min, max) {
        this.limits.minScale = min;
        this.limits.maxScale = max;
    }

    setWorldLimits(bounds, max = false, scaleFactor = 4) {
        this.limits.minX = bounds.mins.x;
        this.limits.maxX = bounds.maxs.x;
        this.limits.minY = bounds.mins.y;
        this.limits.maxY = bounds.maxs.y;
        var scaleBounds = {
            x: this.renderer.width  / (bounds.maxs.x - bounds.mins.x),
            y: this.renderer.height / (bounds.maxs.y - bounds.mins.y)
        };
        this.limits.minScale = Math[max ? 'max' : 'min'](scaleBounds.x, scaleBounds.y);
        this.limits.maxScale = this.limits.minScale * scaleFactor;
        var scale = this.fitScaleToLimits(this.scale);
        if(scale !== this.scale) this.zoomSet(scale);
        this.translateSurface(0, 0);
    }


    fitCameraToBounds(bounds, max = false) {
        var scale = {
            x: this.renderer.width  / (bounds.maxs.x - bounds.mins.x),
            y: this.renderer.height / (bounds.maxs.y - bounds.mins.y)
        };
        this.zoomSet(Math[max ? 'max' : 'min'](scale.x, scale.y));
        this.moveCameraTo((bounds.maxs.x + bounds.mins.x) * 0.5, (bounds.maxs.y + bounds.mins.y) * 0.5);
    }

    validateCameraBounds(x, y) {
        var pos = this.screenToWorld(x, y);



        const world_min = this.screenToWorld(0, 0);
        const world_max = this.screenToWorld(this.renderer.width, this.renderer.height);

        console.log(world_min, world_max, this.limits, pos)

        //const world_pos = camera.screenToWorld(event.offsetX, event.offsetY);
        //const world_pos_vec = new vec2(world_pos.x, -world_pos.y);
        //const c = this.worldToScreen(x, -y);
    	//this.translateSurface(this.renderer.width * 0.5 - c.x, this.renderer.height * 0.5 - c.y);


        var minX = world_min.x < this.limits.minX;
        var maxX = world_max.x > this.limits.maxX;
        var minY = world_min.y < this.limits.minY;
        var maxY = world_max.y > this.limits.maxY;

        //console.log(maxX, pos.x, world_max.x, world_min.x, this.limits.maxX)

        //if(minX && maxX) console.warn('minX && maxX')

        if(minX) pos.x = this.limits.maxX + world_min.x;
        if(maxX) pos.x = this.limits.minX + world_max.x;
        if(minY) pos.y = this.limits.maxY + world_min.y;
        if(maxY) pos.y = this.limits.minY + world_max.y;

//        if(minX && maxX) {
            pos.x = (this.limits.maxX - this.limits.minX) * 0.5 + (world_max.x - world_min.x) * 0.5;
        //    pos.x = (this.limits.minX + world_max.x + this.limits.maxX + world_min.x) * 0.5;
//        } else {

//        }
    //    if(minY && maxY) {
            pos.y = (this.limits.maxY - this.limits.minY) * 0.5 + (world_max.y - world_min.y) * 0.5;
        //    pos.y = ((this.limits.maxY - this.limits.minY) + (world_max.y - world_min.y)) * 0.5;
    //    } else {

    //    }

        return this.worldToScreen(pos.x, pos.y);



        var scale = this.scale;
        var wx  = x / scale;
        var wy  = y / scale;

        var minX = (wx - this.limits.minX) * scale < rw2;
        var maxX = (this.limits.maxX - wx) * scale < rw2;
        var minY = (wy - this.limits.minY) * scale < rh2;
        var maxY = (this.limits.maxY - wy) * scale < rh2;

        if(minX && maxX) pos.x = (this.limits.maxX + this.limits.minX) * 0.5 * scale;
        else {
            if(minX) pos.x = this.limits.minX * scale + rw2;
            if(maxX) pos.x = this.limits.maxX * scale - rw2;
        }
        if(minY && maxY) pos.y = (this.limits.maxY + this.limits.minY) * 0.5 * scale;
        else {
            if(minY) pos.y = this.limits.minY * scale + rh2;
            if(maxY) pos.y = this.limits.maxY * scale - rh2;
        }
        return pos;






        return pos;
    }


    screenToWorld(x, y) {
        const n = this.viewportMatrix.inverse().multiply(x, y, 1);
        const r = this.surfaceMatrix.inverse().multiply(n[0], n[1], n[2]);
        return { x: r[0], y: r[1], z: r[2] };
    }

    worldToScreen(x, y) {
        const s = this.surfaceMatrix.multiply(x, y, 1);
        const r = this.viewportMatrix.multiply(s[0], s[1], s[2]);
        return { x: r[0], y: r[1], z: r[2] };
    }

    fitScaleToLimits(scale) {
        return Math.min(Math.max(scale, this.limits.minScale), this.limits.maxScale);
    }

    zoomBy(byF, clientX = 0, clientY = 0) {
        this.zoomSet(Math.exp(Math.log(this.scale) + byF), clientX, clientY);
    }

    zoomSet(zoom, clientX = 0, clientY = 0) {
        const scale = this.fitScaleToLimits(zoom);
        if (scale === this.scale) return this;
        const world_pos = this.screenToWorld(clientX, clientY);
        this.surfaceMatrix.scale(scale / this.scale);
        this.scale = scale;
        const c = this.worldToScreen(world_pos.x, world_pos.y);
        const dx = clientX - c.x;
        const dy = clientY - c.y;
        this.translateSurface(dx, dy);
    }

    translateSurface(dx, dy) {
        var { x, y } = this.validateCameraBounds(this.surfaceMatrix.elements[2] + dx, this.surfaceMatrix.elements[5] + dy);
        this.surfaceMatrix.elements[2] = x;
        this.surfaceMatrix.elements[5] = y;
        this.updateSurface();
    }

    updateSurface() {
        const e = this.surfaceMatrix.elements;
        this.surface.translation.set(e[2], e[5]);
        this.surface.scale = new Two.Vector(e[0], -e[0]);
    }

    moveCameraTo(x, y) {
    	const c = this.worldToScreen(x, -y);
    	this.translateSurface(this.renderer.width * 0.5 - c.x, this.renderer.height * 0.5 - c.y);
    }

}

export default Camera;
