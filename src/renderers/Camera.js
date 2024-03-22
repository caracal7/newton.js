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
        var d = { x, y };

        if(
            this.limits.maxX === Infinity || this.limits.minX === -Infinity ||
            this.limits.maxY === Infinity || this.limits.minY === -Infinity
        ) return { x, y }

        var pos = this.screenToWorld(this.renderer.width * 0.5 - x, this.renderer.height * 0.5 - y);


        const world_min = this.screenToWorld(0, 0);
        const world_max = this.screenToWorld(this.renderer.width, this.renderer.height);

        const wX = (world_max.x - world_min.x) * 0.5;
        const wY = (world_max.y - world_min.y) * 0.5;

        const mX = (this.limits.maxX + this.limits.minX) * 0.5;
        const mY = (this.limits.maxY - this.limits.minY) * 0.5;


        var minX = pos.x - wX < this.limits.minX;
        var minY = pos.y - wY < this.limits.minY;
        var maxX = pos.x + wX > this.limits.maxX;
        var maxY = pos.y + wY > this.limits.maxY;


        //console.log(minX, minY, maxX, maxY);
        if(minX) {
            const c = this.worldToScreen(this.limits.minX + world_max.x, 0);
            d.x = this.renderer.width * 0.5 - c.x;
        }


        if(minY && maxY) {

        //    const c = this.worldToScreen(0, mY - wY );
        //    console.log(c.y, world_min.y)
        //    d.y = (pos.y - wY + pos.y + wY) / 2;
        //    this.translateSurface(this.renderer.width * 0.5 - c.x, this.renderer.height * 0.5 - c.y);


            //console.log(maxY && minY);
        }



        return d;
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
        var { x, y } = this.validateCameraBounds(dx, dy);
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
