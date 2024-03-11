<!tag @buttons-group ../tags/buttons-group>

<!css ../assets/header.css>

<header if(!state.edit)>
    <@buttons-group selected=state.selection_type @select{
        state.selection_type = event.detail;
        this.selected_body = undefined;
        this.selected_shape = undefined;
        state.runner.drawFrame(0);
    }>
        <button>Bodies</button>
        <button>Shapes</button>
        <button>Edges</button>
        <button>Vertices</button>
        <button>Joints</button>
    </@buttons-group>

    <button class="play" @click=this.emit("play") text("Play")/>
</header>


<!state>
    selection_type: 'Bodies',
    runner: undefined

<!class>
    connected() {
        this.interaction = this.state.runner.interaction;


        this.mouseup = (body, screen, world, move) => {
            if(!move) {
                if(this.state.selection_type == 'Bodies') {
                    this.selected_body = body;
                }
                if(this.state.selection_type == 'Shapes') {
                    this.selected_shape = body && this.state.runner.world.findShapeByPoint(world);
                }
            }
        };

        this.beforeRenderBody = (body, colors) => {
            if(body === this.selected_body) {
                colors.outline = '#FFFFFF';
                colors.body = 'gold';
            }
        };
        this.beforeRenderShape = (shape, colors) => {
            if(shape === this.selected_shape) {
                colors.outline = '#FFFFFF';
                colors.body = 'gold';
            }
        };
        this.state.runner.on('beforeRenderBody', this.beforeRenderBody);
        this.state.runner.on('beforeRenderShape', this.beforeRenderShape);
        this.interaction.on('mouseup', this.mouseup);
    }
    disconnected() {
        this.state.runner.off('beforeRenderBody', this.beforeRenderBody);
        this.state.runner.off('beforeRenderShape', this.beforeRenderShape);
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
