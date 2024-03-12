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



var ARROW_TYPE_NONE = 0;
var ARROW_TYPE_NORMAL = 1;
var ARROW_TYPE_CIRCLE = 2
var ARROW_TYPE_BOX = 3;

function scissorRect(ctx, x, y, width, height) {
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.closePath();
	ctx.clip();
}

function drawLine(ctx, p1, p2, lineWidth, strokeStyle) {
	ctx.beginPath();

	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);

	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}

function drawDashLine(ctx, p1, p2, lineWidth, dashSize, strokeStyle) {
	var dashSize2 = dashSize * 0.5;
	var dsq = vec2.distsq(p1, p2);

	var d = vec2.truncate(vec2.sub(p2, p1), dashSize);
	var s1 = p1;
	var s2 = vec2.add(p1, d);

	ctx.beginPath();

	while (d.lengthsq() > 0) {
		var s3 = vec2.add(s1, vec2.truncate(vec2.sub(s2, s1), dashSize2));

		ctx.moveTo(s1.x, s1.y);
		ctx.lineTo(s3.x, s3.y);

		d = vec2.truncate(vec2.sub(p2, s2), dashSize);
		s1 = s2;
		s2 = vec2.add(s2, d);
	}

	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}

function drawArrow(ctx, p1, p2, type1, type2, headSize, lineWidth, strokeStyle, fillStyle) {
	if (strokeStyle) {
		ctx.beginPath();

		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);

		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}

	ctx.beginPath();

	if (type1 != ARROW_TYPE_NONE || type2 != ARROW_TYPE_NONE) {
		if (type1 == ARROW_TYPE_NORMAL) {
			var sdir = vec2.scale(vec2.normalize(vec2.sub(p1, p2)), headSize);

			var pl = vec2.add(p1, vec2.rotate(sdir, Math.PI * 0.9));
			var pr = vec2.add(p1, vec2.rotate(sdir, -Math.PI * 0.9));

			ctx.moveTo(pl.x, pl.y);
			ctx.lineTo(p1.x, p1.y);
			ctx.lineTo(pr.x, pr.y);
			ctx.lineTo(pl.x, pl.y);
		}
		else if (type1 == ARROW_TYPE_CIRCLE) {
			ctx.moveTo(p1.x, p1.y);
			ctx.arc(p1.x, p1.y, headSize, 0, Math.PI*2, true);
		}
		else if (type1 == ARROW_TYPE_BOX) {
			var rvec = vec2.scale(vec2.normalize(vec2.sub(p1, p2)), headSize);
			var uvec = vec2.perp(rvec);

			var l = vec2.sub(p1, rvec);
			var r = vec2.add(p1, rvec);
			var lb = vec2.sub(l, uvec);
			var lt = vec2.add(l, uvec);
			var rb = vec2.sub(r, uvec);
			var rt = vec2.add(r, uvec);

			ctx.moveTo(lb.x, lb.y);
			ctx.lineTo(rb.x, rb.y);
			ctx.lineTo(rt.x, rt.y);
			ctx.lineTo(lt.x, lt.y);
			ctx.lineTo(lb.x, lb.y);
		}

		if (type2 == ARROW_TYPE_NORMAL) {
			var sdir = vec2.scale(vec2.normalize(vec2.sub(p2, p1)), headSize);

			var pl = vec2.add(p2, vec2.rotate(sdir, Math.PI * 0.9));
			var pr = vec2.add(p2, vec2.rotate(sdir, -Math.PI * 0.9));

			ctx.moveTo(pl.x, pl.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.lineTo(pr.x, pr.y);
			ctx.lineTo(pl.x, pl.y);
		}
		else if (type2 == ARROW_TYPE_CIRCLE) {
			ctx.moveTo(p2.x, p2.y);
			ctx.arc(p2.x, p2.y, headSize, 0, Math.PI*2, true);
		}
		else if (type2 == ARROW_TYPE_BOX) {
			var rvec = vec2.scale(vec2.normalize(vec2.sub(p2, p1)), headSize);
			var uvec = vec2.perp(rvec);

			var l = vec2.sub(p2, rvec);
			var r = vec2.add(p2, rvec);
			var lb = vec2.sub(l, uvec);
			var lt = vec2.add(l, uvec);
			var rb = vec2.sub(r, uvec);
			var rt = vec2.add(r, uvec);

			ctx.moveTo(lb.x, lb.y);
			ctx.lineTo(rb.x, rb.y);
			ctx.lineTo(rt.x, rt.y);
			ctx.lineTo(lt.x, lt.y);
			ctx.lineTo(lb.x, lb.y);
		}
	}

	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function drawRect(ctx, mins, maxs, lineWidth, strokeStyle, fillStyle) {
	ctx.beginPath();

	ctx.rect(mins.x, mins.y, maxs.x - mins.x, maxs.y - mins.y);

	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function drawBox(ctx, center, rvec, uvec, lineWidth, strokeStyle, fillStyle, Newton) {
	ctx.beginPath();

	var l = Newton.vec2.sub(center, rvec);
	var r = Newton.vec2.add(center, rvec);
	var lb = Newton.vec2.sub(l, uvec);
	var lt = Newton.vec2.add(l, uvec);
	var rb = Newton.vec2.sub(r, uvec);
	var rt = Newton.vec2.add(r, uvec);

	ctx.moveTo(lb.x, lb.y);
	ctx.lineTo(rb.x, rb.y);
	ctx.lineTo(rt.x, rt.y);
	ctx.lineTo(lt.x, lt.y);
	ctx.lineTo(lb.x, lb.y);

	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function drawCircle(ctx, center, radius, angle, lineWidth, strokeStyle, fillStyle, Newton) {
	ctx.beginPath();

	ctx.arc(center.x, center.y, radius, 0, Math.PI*2, false);

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		if (typeof angle == "number") {
			ctx.moveTo(center.x, center.y);
			var rt = Newton.vec2.add(center, Newton.vec2.scale(Newton.vec2.rotation(angle), radius));
			ctx.lineTo(rt.x, rt.y);
		}

		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function drawArc(ctx, center, radius, startAngle, endAngle, lineWidth, strokeStyle, fillStyle) {
	ctx.beginPath();

	ctx.moveTo(center.x, center.y);

	var p = vec2.add(center, vec2.scale(vec2.rotation(startAngle), radius));
	ctx.arc(center.x, center.y, radius, startAngle, endAngle, false);
	ctx.lineTo(center.x, center.y);

	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function drawSegment(ctx, a, b, radius, lineWidth, strokeStyle, fillStyle, Newton) {
	ctx.beginPath();

	var dn = Newton.vec2.normalize(Newton.vec2.perp(Newton.vec2.sub(b, a)));
	var start_angle = dn.toAngle();
	ctx.arc(a.x, a.y, radius, start_angle, start_angle + Math.PI, false);

	var ds = Newton.vec2.scale(dn, -radius);
	var bp = Newton.vec2.add(b, ds);
	ctx.lineTo(bp.x, bp.y);

	start_angle += Math.PI;
	ctx.arc(b.x, b.y, radius, start_angle, start_angle + Math.PI, false);

	ds = Newton.vec2.scale(dn, radius);
	var ap = Newton.vec2.add(a, ds);
	ctx.lineTo(ap.x, ap.y);

	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}

function drawPolygon(ctx, verts, lineWidth, strokeStyle, fillStyle) {
	ctx.beginPath();
	ctx.moveTo(verts[0].x, verts[0].y);

	for (var i = 0; i < verts.length; i++) {
		ctx.lineTo(verts[i].x, verts[i].y);
	}

	ctx.lineTo(verts[verts.length - 1].x, verts[verts.length - 1].y);

	ctx.closePath();

	if (fillStyle) {
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}

	if (strokeStyle) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
	}
}


function CanvasRenderer(Newton, canvas) {
	this.Newton = Newton;
    this.canvas = canvas;
	canvas.style.touchAction = 'none';
	canvas.style.webkitTransform = 'translate3d(0, 0, 0)';
	this.fg = {
        canvas,
		ctx: canvas.getContext("2d")
    };
	this.bg = {
        canvas: document.createElement("canvas")
    };
    this.bg.ctx = this.bg.canvas.getContext("2d");
	this.resize();
};

CanvasRenderer.prototype.drawShape = function(shape, isStatic, lineWidth, outlineColor, fillColor) {
	switch (shape.type) {
		case this.Newton.Shape.TYPE_CIRCLE:
			drawCircle(isStatic ? this.bg.ctx : this.fg.ctx, shape.tc, shape.r, shape.body.a, lineWidth, outlineColor, fillColor, this.Newton);
			break;
		case this.Newton.Shape.TYPE_SEGMENT:
			drawSegment(isStatic ? this.bg.ctx : this.fg.ctx, shape.ta, shape.tb, shape.r, lineWidth, outlineColor, fillColor, this.Newton);
			break;
		case this.Newton.Shape.TYPE_POLY:
			if (shape.convexity) drawPolygon(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
			else drawPolygon(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
			break;
	}
}

CanvasRenderer.prototype.copyBackground = function(x, y, w, h, x1, y1, w1, h1) {
	this.fg.ctx.drawImage(this.bg.canvas, x, y, w, h, x1, y1, w1, h1);
};

CanvasRenderer.prototype.beginStatic = function(camera, backgroundColor) {
	this.bg.ctx.fillStyle = backgroundColor;
	this.bg.ctx.fillRect(0, 0, this.width, this.height);
	this.bg.ctx.save();
	this.bg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height + camera.origin.y);
}

CanvasRenderer.prototype.endStatic = function() {
	this.bg.ctx.restore();
};


CanvasRenderer.prototype.beginDynamic = function(camera) {
	this.fg.ctx.save();
	this.fg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height + camera.origin.y);
};

CanvasRenderer.prototype.endDynamic = function() {
	this.fg.ctx.restore();
};


CanvasRenderer.prototype.resize = function() {
	this.width  = this.fg.canvas.width  = this.bg.canvas.width  = this.canvas.width  = this.canvas.offsetWidth;
	this.height = this.fg.canvas.height = this.bg.canvas.height = this.canvas.height = this.canvas.offsetHeight;
}

CanvasRenderer.prototype.drawHelperJointAnchors = function(p1, p2, radius, lineWidth, jointAnchorColor) {
	var rvec = new this.Newton.vec2(radius, 0);
	var uvec = new this.Newton.vec2(0, radius);
	drawBox(this.fg.ctx, p1, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
	drawBox(this.fg.ctx, p2, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
	drawLine(this.fg.ctx, p1, p2, lineWidth, jointAnchorColor);
}

CanvasRenderer.prototype.drawLine = function(p1, p2, lineWidth, strokeStyle) {
	drawLine(this.fg.ctx, p1, p2, lineWidth, strokeStyle);
}


export {
	CanvasRenderer,
	ARROW_TYPE_NONE,
	ARROW_TYPE_NORMAL,
	ARROW_TYPE_CIRCLE,
	ARROW_TYPE_BOX
}
