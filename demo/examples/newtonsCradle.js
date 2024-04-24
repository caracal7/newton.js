

function newtonsCradle(Newton, world, staticBody, _x, _y, number, size, length, e = 1) {
    var body;
    for (var i = 0; i < number; i++) {
        var separation = 1.9;
        var x = _x + i * (size * separation);
        var y = _y - length;
		body = new Newton.Body(Newton.Body.DYNAMIC, new Newton.vec2(x, y));
		const shape = new Newton.ShapeCircle(0, 0, size);
		shape.e = e;
		shape.u = 1;
		shape.density = 1;
		body.addShape(shape);
		body.resetMassData();
		world.addBody(body);


		var joint = new Newton.RopeJoint(staticBody, body,
			new Newton.vec2(x, _y),
			new Newton.vec2(x, y),
		);
		joint.collideConnected = false;
		world.addJoint(joint);
    }
    body.v.x = 3;
};


export default Newton => {

	const { Body, ShapeBox, RevoluteJoint, RopeJoint, vec2 } = Newton;

	function init(world, runners) {
		var staticBody = new Body(Body.STATIC);
		staticBody.addShape(new ShapeBox(0, 0.2, 20.48, 0.4));
		staticBody.resetMassData();
		world.addBody(staticBody);

		newtonsCradle(Newton, world, staticBody, -5, 10, 5, 0.3, 2);

        runner.renderer.camera.moveCameraTo(0, 7);
	}

	return {
		init: init
	};
};
