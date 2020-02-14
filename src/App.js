import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import NavBar from './components/navBar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';



class App extends Component{
    
    render(){
        return(
        <React.Fragment>   
                <ToastContainer/>
                <NavBar/>
                <div className="content">
                    <Switch>
                        <Route path='/new' component={MovieForm}></Route>
                        <Route path='/register' component={RegisterForm}></Route>
                        <Route path='/login' component={LoginForm}></Route>
                        <Route path='/customers' component={Customers}></Route>
                        <Route path='/rentals' component={Rentals}></Route>
                        <Route path='/not-found' component={NotFound}></Route>
                        <Route path='/movies/:id' component={MovieForm}></Route>
                        <Route path='/movies' component={Movies}></Route>
                        <Redirect from='/' exact to='/movies'/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </div>
                
        </React.Fragment>
        );
    }
  
}

export default App;
