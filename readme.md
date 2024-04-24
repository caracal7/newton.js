# newton.js

Lightweight 2D rigid body physics engine based on [physicsRus](https://github.com/juhl/physicsRus/) by Lee Ju Hyung

## Features
--------------

- Iterative impulse based solver
- Constraints/Joints
- SAT collision detection
- Supported shapes are circle, segment(thick rounded line segment), convex polygons
- Build-in WebGL/SVG/Canvas renderer based on [Two.js](https://two.js.org)
- Touch-friendly interactions manager
- ES-modules / CommonJS / IIFE


## Why?
--------------

For educational purposes 🎓

## Todo
--------------

- Broad phase collision detection
- CCD (Continuous Collision Detection)
- World editor



## Browser (IIFE)

```javascript

<!DOCTYPE html>
<html>
<head>
    <script src="newton.js"></script>
</head>
<body>
    <main style="width:800px;height:600px;"></main>

    <script>
        const { Body, ShapeBox, ShapeCircle, vec2 } = Newton;

        const myInitWorld = world => {
    		const staticBody = new Body(Body.STATIC);
    		staticBody.addShape(new ShapeBox(0, 0.2, 20.48, 0.4));
    		staticBody.addShape(new ShapeBox(0, 15.16, 20.48, 0.4));
    		staticBody.addShape(new ShapeBox(-10.04, 7.68, 0.4, 14.56));
    		staticBody.addShape(new ShapeBox(10.04, 7.68, 0.4, 14.56));
    		staticBody.resetMassData();
    		world.addBody(staticBody);

    		for (var i = 0; i <= 10; i++)  {
    			const body = new Body(Body.DYNAMIC, new vec2(-6 + i * 1.2, 8));
    			const shape = new ShapeCircle(0, 0, 0.4);
    			shape.e = i / 10;
    			shape.u = 1.0;
    			shape.density = 1;
    			body.addShape(shape);
    			body.resetMassData();
    			world.addBody(body);
    		}
    	};

        const { TwoRenderer, Runner, Interaction } = Newton;
        const renderer      = new TwoRenderer(Newton, document.querySelector('main'));
        const runner        = new Runner(renderer, {
            init: myInitWorld
        });
        const interaction   = new Interaction(runner);

        runner.renderer.camera.moveCameraTo(0, 7);
    </script>
</body>
</html>


```
## Browser (ES modules)

```javascript

import Newton from './newton.esm.js';

//...

```


## Node.js

### Installation

```
npm i newton.js
```


## License
--------------

(The MIT License)

Copyright (c) 2024 Dmitrii Vasilev
