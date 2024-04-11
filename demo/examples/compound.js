
export default Newton => {

	const { Body, ShapeBox, ShapeCircle, vec2 } = Newton;

	function init(world, runner) {
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

		runner.renderer.camera.moveCameraTo(0, 7);
	}

	return {
		init: init
	};
};
