
async function login(loginUser){
    

    let req = await fetch('https://testtaskman.herokuapp.com/users/login', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    });

    let res = await req.json();
  

    localStorage.setItem('authToken', res.accessToken);
    localStorage.setItem('userId', res._id);
    localStorage.setItem('email', res.email);

}


async function register(registerUser){
    

    let req = await fetch('https://testtaskman.herokuapp.com/users/register', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerUser)
    });

    let res = await req.json();

    localStorage.setItem('authToken', res.accessToken);
    localStorage.setItem('userId', res._id);
    localStorage.setItem('email', res.email);

}

async function logout(){
    let req = await fetch('https://testtaskman.herokuapp.com/users/logout', {
        headers: {
            'X-Authorization': localStorage.getItem('authToken')
        }
    })

}

export default {
    login,
    register,
    logout
}