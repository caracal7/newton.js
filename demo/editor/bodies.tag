<!import Newton from ../../dist/newton.esm.js>

<!state>
    runner: undefined

<!static>
    const IS_TOUCH = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

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

<!class>
    connected() {
        this.selectedColors = {
            fill: [],
            stroke: [],
            FILL: '#FF5522',
            STROKE: 'black'
        };
        this.hoveredColors = {
            fill: [],
            stroke: [],
            FILL: '#FF552255',
            STROKE: '#00000055'
        };

        this.mouseup = (body, screen, world, isMoved) => {
            if(!isMoved) {
                if(body) {
                    if(this.selected !== body) {
                        if(!IS_TOUCH) {
                            if(this.hovered) unhiglightBody(this.hovered, this.hoveredColors);
                            this.hovered = null;
                        }
                        if(this.selected) unhiglightBody(this.selected, this.selectedColors);
                        this.selected = body;
                        higlightBody(body, this.selectedColors);
                    }
                } else {
                    if(this.selected) unhiglightBody(this.selected, this.selectedColors);
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
            }
            if(!IS_TOUCH) {
                var hovered = this.state.runner.world.findBodyByPoint(world);
                if(this.selected && this.selected === hovered) hovered = null;
                if(hovered) {
                    if(this.hovered !== hovered) {
                        if(this.hovered) unhiglightBody(this.hovered, this.hoveredColors);
                        this.hovered = hovered;
                        higlightBody(hovered, this.hoveredColors);
                    }
                } else {
                    if(this.hovered) unhiglightBody(this.hovered, this.hoveredColors);
                    this.hovered = null;
                }
            }
        }

        this.state.runner.interaction.on('mouseup', this.mouseup);
        this.state.runner.interaction.on('mousedown', this.mousedown);
        this.state.runner.interaction.on('mousemove', this.mousemove);
    }

    disconnected() {
        if(this.hovered) unhiglightBody(this.hovered, this.hoveredColors);
        if(this.selected) unhiglightBody(this.selected, this.selectedColors);

        this.state.runner.interaction.off('mouseup', this.mouseup);
        this.state.runner.interaction.off('mousedown', this.mousedown);
        this.state.runner.interaction.off('mousemove', this.mousemove);
    }
