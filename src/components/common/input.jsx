import React from 'react';
                                    //Rest operator to get the rest of props
const Input = ({name, label, error, ...rest}) => {

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
        <input 
            //Initalizing the rest of props
            {...rest}
            name={name}
            id={name} 
            className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
        </div>
      );
}
 
export default Input;