import { homeTemaplte } from "./homeTemplate.js";

async function getView(context){
    context.renderView(homeTemaplte());

}

export default {
    getView
}