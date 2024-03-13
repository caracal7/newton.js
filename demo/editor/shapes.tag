<!import Newton from ../../dist/newton.esm.js>

<!state>
    runner: undefined

<!static>
    const IS_TOUCH = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

<!class>
    connected() {
        const HOVER_COLOR = '#FFFF00';
        const SELECTED_COLOR = '#FF0000';

        this.interaction = this.state.runner.interaction;

        this.mouseup = (body, screen, world, isMoved) => {
            if(!isMoved) {
                this.selected = body && this.state.runner.world.findShapeByPoint(world);
                this.state.runner.redraw();
            }
            this.lastPos = undefined;
        };

        this.mousedown = (body, screen, world) => {
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
            } else {
                this.hovered = this.state.runner.world.findShapeByPoint(world);
            }
        }

        this.beforeRenderFrame = (shape, colors) => this.hovered && this.state.runner.initFrame();

        this.beforeRenderShape = (shape, colors) => {
            if(shape === this.selected) {
                colors.outline = '#FFFFFF';
                colors.body = SELECTED_COLOR;
            } else {
                if(shape === this.hovered && !IS_TOUCH) {
                    colors.body = HOVER_COLOR;
                }
            }
        };


        if(!IS_TOUCH) this.state.runner.on('beforeRenderFrame', this.beforeRenderFrame);
        this.state.runner.on('beforeRenderShape', this.beforeRenderShape);
        this.interaction.on('mouseup', this.mouseup);
        this.interaction.on('mousedown', this.mousedown);
        this.interaction.on('mousemove', this.mousemove);
    }
    disconnected() {
        if(!IS_TOUCH) this.state.runner.off('beforeRenderFrame', this.beforeRenderFrame);
        this.state.runner.off('beforeRenderShape', this.beforeRenderShape);
        this.interaction.off('mouseup', this.mouseup);
        this.interaction.off('mousedown', this.mousedown);
        this.interaction.off('mousemove', this.mousemove);
        this.state.runner.redraw();
    }
