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

        this.zoom = 0;
        this.scale = 1.0;
        this.surface = group;
    }

    setScaleLimits(min, max) {
        this.limits.minScale = min;
        this.limits.maxScale = max;
    }

    setWorldLimits(bounds, max = false, scaleFactor = 4) {
        return;
        this.limits.minX = bounds.mins.x;
        this.limits.maxX = bounds.maxs.x;
        this.limits.minY = bounds.mins.y;
        this.limits.maxY = bounds.maxs.y;
        var scale = {
            x: this.renderer.width  / (bounds.maxs.x - bounds.mins.x),
            y: this.renderer.height / (bounds.maxs.y - bounds.mins.y)
        };

        this.limits.minScale = Math[max ? 'max' : 'min'](scale.x, scale.y);
        this.limits.maxScale = this.limits.minScale * scaleFactor;
        this.scale = this.fitScaleToLimits(this.scale);
        /*
        this.camera.origin = this.validateCameraBounds(
            this.camera.origin.x,
            this.camera.origin.y
        );*/
        this.zoomSet(this.scale);

        console.log(this.limits)
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
        var pos = { x, y };
        var rw2  = this.renderer.width * 0.5;
        var rh2  = this.renderer.height * 0.5;

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


        this.surfaceMatrix.scale(scale / this.scale);
        this.scale = scale;
        
        const world_pos = this.screenToWorld(clientX, clientY);
        const c = this.worldToScreen(world_pos.x, world_pos.y);

        const dx = clientX - c.x;
        const dy = clientY - c.y;
        this.translateSurface(dx, dy);
    }

    translateSurface(x, y) {
        this.surfaceMatrix.elements[2] += x;
        this.surfaceMatrix.elements[5] += y;
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
