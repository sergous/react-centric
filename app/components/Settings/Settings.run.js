import * as TYPES from '../../actiontypes/settings';

function initSettings() {
    var body = $('body');
    var $document = $(document);
    var header = $('.layout-container > header');
    var sidebar = $('.layout-container > aside');
    var brand = sidebar.find('.sidebar-header');
    var content = $('.layout-container > main');
    var sidebarToolbar = $('.sidebar-toolbar');
    // var lContainer = $('.layout-container');

    // Run from Settings reducer with triggerEvent agent

    // Handler for themes preview
    $document.on(TYPES.SET_THEME, 'body', (event, className) => setTheme(className));

    // Handler for menu links
    $document.on(TYPES.SET_MENU_LINK, 'body', (event, className) => setMenuLink(className));

    // Handlers for layout variations
    $document.on(TYPES.TOGGLE_SIDEBAR_HEADER, 'body', (event, isChecked) => toggleHeader(Boolean(isChecked)));
    $document.on(TYPES.TOGGLE_SIDEBAR_TOOLBAR, 'body', (event, isChecked) => toggleToolbar(Boolean(isChecked)));
    $document.on(TYPES.TOGGLE_SIDEBAR_OFFCANVAS, 'body', (event, isChecked) => toggleOffCanvas(Boolean(isChecked)));

    function setTheme(className) {
        body.removeClass(themeClassname);
        body.addClass(className);
    }
        // Regular expression for the pattern bg-* to find the background class
        function themeClassname(index, css) {
            var cmatch = css.match(/(^|\s)theme-\S+/g);
            return (cmatch || []).join(' ');
        }

    function setMenuLink(className) {
        var menulinks = $('.menu-link');
        // remove allowed classses
        menulinks.removeClass('menu-link-slide menu-link-arrow menu-link-close');
        // Add selected
        menulinks.addClass(className);
    }

    function toggleHeader(isChecked) {
        brand[isChecked === true ? 'show' : 'hide']();
    }

    function toggleToolbar(isChecked) {
        sidebarToolbar[isChecked === true ? 'show' : 'hide']();
    }

    function toggleOffCanvas(isChecked) {
        body[isChecked === true ? 'addClass' : 'removeClass']('sidebar-offcanvas');
    }
}

export default initSettings;
