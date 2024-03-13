<!import Newton from ../../dist/newton.esm.js>

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
            this.lastPos = undefined;
        };

        this.mousedown = (body, screen, world, move) => {
            if(this.selected && this.selected === this.state.runner.world.findShapeByPoint(world)) {
                this.lastPos = world;
                return true; // Block viewport move
            } else this.lastPos = undefined;
        };

        this.mousemove = (screen, world) => {
            if(this.selected && this.lastPos) {
                var delta = new Newton.vec2(world.x - this.lastPos.x, world.y - this.lastPos.y);
                this.selected.translateWithDelta(delta);
                this.lastPos = world;
                if(this.selected.body.isStatic()) this.state.runner.redraw();
            }
        }

        this.beforeRenderShape = (shape, colors) => {
            if(shape === this.selected) {
                colors.outline = '#FFFFFF';
                colors.body = 'gold';
            }
        };
        this.state.runner.on('beforeRenderShape', this.beforeRenderShape);
        this.interaction.on('mouseup', this.mouseup);
        this.interaction.on('mousedown', this.mousedown);
        this.interaction.on('mousemove', this.mousemove);
    }
    disconnected() {
        this.state.runner.off('beforeRenderShape', this.beforeRenderShape);
        this.interaction.off('mouseup', this.mouseup);
        this.interaction.off('mousedown', this.mousedown);
        this.interaction.off('mousemove', this.mousemove);
        this.state.runner.redraw();
    }
