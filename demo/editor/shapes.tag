<!state>
    runner: undefined

<!class>
    connected() {
        this.interaction = this.state.runner.interaction;

        this.mouseup = (body, screen, world, move) => {
            if(!move) {
                this.selected = body && this.state.runner.world.findShapeByPoint(world);
                this.state.runner.redraw();
            }
        };

        this.beforeRenderShape = (shape, colors) => {
            if(shape === this.selected) {
                colors.outline = '#FFFFFF';
                colors.body = 'gold';
            }
        };
        this.state.runner.on('beforeRenderShape', this.beforeRenderShape);
        this.interaction.on('mouseup', this.mouseup);
    }
    disconnected() {
        this.state.runner.off('beforeRenderShape', this.beforeRenderShape);
        this.interaction.off('mouseup', this.mouseup);
        this.state.runner.redraw();
    }
