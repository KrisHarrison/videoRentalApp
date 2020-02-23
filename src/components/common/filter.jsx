import React from 'react';



const Genre = ({getGenres:genres, onFilter, currentGenre, textProperty, valueProperty}) => { 
            
    return ( 
            <ul className="list-group" style={{float:"right", verticalAlign:"top"}}>

                {genres.map(genre =>(
                    <a  key={genre[valueProperty]} href="\#" onClick={()=>onFilter(genre)}>
                        
                        <li
                            className={genre[textProperty] === currentGenre?"list-group-item active":"list-group-item"} 
                            style={{cursor:"pointer"}}>
                            {genre.name}
                        </li>
                    </a>
                ))}
            </ul>
     );
}

Genre.defaultProps = {
    textProperty:'name',
    valueProperty:'_id'
}
 
export default Genre;