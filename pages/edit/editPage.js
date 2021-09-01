import teamManagerRequest from "../../service/teamManagerRequest.js";
import { editTemplate } from "./editTemplate.js";

let form = undefined;

async function editHandler(context, e) {
    e.preventDefault();
    let teamId = context.params.teamId;
    let formData = new FormData(e.target);
    let name = formData.get('name');
    let logoUrl = formData.get('logoUrl');
    let description = formData.get('description');
    let errorMessage = e.target.querySelector('.error');

    form = {
        name,
        logoUrl,
        description
    }


    let editResult = await editTeam(teamId, form);
     console.log(editResult);
     context.page.redirect(`/details/${teamId}`);


}

async function getView(context) {
    let teamId = context.params.teamId;

    let teamInfo = await teamManagerRequest.getTeam(teamId);

    let boundEditHandler = editHandler.bind(null, context)
    form = {
        editHandler: boundEditHandler,
        value: {
            name: teamInfo.name,
            logoUrl: teamInfo.logoUrl,
            description: teamInfo.description
        }
    }

    context.renderView(editTemplate(form))
}

async function editTeam(teamId, form) {
    return await fetch(`http://localhost:3030/data/teams/${teamId}`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify(form)
    })


}

export default {
    getView
}