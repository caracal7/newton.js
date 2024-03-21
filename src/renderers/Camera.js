import Two from './two.min.js';

class Surface {
    constructor(object) {
        this.object = object;
    }

    limits(min, max) {
        const min_exists = typeof min !== 'undefined';
        const max_exists = typeof max !== 'undefined';
        if (!max_exists && !min_exists) return { min: this.min, max: this.max };
        this.min = min_exists ? min : this.min;
        this.max = max_exists ? max : this.max;
        return this;
    }

    apply(px, py, s) {
        this.object.translation.set(px, py);
        this.object.scale = new Two.Vector(s, -s);
        return this;
    }
}

/**
* @name Two.Camera
* @class
* @param {Two.Group} group - The scene or group to
* @param {HTMLElement} [domElement=document.body] - The HTML Element to attach event listeners to.
*/
class Camera {

    constructor(group, domElement, renderer) {
        this.renderer = renderer;

        this.limits = {
            scale: Camera.Limit.clone(),
            x: Camera.Limit.clone(),
            y: Camera.Limit.clone()
        };

        this.viewport = domElement;
        this.viewportOffset = {
            top: 0,
            left: 0,
            matrix: new Two.Matrix()
        };

        this.surfaceMatrix = new Two.Matrix();

        this.surfaces = [];
        this.reset();
        this.updateSurface();
        this.add(new Surface(group));
    }

    static Surface = Surface;

    static Clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    static Limit = {
        min: -Infinity,
        max: Infinity,
        clone: function() {
            const result = {};
            for (let k in this) result[k] = this[k];
            return result;
        }
    }

    static TranslateMatrix(m, x, y) {
        m.elements[2] += x;
        m.elements[5] += y;
        return m;
    }

    static PositionToScale(pos) {
        return Math.exp(pos);
    }

    static ScaleToPosition(scale) {
        return Math.log(scale);
    }

    add(surface) {
        this.surfaces.push(surface);
        const limits = surface.limits();
        this.addLimits(limits.min, limits.max);
        return this;
    }

    addLimits(min, max) {
        if (typeof min !== 'undefined') {
            if (this.limits.scale.min) {
                this.limits.scale.min = Math.max(min, this.limits.scale.min);
            } else {
                this.limits.scale.min = min;
            }
        }

        if (typeof max === 'undefined') return this;

        if (this.limits.scale.max) {
            this.limits.scale.max = Math.min(max, this.limits.scale.max);
        } else {
            this.limits.scale.max = max;
        }
        return this;
    }

    clientToSurface(a, b, c) {
        this.updateOffset();
        const m = this.surfaceMatrix.inverse();
        let x, y, z;
        if (arguments.length === 1) {
            x = typeof a.x === 'number' ? a.x : 0;
            y = typeof a.y === 'number' ? a.y : 0;
            z = typeof a.z === 'number' ? a.z : 1;
        } else {
            x = typeof a === 'number' ? a : 0;
            y = typeof b === 'number' ? b : 0;
            z = typeof c === 'number' ? c : 1;
        }
        const n = this.viewportOffset.matrix.inverse().multiply(x, y, z);
        const r = m.multiply(n[0], n[1], n[2]);
        return { x: r[0], y: r[1], z: r[2] };
    }

    surfaceToClient(a, b, c) {
        this.updateOffset();
        const vo = this.viewportOffset.matrix.clone();
        let x, y, z;
        if (arguments.length === 1) {
          x = typeof a.x === 'number' ? a.x : 0;
          y = typeof a.y === 'number' ? a.y : 0;
          z = typeof a.z === 'number' ? a.z : 1;
        } else {
          x = typeof a === 'number' ? a : 0;
          y = typeof b === 'number' ? b : 0;
          z = typeof c === 'number' ? c : 1;
        }
        const sm = this.surfaceMatrix.multiply(x, y, z);
        const r = vo.multiply(sm[0], sm[1], sm[2]);
        return { x: r[0], y: r[1], z: r[2] };
    }

    zoomBy(byF, clientX = 0, clientY = 0) {
        const s = Camera.PositionToScale(this.zoom + byF);
        this.zoomSet(s, clientX, clientY);
        return this;
    }

    zoomSet(zoom, clientX = 0, clientY = 0) {
        const newScale = this.fitScaleToLimits(zoom);
        this.zoom = Camera.ScaleToPosition(newScale);

        if (newScale === this.scale) return this;

        const sf = this.clientToSurface(clientX, clientY);
        const scaleBy = newScale / this.scale;

        this.surfaceMatrix.scale(scaleBy);
        this.scale = newScale;

        const c = this.surfaceToClient(sf);

        const dx = clientX - c.x;
        const dy = clientY - c.y;
        this.translateSurface(dx, dy);
        return this;
    }


    translateSurface(x, y) {
        Camera.TranslateMatrix(this.surfaceMatrix, x, y);
        this.updateSurface();
        return this;
    }

    fitScaleToLimits(scale) {
        return Camera.Clamp(scale, this.limits.scale.min, this.limits.scale.max);
    }

    moveCameraTo(x, y) {
    	const c = this.surfaceToClient(x, -y);
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

    updateOffset() {
/*
        this.viewportOffset.matrix
            .identity()
            .translate(0, 0);
*/
        const rect = this.viewport.getBoundingClientRect();
        this.viewportOffset.left = 0//rect.left;
        this.viewportOffset.top  = 0// rect.top;
        this.viewportOffset.matrix
            .identity()
            //.translate(this.viewportOffset.left, this.viewportOffset.top);

        return this;
    }

    updateSurface() {
        const e = this.surfaceMatrix.elements;
        for (let i = 0; i < this.surfaces.length; i++)
            this.surfaces[i].apply(e[2], e[5], e[0]);
        return this;
    }

    reset() {
        this.zoom = 0;
        this.scale = 1.0;
        this.surfaceMatrix.identity();
        return this;
    }


}

export default Camera;
