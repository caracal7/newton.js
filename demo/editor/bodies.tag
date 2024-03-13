<!state>
    runner: undefined

<!class>
    connected() {
        this.interaction = this.state.runner.interaction;

        this.mouseup = (body, screen, world, isMoved) => {
            if(!isMoved) {
                this.selected = body;
                this.state.runner.redraw();
            }
        };

        this.beforeRenderBody = (body, colors) => {
            if(body === this.selected) {
                colors.outline = '#FFFFFF';
                colors.body = 'gold';
            }
        };

        this.state.runner.on('beforeRenderBody', this.beforeRenderBody);
        this.interaction.on('mouseup', this.mouseup);
    }
    disconnected() {
        this.state.runner.off('beforeRenderBody', this.beforeRenderBody);
        this.interaction.off('mouseup', this.mouseup);
        this.state.runner.redraw();
    }
