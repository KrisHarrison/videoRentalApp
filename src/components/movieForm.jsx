import React from 'react';
import Form from './common/form';
import {getGenres} from './services/fakeGenreService';
import {getMovie, saveMovie} from './services/fakeMovieService';
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

    componentDidMount(){
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if(movieId === "new")
            return;
        
        const movie = getMovie(movieId);
        if(!movie)
            return this.props.history.replace("/not-found");

        
        this.setState({ data:this.mapToViewModel(movie) });
        
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

    doSubmit =()=>{
        saveMovie(this.state.data);
        this.props.history.push("/movies");
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