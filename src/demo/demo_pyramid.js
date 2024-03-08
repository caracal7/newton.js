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

import { Body } from './../shapes/body.js';
import { ShapeBox } from "./../shapes/shape_poly.js";
import { vec2 } from './../utils/math.js';

const DemoPyramid = function() {
	var space;
	function init(s) {
		space = s;
		var staticBody = new Body(Body.STATIC);
		staticBody.addShape(new ShapeBox(0, 0.2, 20.48, 0.4));
		staticBody.addShape(new ShapeBox(0, 15.16, 20.48, 0.4));
		staticBody.addShape(new ShapeBox(-10.04, 7.68, 0.4, 14.56));
		staticBody.addShape(new ShapeBox(10.04, 7.68, 0.4, 14.56));
		staticBody.resetMassData();
		space.addBody(staticBody);

		for (var i = 0; i < 9; i++) {
			for (var j = 0; j <= i; j++) {
				var body = new Body(Body.DYNAMIC, new vec2((j - i * 0.5) * 0.84, 10 - i * 0.84));
				var shape = new ShapeBox(0, 0, 0.72, 0.72);
				shape.e = 0.1;
				shape.u = 1.0;
				shape.density = 1;
				body.addShape(shape);
				body.resetMassData();
				space.addBody(body);
			}
		}
		/*
		body = new Body(Body.DYNAMIC, new vec2(0, 1));
		var shape = new ShapeCircle(0, 0, 0.4);
		shape.e = 0.1;
		shape.u = 1.0;
		shape.density = 2;
		body.addShape(shape);
		body.resetMassData();
		space.addBody(body);*/
	}

	function runFrame() {
	}

	function keyDown(ev) {
	}

	function name() {
		return "Pyramid";
	}

	return {
		init: init,
		runFrame: runFrame,
		keyDown: keyDown,
		name: name
	};
}();

export {
	DemoPyramid
}
