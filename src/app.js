import './style/main.scss';

import PopupComponent from '@/component/molecules/popup/popup.component';

const wrapper = (window) => {
    const document = window;
    const _init = (params) => {
        new PopupComponent(params);
    };

    document.FuckYourSelf = {
        init: _init
    };
};

wrapper(window);
