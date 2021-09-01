import teamManagerRequest from "../../service/teamManagerRequest.js";
import modalElement from "../modal/modalElement.js";
import { modalTemplate } from "../modal/modalTemplate.js";


import { teamDetailTemaplate } from "./teamDetailsTemplate.js";

async function getView(context, next) {
    let teamId = context.params.teamId;
    let teamPromise = await teamManagerRequest.getTeam(teamId);
    let allMembersPromise = await teamManagerRequest.getMembersForTeamWithUser(teamId);

    let [team, allMemberships] = await Promise.all([teamPromise, allMembersPromise])

    let user = localStorage.getItem('userId');
    let isOwner = undefined;
    let status = undefined;
    let memberId = undefined;

    if (user === team._ownerId) {
        status = 'owner';

    } else {

        let userMembership = allMemberships.find(x => x._ownerId === user);

        if (userMembership === undefined) {
            status = 'nonMember';
        } else if (userMembership.status === 'pending') {
            status = 'pending';
            memberId = userMembership._id
        } else if (userMembership.status === 'member') {
            status = 'member'
            memberId = userMembership._id

        }
    }

    let members = allMemberships.filter(x => x.status === 'member');
    let pendingMemberships = allMemberships.filter(x => x.status === 'pending');

    members.forEach(x => {
        if (team._ownerId === x.user._id) {
            isOwner = true;
            x.isOwner = isOwner;
        }
        x._ownerTeamId = team._ownerId;

    });

    team.userStatus = status;
    team.members = members;
    team.pendingMembers = pendingMemberships;
    team.memberId = memberId;

    let boundJoinHandler = joinHandler.bind(null, context)
    team.joinHandler = boundJoinHandler;

    let boundLeaveHandler = leaveHandler.bind(null, context);
    team.leaveHandler = boundLeaveHandler;

    let boundApproveHandler = approveHandler.bind(null, context);
    team.approveHandler = boundApproveHandler;


    context.renderView(teamDetailTemaplate(team));
    next();
}

//JoinHandler
async function joinHandler(context, teamId) {

    let res = await fetch('http://localhost:3030/data/members', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ teamId })
    });
    context.page.redirect(context.pathname)
}

//LeaveHandler
async function leaveHandler(context, memberId) {
        let modalResult = await modalElement.createModal(context, 'Are you sure?')
        if(modalResult){
            let res = await fetch(`http://localhost:3030/data/members/${memberId}`, {
                method: 'Delete',
                headers: {
                    'X-Authorization': localStorage.getItem('authToken')
                }
            });
        
            context.page.redirect(context.pathname)
        }
}

async function approveHandler(context, memberId) {
    let membership = {
        status: 'member'
    }
    let res = await fetch(`http://localhost:3030/data/members/${memberId}`, {
        method: 'Put',
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify(membership)
    });
    context.page.redirect(context.pathname)

}

export default {
    getView
}