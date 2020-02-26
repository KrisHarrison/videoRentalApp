import http from './httpService'
import config from '../config.json'

// function userUrl(id){
//     return `${config.userEndPoint}/${id}`;
// }

export function register(user){
    return http.post(config.usersEndPoint,{
        email:user.username,
        password:user.password,
        name:user.name
    });
}