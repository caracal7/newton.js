<button disable=state.disabled class=(state.checked && 'checked') @click><slot/></button>


<!state>
    checked: false,
    disabled: false

<!class>
    click() {
        this.state.checked = !this.state.checked;
        this.emit('changed', this.state.checked);
        this.render();
    }

<!style>
    :host {
        display: inline-block;
    }

    button {
        height: 22px;
        line-height: 14px;
        background: linear-gradient(#4B4947, #32302D);
        color: white;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1);
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
    }

    button:active {
        text-shadow: 0px 0px 0px;
        box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.5), 0 1px 0 #6B6967;
    }

    button.checked {
        color: black;
        background: #fa0;
        text-shadow: 0px 0px 0px;
        box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.5), 0 1px 0 #6B6967;
    }

    button:disabled {
        -webkit-filter: brightness(35%);
        filter: brightness(35%);
        cursor: auto;
    }
