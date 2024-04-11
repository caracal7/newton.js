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
import Camera from './Camera.js';

var ARROW_TYPE_NONE = 0;
var ARROW_TYPE_NORMAL = 1;
var ARROW_TYPE_CIRCLE = 2
var ARROW_TYPE_BOX = 3;

function TwoRenderer(Newton, canvas) {
	this.Newton = Newton;
    this.canvas = canvas;
	Two.Camera = Camera;
	this.Two = Two;
	this.two = new Two({
	//	type: Two.Types.canvas,
	//	type: Two.Types.webgl,
		type: Two.Types.svg,
		//fullscreen: true,
		autostart: true
	}).appendTo(canvas);


	this.stage = new Two.Group();
	this.two.add(this.stage);
	this.joints_group = new Two.Group();
	this.stage.add(this.joints_group);

/*
//	var rect = this.two.makeRectangle(-5, 2, 10, 10);
	var rect = this.two.makeRectangle(-4.4, +2, 12, 6);
	rect.stroke = '#aaaaaa';
	rect.fill ='none'
	rect.linewidth = 0.2;
	this.stage.add(rect);
*/


	this.camera = new Two.Camera(this.stage, this.two.renderer.domElement, this);
	this.camera.setScaleLimits(10, 500);


	this.resize();
	this.camera.translateSurface(this.width / 2, this.height / 2);
	this.camera.zoomSet(35, this.width / 2, this.height / 2);


//	this.camera.moveCameraTo(-4.4, 3);
/*
	this.camera.setWorldLimits({
		mins: {
			x: -6 -1,
			y: -3 +2
		},
		maxs: {
			x: 6 -1,
			y: 3 +2
		}
	}, false, 4);
*/


};

TwoRenderer.prototype.resize = function() {
	var dx = this.canvas.offsetWidth  - (this.width  || this.canvas.offsetWidth);
	var dy = this.canvas.offsetHeight - (this.height || this.canvas.offsetHeight);
	this.width  = this.canvas.offsetWidth;
	this.height = this.canvas.offsetHeight;
	this.two.renderer.setSize(this.width, this.height);
	this.camera.translateSurface(dx / 2, dy / 2);
	this.camera.updateScaleLimits();
}



TwoRenderer.prototype.jointsVisible = function(visible) {
	this.joints_group.visible = visible;
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
	shape.render_entity = circle;
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
	shape.render_entity = poly;
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
	shape.render_entity = rect;
}


