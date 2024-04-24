

<a href=state.href download=(state.href.substr(5))>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"></svg>
    <slot/>
</a>

<style text(`
    a {
        background: ${state.color};
        border: 1px solid ${state.color};
    }
`)/>

<!state>
    color: "#40babd",
    href: undefined

<!style>
    *  {
        box-sizing: border-box;
    }
    :host {
        display:block;
        width: 100%;
    }
    svg {
        position: absolute;
        top:10px;
        left:12px;
        width: 19px;
    }
    a {
        width: 100%;
        text-decoration: none;
        position: relative;
        display: inline-block;
        color: #fff;
        cursor: pointer;

        -webkit-transition: all 0.4s ease-in-out;
        -moz-transition: all 0.4s ease-in-out;
        -ms-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
        font-weight: 600;
        font-size: 14px;
        line-height: 1.5;
;
        padding: 7px 15px 7px 38px;
        border: 1px solid transparent;
        border-radius: 4px;

        user-select: none;
        white-space: nowrap;
    }
    a:hover {
        opacity:0.8;
    }

    ::slotted(i) {
        color: black;
    }
