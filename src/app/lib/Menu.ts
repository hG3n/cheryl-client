export interface MenuItem {
    title: string;
    tag: string;
}

export interface MenuConfig {
    title: string;
    menu: {
        icon: string;
        items: MenuItem[];
    };
}
