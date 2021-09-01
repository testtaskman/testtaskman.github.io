import { homeTemplate } from "./homeTemplate.js";

async function getView(context, next){
    context.renderView(homeTemplate());
    next();
}

export default {
    getView
}