<!css ../assets/header.css>

<header if(!state.edit)>
    <button class="play" @click=this.emit("play") text("Play")/>
</header>


<!state>
    runner: undefined

<!class>
    connected() {
        this.interaction = this.state.runner.interaction;

        this.mousedown = (...data) => {
            console.log('mousedown', data)
        }

        this.interaction.on('mousedown', this.mousedown);
    }
    disconnected() {
        this.interaction.off('mousedown', this.mousedown);
    }

<!style>
    *, :host {
        box-sizing: border-box;
    }
    :host {
        position: absolute;
        color: white;
        width: 100%;
    }

    button.play {
        position: absolute;
        right: 15px;
        height: 25px;
        font-size: 10px;
        color: black;
        background: linear-gradient(#00FF8A, #00E050);
        font-weight: bold;
        padding: 0 15px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1);
        vertical-align: middle;
        cursor: pointer;
    }
