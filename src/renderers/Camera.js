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

    zoomBy(byF, clientX = 0, clientY = 0) {
        this.zoomSet(Math.exp(this.zoom + byF), clientX, clientY);
    }

    zoomSet(zoom, clientX = 0, clientY = 0) {
        const scale = this.fitScaleToLimits(zoom);
        this.zoom = Math.log(scale);

        if (scale === this.scale) return this;

        const world_pos = this.screenToWorld(clientX, clientY);
        const scaleBy = scale / this.scale;

        this.surfaceMatrix.scale(scaleBy);
        this.scale = scale;

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

    fitScaleToLimits(scale) {
        return Math.min(Math.max(scale, this.limits.minScale), this.limits.maxScale);
    }

    moveCameraTo(x, y) {
    	const c = this.worldToScreen(x, -y);
    	this.translateSurface(this.renderer.width * 0.5 - c.x, this.renderer.height * 0.5 - c.y);
    }

    fitCameraToBounds(bounds, max = false) {
        var scale = {
            x: this.renderer.width  / (bounds.maxs.x - bounds.mins.x),
            y: this.renderer.height / (bounds.maxs.y - bounds.mins.y)
        };
        this.zoomSet(Math[max ? 'max' : 'min'](scale.x, scale.y));
        this.moveCameraTo((bounds.maxs.x + bounds.mins.x) * 0.5, (bounds.maxs.y + bounds.mins.y) * 0.5);
    }
}

export default Camera;
