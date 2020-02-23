import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import auth from './services/authService';
import Like from './common/like';
import Table from './common/table';


//const {user} = this.props;

class MoviesTable extends Component {
    columns = [
        {path: 'title', label:'Title', 
        content: movie =><Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label:'Genre'},
        {path: 'numberInStock', label:'Stock'},
        {path: 'dailyRentalRate', label:'Rate'},
        {key:'like',
        /* content: movie => ... is equivland content = movie => ... */
        content:movie/*takes movie as the parameter */ =>( 
          <Like liked={movie.liked} 
            onClick={()=>this.props.onLike(movie)}
            >
        </Like>
        )
      }
    ]

    deleteColumn(){
      return{
        key:'delete',
        content: movie =>(
        <button 
          onClick={() => this.props.onDelete(movie)} 
          className="btn btn-danger btn-sm" 
        >Delete
        </button>)
      }
    }

    constructor(){
      super();
      const user = auth.getCurrentUser();

      if(user && user.isAdmin){
        this.columns.push(this.deleteColumn());
      }
      
    }

    render(){
    let {movies, onSort, sortColumn} = this.props;
    let {user} = this.props
    return (
        <Table 
          columns={this.columns} 
          data={movies} 
          sortColumn={sortColumn} 
          onSort={onSort}
          user={user}
          >
        </Table>
      );
    }
}
 
 
export default MoviesTable;