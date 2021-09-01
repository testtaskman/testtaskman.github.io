import { html } from 'https://unpkg.com/lit-html?module'

export let teamDetailTemaplate = (team) => html`
            <section id="team-home">
                <article class="layout">
                    <img src="${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${team.members.length} Members</span>
                        <div>
                            ${localStorage.getItem('authToken') 
                            ? html`
                             ${team.userStatus === 'owner' ? html` <a href="/edit/${team._id}" class="action"}>Edit team</a>` : ''}
                            ${team.userStatus === 'nonMember' ? html`<a href="javascript:void(0)" class="action" @click=${(e) => team.joinHandler(team._id, e)}>Join team</a>` : ''}
                            ${team.userStatus === 'member' ? html` <a href="javascript:void(0)" class="action invert" @click=${(e) => team.leaveHandler(team.memberId, e)}>Leave team</a>` : ''}
                            ${team.userStatus === 'pending' ? html`Membership pending. <a href="javascript:void(0)" @click=${(e) => team.leaveHandler(team.memberId, e)}>Cancel request</a>` : ''}
                            ` : undefined}
                           
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                           
                            ${team.members.map(x => memberTemplate(x, team.leaveHandler))}
            
                        </ul>
                    </div>
                   ${localStorage.getItem('userId') === team._ownerId ? html`
                   <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">

                            ${team.pendingMembers.map(p => pendingTemplate(p, team.leaveHandler, team.approveHandler))}

                        </ul>
                    </div>
                   ` : ''}
                </article>
            </section>
`;


let memberTemplate = (member, leaveHandler) => html`
${localStorage.getItem('userId') === member._ownerTeamId
? html`
    ${member.isOwner ? html`
    <li>${member.user.username}</li>
    ` : html`
    <li>${member.user.username}<a href="javascript:void(0)" class="tm-control action" @click=${(e) => leaveHandler(member._id, e)}>Remove from team</a></li>
    `}` 
: html`
<li>${member.user.username}</li>
`}
`;



let pendingTemplate = (pending, leaveHandler, approveHandler) => html`
    <li>${pending.user.username}
    <a href="javascript:void(0)" class="tm-control action" @click=${(e) => approveHandler(pending._id, e)}>Approve</a>
    <a href="javascript:void(0)" class="tm-control action" @click=${(e) => leaveHandler(pending._id, e)}>Decline</a></li>
`