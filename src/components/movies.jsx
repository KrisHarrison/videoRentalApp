import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MoviesTable from './moviesTable';
import Pagination from'./common/pagination';
import Genre from './common/filter';
import SearchBox from './common/searchBox'
import {getMovies, deleteMovie} from './services/movieService';
import {getGenres} from './services/genreService';
import {paginate} from '../utils/paginate';
import _ from 'lodash';
import '../App.css';



class Movies extends Component {
      state = { 
        movies:[],
        genres:[],
        pageSize: 4,
        currentPage: 1,
        currentGenre:"",
        searchQuery:"",
        sortColumn: {path:'title', order:'asc'},  
      };

    async componentDidMount(){
      const {data} = await getGenres();
      let genres = [{_id:"",name: 'All Genres'}, ...data]

      const {data:movies} = await getMovies();

      this.setState({movies, genres});
    }

    deleteMovieHandler  = async (movie)=>{
       const originalMovies = this.state.movies;

        let movies = originalMovies.filter(m=>{
          return m._id !== movie._id;    
        });

        this.setState({ movies })

        try{
          await deleteMovie(movie._id);
        }
        catch(ex){
          this.setState({movies:originalMovies});
        }
        
    };

    handleLike = (movie) =>{
      let movies = [...this.state.movies];
      let index = movies.indexOf(movie);
      movies[index] = {...movies[index]};
      movies[index].liked = !movies[index].liked;

      this.setState({movies});

    };

    handlePageChange = (page) =>{
        this.setState({currentPage:page});
    }

    handleFilter = (genre) =>{
      console.log("Genre: ", genre);
       this.setState({currentGenre:genre, searchQuery: "", currentPage: 1});
      
       
    }

    handleSort = (sortColumn) =>{
      
      this.setState({sortColumn});
    };

    handleSearch = (query) =>{
      this.setState({searchQuery: query, currentGenre: null, currentPage:1});
    }

    getPageData = () =>{
      let {pageSize, 
        currentPage, 
        movies: allMovies, 
        currentGenre, 
        searchQuery,
        sortColumn
      } = this.state;

     let  filteredMovies = allMovies;

      if(searchQuery){
          filteredMovies = allMovies.filter(m=>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
      }
      else if(currentGenre && currentGenre._id){
          filteredMovies = allMovies.filter(movie=>movie.genre._id === currentGenre._id);
      }
      
      
      let sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

      let movies = paginate(sorted, currentPage, pageSize);

      return {totalCount: filteredMovies.length, data: movies};
    };
   
    render() { 
        //let {length:count} = this.state.movies;
        let {pageSize, 
            currentPage, 
            genres, 
            currentGenre, 
            sortColumn, 
            searchQuery
          } = this.state;
        
        const {totalCount, data: movies}= this.getPageData();
        const {user} = this.props;

        
        if(totalCount === 0)return <p>There are no movies in the database</p>
       

        return ( 
                <div className="row">  
                  <div className="col-3">
                    <Genre 
                          getGenres={genres} 
                          onFilter={this.handleFilter} 
                          currentGenre={currentGenre}>  
                    </Genre>
                  </div>
                    <div className="col-5">
                        {user && 
                        (<Link 
                              to='/movies/new'
                              className="btn btn-primary" 
                              >New Movie
                        </Link>
                        )}
                        <p>Showing {totalCount} movies in the database</p>
                        <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
                        <MoviesTable 
                          movies={movies} 
                          onLike={this.handleLike} 
                          onDelete={this.deleteMovieHandler}
                          onSort={this.handleSort}
                          sortColumn={sortColumn}
                          >
                        </MoviesTable>
                        <Pagination 
                          itemsCount={totalCount} 
                          pageSize={pageSize} 
                          currentPage={currentPage}
                          onPageChange={this.handlePageChange}                              
                        >
                    </Pagination>
                    
                  </div> 
                </div>   
        );
    }
}
 
export default Movies;