import {MenuConfig} from './lib/Menu';

const dashboard_menu: MenuConfig = {
    title: 'Dashboard',
    menu: {
        icon: 'menu',
        items: [
            {
                title: 'Settings',
                tag: 'settings'
            },
            {
                title: 'Raspotify Status',
                tag: 'status'
            },
            {
                title: 'Restart Raspotify',
                tag: 'restart'
            }
        ]
    }
};

const equalizer_menu: MenuConfig = {
    title: 'Equalizer',
    menu: {
        icon: 'menu',
        items: [
            {
                title: 'Add Preset',
                tag: 'add'
            },
            {
                title: 'Load Preset',
                tag: 'load'
            },
            {
                title: 'Restore Preset',
                tag: 'restore'
            },
        ]
    }
};

export const ui = {
    menus: {
        dashboard: dashboard_menu,
        equalizer: equalizer_menu
    }
};
