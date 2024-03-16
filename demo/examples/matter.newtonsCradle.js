

function newtonsCradle(Newton, world, staticBody, xx, yy, number, size, length, e = 1) {
    for (var i = 0; i < number; i++) {
        var separation = 1.9;
		const body = new Newton.Body(Newton.Body.DYNAMIC, new Newton.vec2(
			xx + i * (size * separation),
			yy - length
		));
		const shape = new Newton.ShapeCircle(0, 0, size);
		shape.e = e;
		shape.u = 1;
		shape.density = 1;
		body.addShape(shape);
		body.resetMassData();
		world.addBody(body);

		var joint = new Newton.RopeJoint(staticBody, body,
			new Newton.vec2(xx + i * (size * separation), yy),
			new Newton.vec2(xx + i * (size * separation), yy - length),
		);
		joint.collideConnected = false;
		world.addJoint(joint);

    }
    return newtonsCradle;
};


export default Newton => {

	const { Body, ShapeBox, RevoluteJoint, RopeJoint, vec2 } = Newton;

	function init(world) {
		var staticBody = new Body(Body.STATIC);
		staticBody.addShape(new ShapeBox(0, 0.2, 20.48, 0.4));
		staticBody.resetMassData();
		world.addBody(staticBody);

		newtonsCradle(Newton, world, staticBody, -5, 10, 5, 0.3, 2);
		newtonsCradle(Newton, world, staticBody, 0, 10, 8, 0.5, 5,  0.8);

	}

	return {
		init: init,
		camera: {
		//	scale: 0.01,
			minScale: 0.01,
			origin: new vec2(0, 400)
		}
	};
};
