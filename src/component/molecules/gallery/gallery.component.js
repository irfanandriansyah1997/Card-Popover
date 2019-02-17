import ElementHelper from '@/helper/element.helper';
import AnimateHelper from '@/helper/animate.helper';

import './style.scss';

class Gallery {
    default = {
        active: 0,
        images: [],
        options: {}
    };

    _element = {
        gallery: null,
        content: null
    };

    constructor(props, options) {
        this.helper = new AnimateHelper();
        this.mounted(props, options);
    }

    get element() {
        return this._element;
    }

    set element(element) {
        this._element = element;
    }

    mounted({ images }, options) {
        this.default = {
            ...this.default,
            images,
            options
        };
    }

    render() {
        const { active, images, options } = this.default;
        const content = this.createGallery(images);
        const pagination = this.createGalleryPagination(images);
        const gallery = new ElementHelper('div')
            .setAttribute('class', 'gallery')
            .setAttribute('data-active', active)
            .appendElement(content)
            .appendElement(pagination);

        Object.keys(options).map((item) => {
            if (item === 'class') {
                gallery.setAttribute('class', `gallery ${options[item]}`);
            } else {
                gallery.setAttribute(item, options[item]);
            }

            return item;
        });

        this.element = {
            ...this.element,
            content,
            gallery
        };

        return gallery;
    }

    createGallery(images) {
        const itemImage = images.map((item) => this.createGalleryItem(item));

        return new ElementHelper('div')
            .setAttribute('class', 'gallery__content')
            .appendElements(itemImage);
    }

    createGalleryItem({ image, alt }) {
        const imageElement = new ElementHelper('img')
            .setAttribute('src', image)
            .setAttribute('alt', alt)
            .setAttribute('class', 'gallery__images');

        return new ElementHelper('div')
            .setAttribute('class', 'gallery__item')
            .appendElement(imageElement);
    }

    createGalleryPagination(images) {
        const pagination = images.map((item, index) => {
            const className = this.default.active === index ? 'gallery__pagination__item--active' : '';

            return new ElementHelper('a')
                .setAttribute('class', `gallery__pagination__item ${className}`)
                .setAttribute('alt', item.alt)
                .setAttribute('data-position', index)
                .onClick((_, element) => this.onClickPagination(element, index));
        });

        return new ElementHelper('div')
            .setAttribute('class', 'gallery__pagination')
            .appendElements(pagination);
    }

    onClickPagination(e, currentPosition) {
        const children = [...e.parentNode.children];
        children.forEach((item) => {
            item.classList.remove('gallery__pagination__item--active');
        });

        e.classList.add('gallery__pagination__item--active');

        const { active } = this.default;
        const range = currentPosition - active;

        if (active !== currentPosition) {
            this.default.active = currentPosition;

            this.setAnimationComponent(range * 100, active);
        }
    }

    setAnimation({ callback = () => {}, duration = 610, interval = 610 }) {
        setTimeout(() => {
            this.helper.render(callback, duration);
        }, interval);
    }

    setAnimationComponent(range, currentPosition) {
        this.setAnimation({
            callback: (x) => this.animationComponent(range, currentPosition, x),
            duration: 377,
            interval: 0
        });
    }

    animationComponent(range, currentPosition, x) {
        const from = currentPosition * -100;

        const style = {
            transform: `translateX(${from - x * range}%)`
        };

        this.element.content.setStyle(style);
    }
}

export default Gallery;
