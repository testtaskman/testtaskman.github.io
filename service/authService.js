

let baseUrl = 'http://testtaskman.herokuapp.com';

async function login(user){
    let req = await fetch(baseUrl + '/login', {
        method: 'Post',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    let res = await req.json();
    
    localStorage.setItem('authToken', res.accessToken);
    localStorage.setItem('userId', res._ownerId);
    localStorage.setItem('email', res.email);
}

async function register(user){
    let req = await fetch(baseUrl + '/register', {
        method: 'Post',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    let res = await req.json();
    
    localStorage.setItem('authToken', res.accessToken);
    localStorage.setItem('userId', res._ownerId);
    localStorage.setItem('email', res.email);
}



export default {
    login,
    register
}