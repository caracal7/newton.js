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

function App(Newton) {

	const { Body, ShapeBox, ShapeCircle, vec2 } = Newton;

	function init(world) {
		const staticBody = new Body(Body.STATIC);
		staticBody.addShape(new ShapeBox(0, 0.2, 20.48, 0.4));
		staticBody.addShape(new ShapeBox(0, 15.16, 20.48, 0.4));
		staticBody.addShape(new ShapeBox(-10.04, 7.68, 0.4, 14.56));
		staticBody.addShape(new ShapeBox(10.04, 7.68, 0.4, 14.56));
		staticBody.resetMassData();
		world.addBody(staticBody);

		const body = new Body(Body.DYNAMIC, new vec2(0, 8));

		const shape1 = new ShapeCircle(0, 0, 0.6);
		shape1.e = 0.1;
		shape1.u = 1.0;
		shape1.density = 1;

		const shape2 = new ShapeCircle(1, -1, 0.4);
		shape2.e = 0.85;
		shape2.u = 1.1;
		shape2.density = 1;

		const shape3 = new ShapeCircle(4, 0, 0.3);
		shape3.e = 1;
		shape3.u = 1.0;
		shape3.density = 1;

		body.addShape(shape1);
		body.addShape(shape2);
		body.addShape(shape3);

		body.resetMassData();
		world.addBody(body);

	}

	function runFrame() {
	}

	return {
		init: init,
		runFrame: runFrame,
		name: 'Compound'
	};
};

export default App;
