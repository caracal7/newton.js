

<section>
    <button>Vertices</button>
    <button>Edge</button>
    <button>Shapes</button>
    <button>Bodies</button>
    <button class="pushed">Joints</button>
</section>

<section>
    <input type="radio" name="select" %checked=state.radio id="Vertices" value="Vertices"><label for="Vertices">Vertices</label>
    <input type="radio" name="select" %checked=state.radio id="Edge" value="Edge"><label for="Edge">Edge</label>
    <input type="radio" name="select" %checked=state.radio id="Shapes" value="Shapes"><label for="Shapes">Shapes</label>
    <input type="radio" name="select" %checked=state.radio id="Bodies" value="Bodies"><label for="Bodies">Bodies</label>
    <input type="radio" name="select" %checked=state.radio id="Joints" value="Joints"><label for="Joints">Joints</label>
</section>




<!css controls.css>

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
