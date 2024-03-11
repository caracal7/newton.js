

<section @click{ element.childNodes.forEach(node => node.className = node === event.target && 'active')}>
    <button>Vertices</button>
    <button>Edge</button>
    <button>Shapes</button>
    <button>Bodies</button>
    <button>Joints</button>
</section>

<section>
    <input type="radio" name="select" %checked=state.radio id="Vertices" value="Vertices"><label for="Vertices">Vertices</label>
    <input type="radio" name="select" %checked=state.radio id="Edge" value="Edge"><label for="Edge">Edge</label>
    <input type="radio" name="select" %checked=state.radio id="Shapes" value="Shapes"><label for="Shapes">Shapes</label>
    <input type="radio" name="select" %checked=state.radio id="Bodies" value="Bodies"><label for="Bodies">Bodies</label>
    <input type="radio" name="select" %checked=state.radio id="Joints" value="Joints"><label for="Joints">Joints</label>
</section>

<section style="--color: red">
    <div var="data-example-1">This is a div with the attribute value "data-example-1".</div>
    <div var="data-example-2">This is a div with the attribute value "data-example-2".</div>
    <div var="other-attribute">This div has a different attribute value.</div>
</section>

<!css controls.css>

<!style>
    :host {
      --selector-attribute: "data-example";
    }

    [var^="data-example-1"] {
        color: red;
    }

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
