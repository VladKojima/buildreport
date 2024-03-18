export function saveToken(token){
    localStorage.setItem('token', token);
} 

export function getToken(){
    return localStorage.getItem('token');
}

export function deleteToken(){
    localStorage.removeItem('token');
}

export function authHeader(){
    let token = getToken();

    return token ? {Authorization: 'Bearer ' + token} : {};
}