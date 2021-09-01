import { browseTemplate } from "./browseTemplate.js";
import teamManagerRequest from '../../service/teamManagerRequest.js'

async function getView(context){
    
    let teams = await teamManagerRequest.getTeams();
    let allMembers = await teamManagerRequest.getallMembers()
    
    teams.forEach(t => t.membersCount = allMembers.filter(m => m.teamId === t._id).length);
 
    context.renderView(browseTemplate(teams))
}

export default {
    getView
}