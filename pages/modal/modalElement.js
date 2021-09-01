import { modalTemplate } from "./modalTemplate.js";

async function createModal(contetx, message) {
    
    let modal = {
        message
    }

    let promise = new Promise((resovle, reject) => {
        modal.handler = (val) => {
            contetx.renderModal(null)
            resovle(val);
        }
    })

    contetx.renderModal(modalTemplate(modal));
    return promise;
} 



export default {
    createModal
}