<slot/>

<!state>
    selected: undefined

<!class>
    toggleActive() {
        this.slotted.forEach(node => node.classList[(node.value || node.textContent) == this.state.selected ? 'add' : 'remove']('selected'));
    }

    slotChange() {
		this.slotted.filter(x => x.nodeName === 'BUTTON')
			.forEach(button => button.onclick = [null, "false"].includes(button.getAttribute('disabled'))
				? () => {
                    const selected = button.value || button.textContent;
                    if(selected == this.state.selected) return;
                    this.emit('select', this.state.selected = selected);
                    this.toggleActive();
                } : undefined
            );
        this.toggleActive();
    }

<!style>

    :host {
        margin-left: 7px;
        display: inline;
    }

    ::slotted(button) {
        height: 22px;
        line-height: 14px;
        background: linear-gradient(#4B4947, #32302D);
        color: white;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1);
        vertical-align: middle;
        cursor: pointer;
    }

    ::slotted(button) {
        padding: 0 7px;
        margin-left: -4px;
        border-right-width: 0;
        border-radius: 0px;
    }

    ::slotted(button:first-child) {
        margin-left: 0px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    ::slotted(button:last-child) {
        border-right-width: 1px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    ::slotted(button:active) {
        text-shadow: 0px 0px 0px;
        box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.5), 0 1px 0 #6B6967;
    }

    ::slotted(button.selected) {
        color: black;
        background: #fa0;
        text-shadow: 0px 0px 0px;
        box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.5), 0 1px 0 #6B6967;
        cursor: auto;
    }

    ::slotted(button:disabled) {
        -webkit-filter: brightness(35%);
        filter: brightness(35%);
        cursor: auto;
    }
