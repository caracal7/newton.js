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

function TwoRenderer(Newton, canvas) {
	this.Newton = Newton;
    this.canvas = canvas;
	Two.ZUI = ZUI;
	this.Two = Two;

	var two = this.two = new Two({ autostart: true }).appendTo(canvas);

	this.stage = new Two.Group();
	this.two.add(this.stage);

	this.zui = new Two.ZUI(this.stage, this.two.renderer.domElement);
	this.resize();

	this.zui.translateSurface(this.width / 2, this.height / 2);
	this.zui.zoomSet(35, this.width / 2, this.height / 2);
};

TwoRenderer.prototype.resize = function() {
	var dx = this.canvas.offsetWidth  - (this.width  || this.canvas.offsetWidth);
	var dy = this.canvas.offsetHeight - (this.height || this.canvas.offsetHeight);
	this.width  = this.canvas.offsetWidth;
	this.height = this.canvas.offsetHeight;
	this.two.renderer.setSize(this.width, this.height);
	this.zui.translateSurface(dx / 2, dy / 2);
}

TwoRenderer.prototype.createCircle = function(body_group, shape, body) {
	var pos = this.Newton.vec2.sub(shape.tc, body.p);
	const circle = this.two.makeCircle(pos.x, pos.y, shape.r);
	circle.fill = '#FF8000';
	circle.stroke = 'orangered';
	circle.linewidth = 0.05;
	const line = this.two.makeLine(pos.x, pos.y, pos.x, pos.y + shape.r);
	line.linewidth = 0.05;
	line.stroke = "rgba(255, 0, 0, 0.5)";
	body_group.add(circle, line);
}

TwoRenderer.prototype.createPolygon = function(body_group, shape, body) {
	const poly = this.two.makePath(...shape.tverts.reduce((a, v) => {
		var pos = this.Newton.vec2.sub(v, body.p);
		return a.concat([pos.x, pos.y])
	}, []));
	poly.linewidth = 0.05;
	poly.stroke = "#aaaaaa";
	poly.fill = "#ececec";
	body_group.add(poly);
}


TwoRenderer.prototype.createSegment = function(body_group, shape, body) {
	var a = this.Newton.vec2.sub(shape.ta, body.p);
	var b = this.Newton.vec2.sub(shape.tb, body.p);
	var d = shape.r * 2
	var angle = this.Newton.vec2.perp(this.Newton.vec2.sub(b, a)).toAngle() - body.a;
	const len = this.Newton.vec2.dist(b, a) + d;
	const c = this.Newton.vec2.add(b, a).scale(0.5);
	var rect = this.two.makeRoundedRectangle(c.x, c.y, d, len, shape.r);
	rect.rotation = angle;
	rect.stroke = '#aaaaaa';
	rect.fill = "#ececec";
	rect.linewidth = 0.05;
	body_group.add(rect);
}


TwoRenderer.prototype.addBody = function(body) {
	body.render_group = this.two.makeGroup();
	body.render_group.position.set(body.p.x, body.p.y);
	body.render_group.rotation = body.a;
	this.stage.add(body.render_group);

	for (var k = 0; k < body.shapeArr.length; k++) {
		var shape = body.shapeArr[k];
		switch (shape.type) {
			case this.Newton.Shape.TYPE_CIRCLE:
				this.createCircle(body.render_group, shape, body);
				break;
			case this.Newton.Shape.TYPE_SEGMENT:
				this.createSegment(body.render_group, shape, body);
				break;
			case this.Newton.Shape.TYPE_POLY:
				this.createPolygon(body.render_group, shape, body);
				break;
		}
	}
	//this.two.update();
}

TwoRenderer.prototype.removeBody = function(body) {
	body.render_group.remove();
}

TwoRenderer.prototype.updateBody = function(body) {
	body.render_group.position.set(body.p.x, body.p.y);
	body.render_group.rotation = body.a;
}

TwoRenderer.prototype.addJoint = function(joint) {

	//body.render_group.position.set(body.p.x, body.p.y);
	//body.render_group.rotation = body.a;
	var p1 = joint.getWorldAnchor1();
	var p2 = joint.getWorldAnchor2();
	var line = this.two.makeLine(p1.x, p1.y, p2.x, p2.y);
	line.linewidth = 0.05;
	line.stroke = "rgba(0, 255, 0, 0.5)";

	joint.render_group = this.two.makeGroup();
	joint.render_group.add(line);
	this.stage.add(joint.render_group);
}

TwoRenderer.prototype.removeJoint = function(joint) {
	joint.render_group.remove();
}

TwoRenderer.prototype.updateJoint = function(joint) {
	var p1 = joint.getWorldAnchor1();
	var p2 = joint.getWorldAnchor2();
	var [a, b] = joint.render_group.children[0].vertices;
	a.x = p1.x;
	a.y = p1.y;
	b.x = p2.x;
	b.y = p2.y;
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
