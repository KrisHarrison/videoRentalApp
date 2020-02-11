import React from 'react';

const DropDownListInput = ({name, label, error, genres, ...rest}) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>

            <select name={name} id={name} {...rest} className="form-control">
                    <option value=""></option>
                {genres.map(genre =>
                    <option key={genre._id} value={genre._id}>{genre.name}</option>
                )};
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>  
    );
}
 
export default DropDownListInput;