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

import Two from './two.min.js';
import ZUI from './ZUI.js';

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


function TwoRenderer(Newton, canvas) {
	this.Newton = Newton;
    this.canvas = canvas;
	Two.ZUI = ZUI;
	this.Two = Two;

	var two = this.two = new Two({
		autostart: true
	}).appendTo(canvas);
	this.stage = new Two.Group();
	this.two.add(this.stage);

	var rect = two.makeRectangle(two.width * 0.5, two.height * 0.5, 100, 100);
	rect.fill = 'rgb(0, 200, 255)';
	rect.opacity = 0.75;
	rect.noStroke();
	this.stage.add(rect);

	this.resize();
};

TwoRenderer.prototype.resize = function() {
	this.width  = this.canvas.offsetWidth;
	this.height = this.canvas.offsetHeight;
	this.two.renderer.setSize(this.width, this.height);
}




TwoRenderer.prototype.createCircle = function(body_group, shape) {
	const circle = this.two.makeCircle(0, 0, shape.r);
	circle.fill = '#FF8000';
	circle.stroke = 'orangered';
	circle.linewidth = 0.1;
	const line = this.two.makeLine(0, 0, 0, shape.r);
	line.linewidth = 0.1;
	line.stroke = "rgba(255, 0, 0, 0.5)";
	body_group.add(circle, line);
}

TwoRenderer.prototype.createPolygon = function(body_group, shape) {

	const poly = this.two.makePath(...shape.verts.reduce((a, v) => a.concat([v.x,v.y]), []));
	poly.linewidth = 0.1;
	//poly.translation = new Two.Vector(60, 60);
	poly.stroke = "#cccccc";
	poly.fill = "#ececec";

	body_group.add(poly);


}


TwoRenderer.prototype.addBody = function(body) {
	body.render_group = this.two.makeGroup();
	body.render_group.position.set(body.p.x, body.p.y);
	this.stage.add(body.render_group);

	for (var k = 0; k < body.shapeArr.length; k++) {
		var shape = body.shapeArr[k];
		switch (shape.type) {
			case this.Newton.Shape.TYPE_CIRCLE:
				this.createCircle(body.render_group, shape);
				break;
			case this.Newton.Shape.TYPE_SEGMENT:
				console.log('TYPE_SEGMENT');
				break;
			case this.Newton.Shape.TYPE_POLY:
				console.log('TYPE_POLY');
				this.createPolygon(body.render_group, shape);
				break;
		}
	}
	this.two.update();
}

TwoRenderer.prototype.removeBody = function(body) {
	body.render_group.remove();
}

TwoRenderer.prototype.updateBody = function(body) {
	body.render_group.position.set(body.p.x, body.p.y);
	body.render_group.rotation = body.a;
}


TwoRenderer.prototype.drawShape = function(shape, isStatic, lineWidth, outlineColor, fillColor) {
	return;
	switch (shape.type) {
		case this.Newton.Shape.TYPE_CIRCLE:
			drawCircle(isStatic ? this.bg.ctx : this.fg.ctx, shape.tc, shape.r, shape.body.a, lineWidth, outlineColor, fillColor, this.Newton);
			break;
		case this.Newton.Shape.TYPE_SEGMENT:
			drawSegment(isStatic ? this.bg.ctx : this.fg.ctx, shape.ta, shape.tb, shape.r, lineWidth, outlineColor, fillColor, this.Newton);
			break;
		case this.Newton.Shape.TYPE_POLY:
			if (shape.convexity)
			     drawPolygon(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
			else drawPolygon(isStatic ? this.bg.ctx : this.fg.ctx, shape.tverts, lineWidth, outlineColor, fillColor);
			break;
	}
}

TwoRenderer.prototype.copyBackground = function(x, y, w, h, x1, y1, w1, h1) {
	return;
	this.fg.ctx.drawImage(this.bg.canvas, x, y, w, h, x1, y1, w1, h1);
};

TwoRenderer.prototype.beginStatic = function(camera, backgroundColor) {
	return;
	this.bg.ctx.fillStyle = backgroundColor;
	this.bg.ctx.fillRect(0, 0, this.width, this.height);
	this.bg.ctx.save();
	this.bg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height * 0.5 + camera.origin.y);
}

TwoRenderer.prototype.endStatic = function() {
	return;
	this.bg.ctx.restore();
};


TwoRenderer.prototype.beginDynamic = function(camera) {
	return;
	this.fg.ctx.save();
	this.fg.ctx.setTransform(camera.scale * this.Newton.meter2pixel(1), 0, 0, -(camera.scale * this.Newton.meter2pixel(1)), this.width * 0.5 - camera.origin.x, this.height * 0.5 + camera.origin.y);
};

TwoRenderer.prototype.endDynamic = function() {
	return;
	this.fg.ctx.restore();
};



TwoRenderer.prototype.drawHelperJointAnchors = function(p1, p2, radius, lineWidth, jointAnchorColor) {
	return;
	var rvec = new this.Newton.vec2(radius, 0);
	var uvec = new this.Newton.vec2(0, radius);
	drawBox(this.fg.ctx, p1, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
	drawBox(this.fg.ctx, p2, rvec, uvec, 0, "", jointAnchorColor, this.Newton);
	drawLine(this.fg.ctx, p1, p2, lineWidth, jointAnchorColor);
}

TwoRenderer.prototype.drawLine = function(p1, p2, lineWidth, strokeStyle) {
	return;
	drawLine(this.fg.ctx, p1, p2, lineWidth, strokeStyle);
}


export {
	TwoRenderer,
	ARROW_TYPE_NONE,
	ARROW_TYPE_NORMAL,
	ARROW_TYPE_CIRCLE,
	ARROW_TYPE_BOX
}
