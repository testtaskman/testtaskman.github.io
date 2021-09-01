import { html } from 'https://unpkg.com/lit-html?module'

export let singleBrowseTemaplte = (team) => html`
<article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.membersCount} Members</span>
            <div><a href="/details/${team._id}" class="action">See details</a></div>
        </div>
    </article>
`;

export let browseTemplate = (teams) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>
    ${Boolean(localStorage.getItem('authToken')) ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>
    ` : undefined}
    
   ${teams.map(x => singleBrowseTemaplte(x))}

</section>
`