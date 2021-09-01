import { html } from 'https://unpkg.com/lit-html?module'

export let navTemaplte = () =>  html`
    <a href="/home" class="site-logo">Team Manager</a>
            <nav>
            <a href="/browse-teams" class="action">Browse Teams</a>
                ${Boolean(localStorage.getItem('authToken')) 
                ? html`
                 
                 <a href="/my-teams" class="action">My Teams</a>
                <a href="/logout" class="action">Logout</a>
                ` 
                : html`
               
                <a href="/login" class="action">Login</a>
                <a href="/register" class="action">Register</a>
                `}
            </nav>
`;