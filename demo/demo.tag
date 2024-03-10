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

<!tag @controls controls>
<!css demo.css>

<header>
    <label for="scene">Scene: </label>
    <select id="scene" @input=cangeDemo>
        <option loop(Object.keys(state.demos) as demo | d => d) value=demo text(demo)/>
    </select>
    <@controls id="controls" runner=state.runner/>
</header>

<canvas/>

<!state>
    demos: {}

<!class>
    cangeDemo(event) {
        this.state.runner.app = this.state.demos[event.target.value](Newton);
        this.$('#controls').render();
    }

    connected() {
        const { Runner, CanvasRenderer, Interaction } = Newton;

        const firstApp = Car(Newton);
        const renderer = new CanvasRenderer(this.$('canvas'));
        const runner   = new Runner(renderer, firstApp);
        new Interaction(runner);

        this.state.demos = { Car, Bounce, Circles, Crank, Pyramid, RagDoll, Rope, Web, SeeSaw };
        this.state.runner = runner;
        this.render();
    }
