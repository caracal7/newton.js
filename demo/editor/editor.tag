<!tag @buttons-group ../tags/buttons-group>
<!tag @bodies bodies>
<!tag @shapes shapes>
<!tag @edges edges>

<!css ../assets/header.css>

<header if(!state.edit)>
    <@buttons-group selected=state.selection_type @select{ state.selection_type = event.detail }>
        <button>Bodies</button>
        <button>Shapes</button>
        <button disabled>Edges</button>
        <button disabled>Vertices</button>
        <button disabled>Joints</button>
    </@buttons-group>
    <button class="play" @click=this.emit("play") text("Play")/>
</header>

<@bodies runner=state.runner if(state.selection_type == 'Bodies')/>
<@shapes runner=state.runner if(state.selection_type == 'Shapes')/>
<@edges  runner=state.runner if(state.selection_type == 'Edges')/>

<!state>
    selection_type: 'Shapes',
    runner: undefined

<!class>
    connected() {
        this.state.runner.interaction.settings.pick = false;
    }

    disconnected() {
        this.state.runner.interaction.settings.pick = true;
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
        padding: 0 7px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1);
        vertical-align: middle;
        cursor: pointer;
    }
