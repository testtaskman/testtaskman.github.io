

async function getTeams(){
    let req = await fetch('https://testtaskman.herokuapp.com/data/teams');

    return await req.json();
}

async function getTeam(id){
    let req = await fetch(`https://testtaskman.herokuapp.com/data/teams/${id}`);

    return await req.json();
}

async function getallMembers(){
    let req = await fetch('https://testtaskman.herokuapp.com/data/members')

    return await req.json();
}

async function getMember(teamId){
    let queryObj = {
        where: `teamId="${teamId}"`
    }

    let query = queryEncoder(queryObj)

    let req = await fetch(`https://testtaskman.herokuapp.com/data/members?${query}`);
    return req.json()
}

async function getMembersForTeam(teamId){
    let queryObj = {
        where: `teamId="${teamId}"`,
        load: `team=teamId:teams`
    }
    let query = queryEncoder(queryObj)

    let req = await fetch(`https://testtaskman.herokuapp.com/data/members?${query}`);
    return req.json()

}

async function getMembersForTeamWithUser(teamId){
    let queryObj = {
        where: `teamId="${teamId}"`,
        load: `user=_ownerId:users`
    }
    let query = queryEncoder(queryObj)

    let req = await fetch(`https://testtaskman.herokuapp.com/data/members?${query}`);
    return req.json()

}

async function createTeam(form) {
    let req = await fetch('https://testtaskman.herokuapp.com/data/teams', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('authToken')
        },
        body: JSON.stringify(form)
    })

    return req.json();
}

function queryEncoder(queryObj){
  return  Object.entries(queryObj)
    .map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

export default {
    getTeam,
    getTeams,
    getallMembers,
    getMember,
    getMembersForTeam,
    getMembersForTeamWithUser,
    createTeam
}