TwoRenderer.prototype.addBody = function(body) {
	body.render_group = this.two.makeGroup();
	body.render_group.position.set(body.p.x, body.p.y);
	body.render_group.rotation = body.a;
	this.stage.add(body.render_group);

	for (var k = 0; k < body.shapeArr.length; k++) {
		var shape = body.shapeArr[k];
		if(shape.createRenderEntity) {
			shape.createRenderEntity(body.render_group, shape, body);
			continue;
		}
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
}

TwoRenderer.prototype.removeBody = function(body) {
	body.render_group.remove();
}

TwoRenderer.prototype.updateBody = function(body) {
	body.render_group.position.set(body.p.x, body.p.y);
	body.render_group.rotation = body.a;
}

/*
Joint.TYPE_ANGLE = 0; ?????
*/

TwoRenderer.prototype.addJoint = function(joint) {
	joint.render_group = this.two.makeGroup();

	if(joint.type === joint.TYPE_DISTANCE || joint.type === joint.TYPE_ROPE || joint.type === joint.TYPE_PRISMATIC || joint.type === joint.TYPE_MOUSE) {
		var p1 = joint.getWorldAnchor1();
		var p2 = joint.getWorldAnchor2();
		var line = this.two.makeLine(p1.x, p1.y, p2.x, p2.y);
		if(joint.type === joint.TYPE_PRISMATIC) {
			line.linewidth = 0.02;
			line.stroke = "rgba(255, 0, 0, 1)";
			line.dashes = [0.5, 0.1];
		} else if(joint.type === joint.TYPE_MOUSE) {
			line.linewidth = 0.02;
			line.stroke = "rgba(255, 0, 0, 1)";
			line.dashes = [0.05, 0.05];
		} else if(joint.type === joint.TYPE_DISTANCE) {
			line.linewidth = 0.05;
			line.stroke = "rgba(0, 155, 255, 0.7)";
			line.dashes = [0.1, 0.1];
		} else {
			line.linewidth = 0.05;
			line.stroke = "rgba(0, 255, 0, 0.5)";
		}
		const circle1 = this.two.makeCircle(p1.x, p1.y, 0.08);
		circle1.fill = 'red';
		circle1.linewidth = 0;
		const circle2 = this.two.makeCircle(p2.x, p2.y, 0.08);
		circle2.fill = 'red';
		circle2.linewidth = 0;
		joint.render_group.add(line, circle1, circle2);
	}
	else if(joint.type === joint.TYPE_REVOLUTE) {
		var p1 = joint.getWorldAnchor1();
		const circle = this.two.makeCircle(p1.x, p1.y, 0.08);
		circle.stroke = 'green';
		circle.linewidth = 0.05;
		joint.render_group.add(circle);
	} else if(joint.type === joint.TYPE_WELD) {
		var p1 = joint.getWorldAnchor1();
		const circle = this.two.makeCircle(p1.x, p1.y, 0.05);
		circle.stroke = 'blue';
		circle.linewidth = 0.02;
		joint.render_group.add(circle);
	} else if(joint.type === joint.TYPE_WHEEL) {
		var p1 = joint.getWorldAnchor1();
		var p2 = joint.getWorldAnchor2();
		const circle = this.two.makeCircle(p2.x, p2.y, 0.08);
		circle.fill = 'red';
		circle.linewidth = 0;
		var line = this.two.makeLine(p1.x, p1.y, p2.x, p2.y);
		line.linewidth = 0.05;
		line.stroke = "rgba(0, 0, 0, 1)";
		joint.render_group.add(circle, line);
	} else {
		console.log(joint)
	}

	this.joints_group.add(joint.render_group);
	this.stage.add(this.joints_group);
}

TwoRenderer.prototype.removeJoint = function(joint) {
	joint.render_group.remove();
}

TwoRenderer.prototype.updateJoint = function(joint) {
	if(joint.type === joint.TYPE_DISTANCE || joint.type === joint.TYPE_ROPE || joint.type === joint.TYPE_PRISMATIC || joint.type === joint.TYPE_MOUSE) {
		var p1 = joint.getWorldAnchor1();
		var p2 = joint.getWorldAnchor2();
		var [a, b] = joint.render_group.children[0].vertices;
		var [circle1, circle2] = [joint.render_group.children[1], joint.render_group.children[2]];
		a.x = p1.x;
		a.y = p1.y;
		b.x = p2.x;
		b.y = p2.y;
		circle1.position.set(p1.x, p1.y);
		circle2.position.set(p2.x, p2.y);
	}
	else if(joint.type === joint.TYPE_REVOLUTE || joint.type === joint.TYPE_WELD) {
		var p1 = joint.getWorldAnchor1();
		joint.render_group.children[0].position.set(p1.x, p1.y);
	}
	else if(joint.type === joint.TYPE_WHEEL) {
		var p1 = joint.getWorldAnchor1();
		var p2 = joint.getWorldAnchor2();
		var circle = joint.render_group.children[0];
		circle.position.set(p2.x, p2.y);
		var [a, b] = joint.render_group.children[1].vertices;
		a.x = p1.x;
		a.y = p1.y;
		b.x = p2.x;
		b.y = p2.y;
	}
}




export {
	TwoRenderer,
	ARROW_TYPE_NONE,
	ARROW_TYPE_NORMAL,
	ARROW_TYPE_CIRCLE,
	ARROW_TYPE_BOX
}
