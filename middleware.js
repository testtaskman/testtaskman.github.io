import {render} from 'https://unpkg.com/lit-html?module';

let navContainer = undefined;
let viewContainer = undefined;
let modal = undefined;

function initialize(navContainerDom, viewContainerDom, viewModal){
    navContainer = navContainerDom;
    viewContainer = viewContainerDom;
    modal = viewModal;
}

async function renderNav(template){
    render(template, navContainer)
}

async function renderView(template){
    render(template, viewContainer)
}

async function renderModal(template){
    render(template, modal)
}




function decorateContext(context, next){
    context.renderNav = renderNav;
    context.renderView = renderView;
    context.renderModal = renderModal;

    next();
}

export default {
    initialize,
    renderNav,
    renderView,
    renderModal,
    decorateContext
}