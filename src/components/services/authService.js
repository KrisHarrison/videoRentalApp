import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../../config.json';

const tokenKey = 'token';

http.setJWT(getJWT());

export async function login(email, password){
    const {data: jwt} =  await http.post(config.authEndPoint, {email ,password});
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt){
    localStorage.setItem(tokenKey, jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch(ex){
        return null
    }
}

export function getJWT(){
    return localStorage.getItem(tokenKey);
}

export default{
    logout,
    loginWithJWT,
    login, 
    getCurrentUser,
    getJWT
    
};