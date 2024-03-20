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

import { Bounds, vec2 } from './../utils/math.js';

const Shape = function(type) {
	if (arguments.length == 0)
		return;

	if (Shape.id_counter == undefined)
		Shape.id_counter = 0;

	this.id = Shape.id_counter++;
	this.type = type;

	// Coefficient of restitution (elasticity)
	this.e = 0.0;

	// Frictional coefficient
	this.u = 1.0;

	// Mass density
	this.density = 1;

	// Axis-aligned bounding box
	this.bounds = new Bounds;
}

Shape.TYPE_CIRCLE  = 0;
Shape.TYPE_SEGMENT = 1;
Shape.TYPE_POLY    = 2;
Shape.NUM_TYPES    = 3;

Shape.prototype.translateTo = function(pos) {
	switch (this.type) {
		case Shape.TYPE_CIRCLE:
			console.warn('Shape.TYPE_CIRCLE.translateTo: TODO tests', pos)
			this.c.copy(this.body.getLocalPoint(pos));
		break;
		case Shape.TYPE_SEGMENT:
			console.warn('Shape.TYPE_SEGMENT.translateTo: TODO tests', pos)
			var delta = vec2.sub(pos, this.centroid());
			var wa = vec2.add(this.ta, delta);
			var wb = vec2.add(this.ta, delta);
			this.a.copy(this.body.getLocalPoint(wa));
			this.b.copy(this.body.getLocalPoint(wb));
		break;
		case Shape.TYPE_POLY:
			var delta = vec2.sub(pos, this.centroid());
			for (var j = 0; j < this.tverts.length; j++) {
				var wv = vec2.add(this.tverts[j], delta);
				this.verts[j].copy(this.body.getLocalPoint(wv));
			}
		break;
	}
	this.finishVerts();
	this.body.resetMassData();
	this.body.awake(true);
	this.body.cacheData();
}

Shape.prototype.translateWithDelta = function(delta) {
	switch (this.type) {
		case Shape.TYPE_CIRCLE:
			var wc = vec2.add(this.tc, delta);
			this.c.copy(this.body.getLocalPoint(wc));
		break;
		case Shape.TYPE_SEGMENT:
			var wa = vec2.add(this.ta, delta);
			var wb = vec2.add(this.ta, delta);
			this.a.copy(this.body.getLocalPoint(wa));
			this.b.copy(this.body.getLocalPoint(wb));
		break;
		case Shape.TYPE_POLY:

//vec2.rotation(this.body.a)

			//var _delta = delta.rotation(this.body.a)
			//vec2.rotate(this.body.getLocalVector(this.body.a), this.body.a);

		//	var _delta = vec2.rotate(delta, this.body.a));
			for (var j = 0; j < this.tverts.length; j++) {
				var wv = vec2.add(this.tverts[j], delta);
				this.verts[j].copy(this.body.getLocalPoint(wv));


			//	this.verts[j].copy(vec2.add(this.body.getLocalPoint(this.tverts[j]), delta););
			}
		break;
	}
	this.finishVerts();
	this.body.resetMassData();
	this.body.awake(true);
	this.body.cacheData();
}

export {
	Shape
}
