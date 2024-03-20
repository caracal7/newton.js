<!import Newton from ../../dist/newton.esm.js>

<!state>
    runner: undefined

<!static>
    const IS_TOUCH = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

<!class>
    connected() {
        const HOVER_COLOR = '#FFFF00';
        const SELECTED_COLOR = '#FF5522';

        this.interaction = this.state.runner.interaction;

        const selectedColors = {
            fill: [],
            stroke: [],
            FILL: '#FF5522',
            STROKE: 'black'
        };
        const hoveredColors = {
            fill: [],
            stroke: [],
            FILL: '#FF552255',
            STROKE: '#00000055'
        };

        function higlightBody(body, colors) {
            colors.fill.length = 0;
            colors.stroke.length = 0;
            body.render_group.children.forEach(entity => {
                colors.fill.push(entity.fill);
                colors.stroke.push(entity.stroke);
                entity.fill = colors.FILL;
                entity.stroke = colors.STROKE;
            });
        }

        function unhiglightBody(body, colors) {
            body.render_group.children.forEach((entity, index) => {
                entity.fill = colors.fill[index];
                entity.stroke = colors.stroke[index];
            });
        }

        this.mouseup = (body, screen, world, isMoved) => {
            if(!isMoved) {
                if(body) {
                    if(this.selected !== body) {
                        if(!IS_TOUCH) {
                            if(this.hovered) unhiglightBody(this.hovered, hoveredColors);
                            this.hovered = null;
                        }
                        if(this.selected) unhiglightBody(this.selected, selectedColors);
                        this.selected = body;
                        higlightBody(body, selectedColors);
                    }
                } else {
                    if(this.selected) unhiglightBody(this.selected, selectedColors);
                    this.selected = null;
                }
            }
            this.lastPos = undefined;
        };

        this.mousedown = (body, screen, world) => {
            if(this.selected && this.selected === body) {
                this.lastPos = world;
                return true; // Block viewport move
            } else this.lastPos = undefined;
        };

        this.mousemove = (screen, world) => {
            if(this.selected && this.lastPos) {
                var delta = new Newton.vec2(world.x - this.lastPos.x, world.y - this.lastPos.y);
                this.selected.translateWithDelta(delta);
                this.lastPos = world;
                this.state.runner.redraw();
            }
            if(!IS_TOUCH) {
                var hovered = this.state.runner.world.findBodyByPoint(world);
                if(this.selected && this.selected === hovered) hovered = null;
                if(hovered) {
                    if(this.hovered !== hovered) {
                        if(this.hovered) unhiglightBody(this.hovered, hoveredColors);
                        this.hovered = hovered;
                        higlightBody(hovered, hoveredColors);
                    }
                } else {
                    if(this.hovered) unhiglightBody(this.hovered, hoveredColors);
                    this.hovered = null;
                }
            }
        }

        this.interaction.on('mouseup', this.mouseup);
        this.interaction.on('mousedown', this.mousedown);
        this.interaction.on('mousemove', this.mousemove);
    }
    disconnected() {
        if(!IS_TOUCH) this.state.runner.off('beforeRenderFrame', this.beforeRenderFrame);
        this.state.runner.off('beforeRenderBody', this.beforeRenderBody);
        this.interaction.off('mouseup', this.mouseup);
        this.interaction.off('mousedown', this.mousedown);
        this.interaction.off('mousemove', this.mousemove);
        this.state.runner.redraw();
    }
