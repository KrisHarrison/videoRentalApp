import http from './httpService'
import config from '../../config.json';


function movieUrl(id){
    return `${config.movieEndPoint}/${id}`;
}

export function getMovies(){
    return http.get(config.movieEndPoint);
}

export function getMovie(id){
    return http.get(movieUrl(id));
}

export function deleteMovie(id){
   return http.delete(movieUrl(id));
}

export function saveMovie(movie){
    if(movie._id){
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._id), body);
    }

    return http.post(config.movieEndPoint, movie);
}
