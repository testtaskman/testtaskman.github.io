import teamManagerRequest from "../../service/teamManagerRequest.js";
import { myTeamsTemplate } from "./myTeamsTemplate.js";

async function getView(context){
    let allTeams = await teamManagerRequest.getTeams();
    let allMembers = await teamManagerRequest.getallMembers();
    let teams = allTeams.filter(x => x._ownerId === localStorage.getItem('userId'));
    
    teams.forEach(t => t.membersCount = allMembers.filter(m => m.teamId === t._id).length); 
    context.renderView(myTeamsTemplate(teams));
}

export default {
    getView
}