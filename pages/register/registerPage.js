import loginRegister from "../../service/loginRegister.js";
import { registerTemplate } from "./registerTemplate.js";

let form = undefined;

async function submitHandler(context, e){
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get('email');
    let username = formData.get('username')
    let password = formData.get('password');
    let repearPassword = formData.get('repass');
    let errorMessage = e.target.querySelector('.error');

    let emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g;

    

    if(email && !email.match(emailRegex)){
        context.renderView(registerTemplate(form));
      return  errorMessage.textContent = 'Write valid email!';
      
    }
    
    if(username && username.length <3){
        context.renderView(registerTemplate(form));
       return errorMessage.textContent = 'Username must be at least 3 characters';
        
    }

    if(password && password.length < 3){
        context.renderView(registerTemplate(form));
       return  errorMessage.textContent = 'Password must be at least 3 characters/digits';
        
    }

    if(password && repearPassword && password !== repearPassword){
        context.renderView(registerTemplate(form));
      return   errorMessage.textContent = 'Passwords did not matched!';
    }
    
    if(!email || !password || !repearPassword || !username){
        context.renderView(registerTemplate(form));
      return  errorMessage.textContent = 'All fields must be filled!'
        
    }

    let user = {
        email,
        username,
        password
    }

    let registerUser = await loginRegister.register(user);
    
    context.page.redirect('/home')


}

async function getView(context){
    let boundSubmitHandler = submitHandler.bind(null, context);
     form = {
        submitHandler: boundSubmitHandler
    }

    context.renderView(registerTemplate(form));
}

export default {
    getView
}