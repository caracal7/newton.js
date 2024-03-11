<!tag @controls controls>
<!css ../assets/header.css>

<header if(!state.edit)>
    <@controls id="controls" runner=state.runner/>
    <button class="play" @click=this.emit("play") text("Play")/>
</header>


<!state>
    runner: undefined

<!class>
    connected() {
        this.interaction = this.state.runner.interaction;

        this.mousedown = (body, screen, world) => {}

        this.mouseup = (body, screen, world, move) => {

            console.log('mouseup', body, move)

            if(!move) {
                this.selected_body = body;

            }
        }

        this.beforeRender = (body, colors) => {
            if(body === this.selected_body) {
                colors.outline = '#FFFFFF';
                colors.body = 'gold';
            }
        }
        this.state.runner.on('beforeRender', this.beforeRender);
        this.interaction.on('mousedown', this.mousedown);
        this.interaction.on('mouseup', this.mouseup);
    }
    disconnected() {
        this.state.runner.off('beforeRender', this.beforeRender);
        this.interaction.off('mousedown', this.mousedown);
        this.interaction.off('mouseup', this.mouseup);
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
        height: 22px;
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
