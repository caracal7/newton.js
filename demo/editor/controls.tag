<!tag @buttons-group ../tags/buttons-group>


<@buttons-group selected='Bodies' @select{
    console.log('select', event.detail)
}>
    <button>Bodies</button>
    <button>Shapes</button>
    <button>Edges</button>
    <button>Vertices</button>
    <button>Joints</button>
</@buttons-group>



<!state>
    runner:  undefined,
    radio: 'Bodies'


<!class>


    restart() {
        this.state.runner.pause = false;
        this.state.runner.resetScene();
        this.render();
    }

    pauseResume() {
        this.state.runner.pause = !this.state.runner.pause;
        this.render();
    }

    step() {
        this.state.runner.runFrame();
    }
