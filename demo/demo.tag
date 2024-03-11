<!import Newton     from ../dist/newton.esm.js>

<!import Car        from examples/car.js>
<!import Compound   from examples/compound.js>
<!import Bounce     from examples/bounce.js>
<!import Circles    from examples/circles.js>
<!import Crank      from examples/crank.js>
<!import Pyramid    from examples/pyramid.js>
<!import RagDoll    from examples/ragdoll.js>
<!import Rope       from examples/rope.js>
<!import Web        from examples/web.js>
<!import SeeSaw     from examples/seesaw.js>

<!tag @controls controls>
<!tag @editor   editor/editor>

<!css demo.css>
<!css assets/header.css>

<header if(!state.edit)>
    <label for="scene">Scene: </label>
    <select id="scene" disabled=state.edit @input=changeDemo>
        <option loop(Object.keys(state.demos) as demo | d => d) value=demo text(demo)/>
    </select>
    <@controls id="controls" runner=state.runner/>
    <button class="edit" @click=edit text("Edit")/>
</header>

<@editor if(state.edit) runner=state.runner @play/>

<canvas/>

<!state>
    edit: false,
    demos: {}

<!class>
    play() {
        this.state.runner.pause = false;
        this.state.edit = false;
        this.render();
    }
    edit() {
        this.state.runner.pause = true;
        this.state.edit = true;
        this.render();
    }

    changeDemo(event) {
        this.state.runner.app = this.state.demos[event.target.value](Newton);
        this.$('#controls').render();
    }

    connected() {
        const { Runner, CanvasRenderer, Interaction } = Newton;

        const firstApp      = Compound(Newton);
        const renderer      = new CanvasRenderer(this.$('canvas'));
        const runner        = new Runner(renderer, firstApp);
        const interaction   = new Interaction(runner);

        this.state.demos = { Car, Compound, Bounce, Circles, Crank, Pyramid, RagDoll, Rope, Web, SeeSaw };
        this.state.runner = runner;
        this.render();
    }
