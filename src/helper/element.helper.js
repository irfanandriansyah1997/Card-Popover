import ErrorHelper from './error.helper';

class ElementHelper extends ErrorHelper {
    element = null;

    constructor(tag) {
        super();
        if (this.element === null) {
            this.createElement(tag);
        }
    }

    createElement(tag) {
        try {
            this.element = document.createElement(tag);
        } catch (error) {
            this.printError(error);
        }

        return this;
    }

    setAttribute(...args) {
        try {
            if (args.length === 2) {
                this.element.setAttribute(args[0], args[1]);
            } else {
                throw this.setError('argument set attribute length is not 2');
            }
        } catch (error) {
            this.printError(error);
        }

        return this;
    }

    appendElement(elementClass) {
        try {
            if (elementClass instanceof ElementHelper) {
                const { element } = elementClass;
                this.element.appendChild(element);
            } else {
                throw this.setError('appendElement only receive parameter ElementHelper Only');
            }
        } catch (error) {
            this.printError(error);
        }

        return this;
    }

    appendElements(listElement) {
        const element = this;

        listElement.forEach((item) => {
            element.appendElement(item);
        });

        return element;
    }

    setStyle(style) {
        const temp = this;

        Object.keys(style).map((item) => {
            temp.element.style[item] = style[item];

            return item;
        });

        return temp;
    }

    setInnerHtml(text) {
        this.element.innerHTML = text;

        return this;
    }

    onClick(callback) {
        const { element } = this;
        this.element.onclick = (e) => callback(e, element);

        return this;
    }
}

export default ElementHelper;
