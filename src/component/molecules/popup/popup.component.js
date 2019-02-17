import ElementHelper from '@/helper/element.helper';
import AnimateHelper from '@/helper/animate.helper';
import Gallery from '@/component/molecules/gallery/gallery.component';
import PopupClose from './popup-close/popup-close.component';

import './style.scss';

class PopupComponent {
    /*
     * DOM selector toggle activator
     */
    _selector = null;

    /*
     * Element Popup
     */
    _element = {
        popup: null,
        backdrop: null
    };

    /*
     * Toggle if popup is show or hide
     */
    _active = false;

    /*
     * Result render gallery component
     */
    _gallery = null;

    constructor({ selector, props }) {
        this.helper = new AnimateHelper();
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

    get gallery() {
        return this._gallery;
    }

    set gallery(images) {
        const gallery = new Gallery(
            {
                images,
                badge: true
            },
            {
                class: 'popup__gallery'
            }
        );

        this._gallery = gallery.render();
    }

    get element() {
        return this._element;
    }

    set element(element) {
        this._element = element;
    }

    mounted({ image }) {
        this.gallery = image;
        this.onClickSelector(this.setAnimationComponent.bind(this));

        const close = new PopupClose({
            onClick: () => {
                this.toggleActivator(false, this.setAnimationComponent.bind(this));
            },
            icon: 'close'
        });
        const backdrop = this.createBackdrop();
        const popup = new ElementHelper('div')
            .setAttribute('class', 'popup')
            .setAttribute('data-active', this.isActive)
            .appendElement(this.gallery)
            .appendElement(close.render());

        this.element = {
            backdrop,
            popup
        };

        document.body.appendChild(popup.element);
    }

    createBackdrop() {
        const element = new ElementHelper('div').setAttribute('class', 'backdrop').onClick(() => {
            this.toggleActivator(false, this.setAnimationComponent.bind(this));
        });

        document.body.appendChild(element.element);

        return element;
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

    setAnimation({ callback = () => {}, duration = 610, interval = 610 }) {
        setTimeout(() => {
            this.helper.render(callback, duration);
        }, interval);
    }

    setAnimationComponent(show) {
        this.setAnimation({
            callback: (x) => this.animationComponent(show, x),
            duration: 344,
            interval: 0
        });
    }

    animationComponent(show, x) {
        let display;

        if (show) {
            display = x > 0.05 ? 'flex' : 'none';
        } else {
            display = x > 0.95 ? 'none' : 'flex';
        }

        const style = {
            opacity: show ? x : 1 - x,
            display
        };

        this.element.popup.setStyle({
            ...style
        });
        this.element.backdrop.setStyle(style);
    }
}

export default PopupComponent;
