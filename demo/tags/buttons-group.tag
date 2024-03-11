<slot/>

<!state>
    selected: undefined

<!class>
    toggleActive() {
        this.slotted.forEach(node => node.classList[(node.value || node.textContent) == this.state.selected ? 'add' : 'remove']('active'));
    }

    slotChange() {
		this.slotted.filter(x => x.nodeName === 'BUTTON')
			.forEach(button => button.onclick = [null, "false"].includes(button.getAttribute('disabled'))
				? () => {
                    this.state.selected = button.value || button.textContent;
                    this.emit('select', this.state.selected);
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
        height: 22px!important;
        line-height: 14px!important;
        background: linear-gradient(#4B4947, #32302D)!important;
        color: white!important;
        border: 1px solid black!important;
        border-radius: 5px!important;
        box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.1)!important;
        vertical-align: middle!important;
        cursor: pointer!important;
    }

    ::slotted(button) {
        padding: 0 10px!important;
        margin-left: -4px!important;
        border-right-width: 0!important;
        border-radius: 0px!important;
    }

    ::slotted(button:first-child) {
        margin-left: 0px!important;
        border-top-left-radius: 5px!important;
        border-bottom-left-radius: 5px!important;
    }

    ::slotted(button:last-child) {
        border-right-width: 1px!important;
        border-top-right-radius: 5px!important;
        border-bottom-right-radius: 5px!important;
    }

    ::slotted(button:active) {
        text-shadow: 0px 0px 0px!important;
        box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.5), 0 1px 0 #6B6967!important;
    }

    ::slotted(button.active) {
        color: black!important;
        background: #fa0!important;
        text-shadow: 0px 0px 0px!important;
        box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.5), 0 1px 0 #6B6967!important;
    }


    ::slotted(button:disabled) {
        -webkit-filter: brightness(35%)!important;
        filter: brightness(35%)!important;
        cursor: auto!important;
    }
