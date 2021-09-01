import page from '//unpkg.com/page/page.mjs';
import middleware from './middleware.js'
import nav from './nav/nav.js'
import homePage from './pages/home/homePage.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import loginRegister from './service/loginRegister.js';
import createPage from './pages/create/createPage.js';
import browsePage from './pages/browse/browsePage.js';
import teamDetailsPage from './pages/teamDetailsTemplate/teamDetailsPage.js';
import editPage from './pages/edit/editPage.js';
import myTeamsPage from './pages/myTeams/myTeamsPage.js';
import modalElement from './pages/modal/modalElement.js';


let navContainer = document.querySelector('header');
let viewContainer = document.querySelector('main');
let viewModal = document.querySelector('.modal');
middleware.initialize(navContainer, viewContainer, viewModal);

page('/home', middleware.decorateContext, nav.getView, homePage.getView);
page('/login', middleware.decorateContext, nav.getView, loginPage.getView);
page('/register', middleware.decorateContext, nav.getView, registerPage.getView);
page('/create', middleware.decorateContext, nav.getView, createPage.getView);
page('/browse-teams', middleware.decorateContext, nav.getView, browsePage.getView);
page('/logout', (context) => { loginRegister.logout; localStorage.clear(); context.page.redirect('/home')});

page('/details/:teamId', middleware.decorateContext, nav.getView,teamDetailsPage.getView);
page('/edit/:teamId', middleware.decorateContext, nav.getView, editPage.getView);
page('/my-teams', middleware.decorateContext, nav.getView, myTeamsPage.getView);


page('/', '/home')

page.start();