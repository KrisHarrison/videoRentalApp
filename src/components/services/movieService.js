import http from './httpService'
import config from '../../config.json';

export function getMovies(){
    return http.get(config.movieEndPoint);
}

export async function deleteMovie(id){
   return http.delete(config.movieEndPoint + '/' + id);
}