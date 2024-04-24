
<main/>

<!import Newton         from ../../dist/newton.esm.js>
<!import Car            from ../../demo/examples/car.js>

<!class>

    connected() {
        const { Runner, TwoRenderer, Interaction } = Newton;

        const firstApp      = Car(Newton);

        const renderer      = new TwoRenderer(Newton, this.$('main'));
        const runner        = new Runner(renderer, firstApp);
        const interaction   = new Interaction(runner);

        runner.settings.showJoints = false;
        renderer.camera.setWorldLimits({
            mins: {
                x: -5,
                y: -5
            },
            maxs: {
                x: 5,
                y: 12
            }
        }, false, 4);

        this.render();
    }


<!style>
    :host {
        display: block;
        width: 100%;
        height: 450px;
    }

    main {
        display: block;
        width: 100%;
        height: 100%;
    }
