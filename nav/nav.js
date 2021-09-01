import { navTemaplte } from "./navTemaplte.js";

async function getView(context,next){
    context.renderNav(navTemaplte())
    next();
}

export default {
    getView
}