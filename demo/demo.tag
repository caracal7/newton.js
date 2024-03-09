<!import Newton from ../dist/newton.esm.js>

<!import Car        from examples/car.js>
<!import Bounce     from examples/bounce.js>
<!import Circles    from examples/circles.js>
<!import Crank      from examples/crank.js>
<!import Pyramid    from examples/pyramid.js>
<!import RagDoll    from examples/ragdoll.js>
<!import Rope       from examples/rope.js>
<!import Web        from examples/web.js>
<!import SeeSaw     from examples/seesaw.js>

<canvas/>

<!class>
    connected() {
        const { Runner, CanvasRenderer, Interaction } = Newton;
        const app       = SeeSaw(Newton);
        const renderer  = new CanvasRenderer(this.$("canvas"));
        const runner    = new Runner(renderer, app);
        const pointer   = new Interaction(runner);
    }

<!style>
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    *, :host {
        box-sizing: border-box;
    }

    canvas {
        border: 1px solid green;
        width: 100%;
        height: 100%;
    }
