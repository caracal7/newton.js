<!state>
    runner: undefined

<!static>


<!class>
    connected() {
        const LINE_WIDTH = this.state.runner.PIXEL_UNIT * 3;
        const HOVER_COLOR = '#FFFF00';
        const SELECTED_COLOR = '#FF0000';
        const IS_TOUCH = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

        this.interaction = this.state.runner.interaction;

        const findEdge = world => {
            const edgeId = this.state.runner.world.findEdgeByPoint(world, this.state.runner.interaction.SELECTABLE_LINE_DIST_THREHOLD);
            if(edgeId) {
                var shape = this.state.runner.world.shapeById((edgeId >> 16) & 0xFFFF);
                if (shape && shape.visible) {
                    var index1 = edgeId & 0xFFFF;
                    var index2 = (index1 + 1) % shape.tverts.length;
                    var v1 = shape.tverts[index1];
                    var v2 = shape.tverts[index2];
                    return { v1, v2, shape, edgeId };
                }
            }
            return null;
        }

        const drawEdge = (edge, color) => {
            this.state.runner.renderer.drawLine(edge.v1, edge.v2, LINE_WIDTH, color);
            this.state.runner.dirtyBounds.addPoint(edge.v1);
            this.state.runner.dirtyBounds.addPoint(edge.v2);
            this.state.runner.dirtyBounds.expand(LINE_WIDTH, LINE_WIDTH);
        }

        this.mouseup = (body, screen, world, move) => {
            if(!move) this.edge_selected = findEdge(world);
        };

        this.mousemove = (screen, world) => {
            if(!IS_TOUCH) this.edge_hover = findEdge(world);
        }

        this.afterRenderFrame = () => {
            if(this.edge_selected) drawEdge(this.edge_selected, SELECTED_COLOR);
            if(this.edge_hover && this.edge_hover.edgeId !== this.edge_selected?.edgeId) drawEdge(this.edge_hover, HOVER_COLOR)
        }

        this.interaction.on('mousemove', this.mousemove);
        this.interaction.on('mouseup', this.mouseup);
        this.state.runner.on('afterRenderFrame', this.afterRenderFrame);
    }
    disconnected() {
        this.interaction.off('mousemove', this.mousemove);
        this.interaction.off('mouseup', this.mouseup);
        this.state.runner.off('afterRenderFrame', this.afterRenderFrame);
        this.state.runner.redraw();
    }
