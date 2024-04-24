<slot/>


<!style>

    :host {
        --margin: 15px;
        --padding: 10px;
        display: block;
        margin-bottom: 30px;
        box-sizing: border-box;
    }

    slot {
        box-sizing: border-box;
        width: 100%;

        display: flex;
        flex-flow: row wrap;

    }

    ::slotted(section) {
		position: relative;
        display: block;
        flex: 1 1 0;

        box-sizing: border-box;
        font-size: 14px;

        min-width: calc(300px - var(--margin) * 2);

        margin: var(--margin);
		padding: var(--padding);
        background: #fff;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        overflow-x: auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.02);
    }

    ::slotted(section[big]) {
        flex-shrink: 1;
        flex-grow: 1;
    }

    @media only screen and (min-width: calc(300px * 2)) {
        ::slotted(section[big]) {
            min-width: calc(100% - var(--margin) * 2);
            background: #fff;
        }
    }

    @media only screen and (min-width: calc(300px * 3)) {
        ::slotted(section[big]) {
            min-width: calc(66.6666666667% - var(--margin) * 2);
            background: #fff;
        }
    }
    @media only screen and (min-width: calc(300px * 4)) {
        ::slotted(section[big]) {
            min-width: calc(50% - var(--margin) * 2);
            background: #fff;
        }
    }

    ::slotted(section:nth-child(8n+1)) { border-top: 3px solid #75c181; color: #75c181; }
    ::slotted(section:nth-child(8n+2)) { border-top: 3px solid #B5222D; color: #B5222D; }
    ::slotted(section:nth-child(8n+3)) { border-top: 3px solid #F88C30; color: #F88C30; }
    ::slotted(section:nth-child(8n+4)) { border-top: 3px solid #58bbee; color: #58bbee; }
    ::slotted(section:nth-child(8n+5)) { border-top: 3px solid #8A40A7; color: #8A40A7; }
    ::slotted(section:nth-child(8n+6)) { border-top: 3px solid #D4953C; color: #D4953C; }
    ::slotted(section:nth-child(8n+7)) { border-top: 3px solid #948160; color: #948160; }
    ::slotted(section:nth-child(8n+8)) { border-top: 3px solid #339496; color: #339496; }
