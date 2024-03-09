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

<!css demo.css>

<header>
    <span>
        <label for="scene">Scene: </label>
        <select id="scene" @input{
            this.runner.app = this.demos[event.target.value](Newton);
            this.runner.resetScene();
        }>
            <option value="Car">Car</option>
            <option value="Bounce">Bounce</option>
            <option value="Circles">Circles</option>
            <option value="Crank">Crank</option>
            <option value="Pyramid">Pyramid</option>
            <option value="RagDoll">RagDoll</option>
            <option value="Rope">Rope</option>
            <option value="Web">Web</option>
            <option value="SeeSaw">SeeSaw</option>
        </select>
    </span>
</header>

<canvas/>

<!class>
    connected() {
        this.demos = { Car, Bounce, Circles, Crank, Pyramid, RagDoll, Rope, Web, SeeSaw };

        const { Runner, CanvasRenderer, Interaction } = Newton;

        const firstApp = Car(Newton);
        const renderer = new CanvasRenderer(this.$("canvas"));
        this.runner = new Runner(renderer, firstApp);
        new Interaction(this.runner);
    }
