import loginRegister from "../../service/loginRegister.js";
import { loginTemaplte } from "./loginTemplate.js";

let form = undefined;

async function submitHandler(context, e){
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let errorMessage = e.target.querySelector('.error');

    if(!email || !password){
        context.renderView(loginTemaplte(form));
     return   errorMessage.textContent = 'All fields required!';
    }

    if(password && password.length < 2){
        context.renderView(loginTemaplte(form));
       return errorMessage.textContent = 'Password must be at least 3 symbol!';
        
    }

    let loginUser = {
        email,
        password
    }
    let loginResult = await loginRegister.login(loginUser);
    
    context.page.redirect('/home');
}

async function getView(context){
    let boundSubmitHandler = submitHandler.bind(null, context);
     form = {
        submitHandler: boundSubmitHandler
    }

    context.renderView(loginTemaplte(form))
}

export default {
    getView
}