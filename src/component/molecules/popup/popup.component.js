import './style.scss';

class PopupComponent {
    /*
     * DOM selector toggle activator
     */
    _selector = null;

    /*
     * Toggle if popup is show or hide
     */
    _active = false;

    constructor({ selector, props }) {
        this.selector = selector;

        this.mounted(props);
    }

    get selector() {
        return this._selector;
    }

    set selector(selector) {
        this._selector = document.getElementById(selector);
    }

    get isActive() {
        return this._active;
    }

    set active(active) {
        this._active = active;
    }

    mounted() {
        this.onClickSelector((x) => console.log(x));
    }

    onClickSelector(callback = () => {}) {
        this._selector.onclick = () => {
            this.toggleActivator(true, callback);
        };
    }

    toggleActivator(active, callback = () => {}) {
        this.active = active;
        callback(active);
    }
}

export default PopupComponent;
