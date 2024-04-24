<!tag @forkme fork-me>

<slot/>

<@forkme url="http://ya.ru"/>


<!style>
    :host {
        display: block;
        background: #494d55;
        border-top: 5px solid #75c181;
        color: rgba(255, 255, 255, 0.85);
        padding: 60px 20px;
        text-align: center;
    }
    ::slotted(*) {
        font-family: 'Open Sans', arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    ::slotted(b) {
        font-size: 40px;
        font-weight: 800;
        color: #75c181;
    }
    ::slotted(i) {
        font-size: 40px;
        color: #fff;
    }
    ::slotted(p:first-of-type) {
        font-weight: 600;
        font-size: 20px;
    }
