<button class="repeat" @click=restart/>
<button class=(state.runner?.pause ? "play" : "pause") @click=pauseResume/>
<button class="step-forward" disabled=!state.runner?.pause @click=step/>

<!css controls.css>

<!state>
    runner:  undefined

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
