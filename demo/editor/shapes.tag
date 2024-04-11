<!import Newton from ../../dist/newton.esm.js>

<!state>
    runner: undefined

<!static>
    const IS_TOUCH = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

    function highlightShape(shape, colors) {
        colors.fill = shape.render_entity.fill;
        colors.stroke = shape.render_entity.stroke;
        shape.render_entity.fill = colors.FILL;
        shape.render_entity.stroke = colors.STROKE;
    }

    function unhighlightShape(shape, colors) {
        shape.render_entity.fill = colors.fill;
        shape.render_entity.stroke = colors.stroke;
    }

<!class>
    connected() {
        this.selectedColors = {
            fill: undefined,
            stroke: undefined,
            FILL: '#FF5522',
            STROKE: 'black'
        };
        this.hoveredColors = {
            fill: undefined,
            stroke: undefined,
            FILL: '#FF552255',
            STROKE: '#00000055'
        };

        this.mouseup = (body, screen, world, isMoved) => {
            if(!isMoved) {
                if(body) {
                    var shape = this.state.runner.world.findShapeByPoint(world);
                    if(shape) {
                        if(this.selected !== shape) {
                            if(!IS_TOUCH) {
                                if(this.hovered) unhighlightShape(this.hovered, this.hoveredColors);
                                this.hovered = null;
                            }
                            if(this.selected) unhighlightShape(this.selected, this.selectedColors);
                            this.selected = shape;
                            this.selectedBody = body;
                            highlightShape(shape, this.selectedColors);
                        }
                    } else {
                        if(this.selected) unhighlightShape(this.selected, this.selectedColors);
                        this.selected = null;
                    }
                } else {
                    if(this.selected) unhighlightShape(this.selected, this.selectedColors);
                    this.selected = null;
                }
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

                //set(body.p.x, body.p.y);
                /*
                this.selected.render_entity.position.set(
                    this.selected.render_entity.position.x + delta.x,
                    this.selected.render_entity.position.y + delta.y,
                )*/


            	this.state.runner.renderer.removeBody(this.selectedBody);
            	this.state.runner.renderer.addBody(this.selectedBody);

                //console.log(this.selected);

                //this.state.runner.redraw();
            }
            if(!IS_TOUCH) {
                var hovered = this.state.runner.world.findShapeByPoint(world);
                if(this.selected && this.selected === hovered) hovered = null;
                if(hovered) {
                    if(this.hovered !== hovered) {
                        if(this.hovered) unhighlightShape(this.hovered, this.hoveredColors);
                        this.hovered = hovered;
                        highlightShape(hovered, this.hoveredColors);
                    }
                } else {
                    if(this.hovered) unhighlightShape(this.hovered, this.hoveredColors);
                    this.hovered = null;
                }
            }
        }

        this.state.runner.interaction.on('mouseup', this.mouseup);
        this.state.runner.interaction.on('mousedown', this.mousedown);
        this.state.runner.interaction.on('mousemove', this.mousemove);
    }

    disconnected() {
        if(this.hovered) unhighlightShape(this.hovered, this.hoveredColors);
        if(this.selected) unhighlightShape(this.selected, this.selectedColors);

        this.state.runner.interaction.off('mouseup', this.mouseup);
        this.state.runner.interaction.off('mousedown', this.mousedown);
        this.state.runner.interaction.off('mousemove', this.mousemove);
    }
