<!state>
    runner: undefined

<!class>
    connected() {
                console.log('edges')



        this.interaction = this.state.runner.interaction;

        this.mouseup = (body, screen, world, move) => {
            if(!move) {
                this.selected = body && this.state.runner.world.findEdgeByPoint(world, this.state.runner.interaction.SELECTABLE_LINE_DIST_THREHOLD);

                console.log(this.selected)
                //this.state.runner.world.findShapeByPoint(world);
                this.state.runner.redraw();
            }
        };

        this.mousemove = (screen, world) => {

            const edgeId = this.state.runner.world.findEdgeByPoint(world, this.state.runner.interaction.SELECTABLE_LINE_DIST_THREHOLD);
            if(edgeId) {


                var shape = this.state.runner.world.shapeById((edgeId >> 16) & 0xFFFF);
                if (shape && shape.visible) {
                    var index1 = edgeId & 0xFFFF;
                    var index2 = (index1 + 1) % shape.tverts.length;
                    var v1 = shape.tverts[index1];
                    var v2 = shape.tverts[index2];

    //                console.log('edgeId', edgeId, v1, v2)
/*
                    renderer.drawLine(ctx, v1, v2, pixel2meter(2), selectionColor);

                    dirtyBounds.addPoint(v1);
                    dirtyBounds.addPoint(v2);
*/
                }
            }
        };

        this.interaction.on('mousemove', this.mousemove);
        this.interaction.on('mouseup', this.mouseup);
    }
    disconnected() {
        this.interaction.off('mousemove', this.mousemove);
        this.interaction.off('mouseup', this.mouseup);
        this.state.runner.redraw();
    }
