import * as TYPES from '../actiontypes/settings';

// Themes for body.className
export const THEMES_CLASS_NAMES = [
    'theme-1',
    'theme-2',
    'theme-3',
    'theme-4',
    'theme-5',
    'theme-6',
    'theme-7',
    'theme-8',
    'theme-9',
];

// Menu Toggle button clasNames
export const MENU_LINK_CLASS_NAMES = {
    CLOSE: 'menu-link-close',
    SLIDE: 'menu-link-slide',
    ARROW: 'menu-link-arrow',
};


export const mapStateToActionType = {
    theme: TYPES.SET_THEME,
    sidebarShowheader: TYPES.TOGGLE_SIDEBAR_HEADER,
    sidebarShowtoolbar: TYPES.TOGGLE_SIDEBAR_TOOLBAR,
    sidebarOffCanvas: TYPES.TOGGLE_SIDEBAR_OFFCANVAS,
    headerMenulink: TYPES.SET_MENU_LINK
}