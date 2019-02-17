import ElementHelper from '@/helper/element.helper';

class PopupCloseComponent {
    default = {
        icon: null,
        onClick: () => {}
    };

    /*
     * Element Popup Close
     */
    _element = null;

    constructor(props) {
        const { onClick, icon } = props;

        this.mounted(onClick, icon);
    }

    get element() {
        return this._element;
    }

    set element(element) {
        this._element = element;
    }

    mounted(onClick, icon) {
        this.default = {
            ...this.default,
            onClick,
            icon
        };
    }

    render() {
        const { onClick, icon } = this.default;
        const iconClose = this.createIcon(icon);
        const popupClose = new ElementHelper('a')
            .setAttribute('class', 'popup__close')
            .appendElement(iconClose)
            .onClick(onClick);

        this.element = popupClose;

        return popupClose;
    }

    createIcon(icon) {
        return new ElementHelper('i').setAttribute('class', 'material-icons').setInnerHtml(icon);
    }
}

export default PopupCloseComponent;
