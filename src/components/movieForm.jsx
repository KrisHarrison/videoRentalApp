import React from 'react';
import Form from './common/form';
import {getGenres} from './services/genreService';
import {getMovie, saveMovie} from './services/movieService';
import Joi from 'joi-browser';

class MovieForm extends Form {
    state={
        data:{
            title:"",
            genreId:"",
            numberInStock:"",
            dailyRentalRate:""
        },
        errors:{},
        genres: [],
    }

    schema={
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId:Joi.string().required().label("Genre"),
        numberInStock: Joi.number().integer().min(0).max(100).required().label("Number in Stock"),
        dailyRentalRate: Joi.number().min(0).max(10).required().label("Daily Rental Rate")
    }

    async populateGenres(){
        const {data:genres} = await getGenres();
        this.setState({ genres });
    }

    async populateMovies(){ 
        try{
            const movieId = this.props.match.params.id;
            if(movieId === "new")
                return;

            const {data:movie} = await getMovie(movieId);
            this.setState({ data:this.mapToViewModel(movie) });

        }
        catch(ex){
            if(ex.response && ex.response.status === 404)
                return this.props.history.replace("/not-found");
        }  
    }

    async componentDidMount(){
        await this.populateGenres();
        await this.populateMovies();   
    }

    mapToViewModel(movie){
        
        return{
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async ()=>{
        try{
            await saveMovie(this.state.data);
            this.props.history.push("/movies");
        }
        catch(ex){

        }

    };

    render() { 
        let {genres} = this.state
        return ( 
            <div className="container">
                <h1>Movie</h1>
                <form>
                    {this.props.match.params.username}
                    {this.renderInput('title', 'Title')}
                    {this.renderDropDown('genreId', 'Genre', genres)}
                    {this.renderInput('numberInStock', 'Number in Stock')}
                    {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
                    {this.renderButton('Save')}
                </form>
            </div> 
        );
    }
}
 
export default MovieForm;