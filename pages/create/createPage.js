import teamManagerRequest from "../../service/teamManagerRequest.js";
import { createTemaplate } from "./createTemplate.js";

let form = undefined;

async function submitHandler(context, e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let name = formData.get('name');
    let logoUrl = formData.get('logoUrl');
    let description = formData.get('description');
    let errorMessage = e.target.querySelector('.error');

    if (!name || !logoUrl || !description) {
        errorMessage.textContent = 'All fields required!';
        return;
    } else {
        form = {
            name,
            logoUrl,
            description
        }

        let createResult = await teamManagerRequest.createTeam(form);
        let adminRequest = await adminRequester(createResult._id);
        let approveRequest = await approveRequester(adminRequest._id);
        

        context.page.redirect(`/details/${createResult._id}`)
    }
}



async function getView(context) {
    let boundSubmitHandler = submitHandler.bind(null, context)
    form = {
        submitHandler: boundSubmitHandler
    }
    context.renderView(createTemaplate(form))
}

async function adminRequester(teamId){
    let res = await fetch('http://localhost:3030/data/members', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ teamId })
    });
    return res.json();
}

async function approveRequester(memberId){
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

    return res.json();
}


export default {
    getView
}