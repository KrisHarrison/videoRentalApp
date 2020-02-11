import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from './input';
import DropDownListInput from './dropDownList';

class Form extends Component {
    state = {
        data:{},
        errors:{}
      }
      validate = () =>{
        const options = {abortEarly: false}
        let {error} = Joi.validate(this.state.data, this.schema, options);

       if(!error)
        return null;

        const errors = {};
        for(let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;
    };

    validateProperty  = ({name, value}) =>{
        const obj = {[name]:value};
        const schema = {[name]:this.schema[name]};
        const {error} = Joi.validate(obj,schema);
       
        return error ? error.details[0].message : null;
  
    };
    
    handleSubmit = eventObj =>{
        //Prevents default behavoir
        //i.e. submitting form to the server
        eventObj.preventDefault(); 
        
        const errors = this.validate();
        this.setState({errors: errors || {}});

        if(errors) return;

        this.doSubmit();
    };
    
    handleChange = ({currentTarget: input}) =>{
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        

        if(errorMessage)
            errors[input.name] = errorMessage;
        else
            delete errors[input.name];
        


        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    };

    renderButton(label){
         // The validate method returns either null or an object(errors)
        //null(falsy) = button disabled
        //object(truthy) = button enabled
        return (
        <button 
        onClick={this.handleSubmit}
        disabled={this.validate()}
        className="btn btn-primary"
        type="button"
        >{label}</button>
        );
    }

    renderInput(name, label, type='text'){
        const {data, errors} = this.state;
        return(
            <Input 
                type={type}
                name={name} 
                value={data[name]} 
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
            );
    }


    renderDropDown(name, label, genres){
        const {data, errors} = this.state;
    
        return(<DropDownListInput
            name={name}
            label={label}
            genres={genres}
            value={data[name]}
            onChange={this.handleChange}
            error={errors[name]}

        />
        );
    }
    
}
 
export default Form;