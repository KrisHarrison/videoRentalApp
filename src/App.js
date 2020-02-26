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
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';





class App extends Component{
    state={};

    componentDidMount(){
        const user = auth.getCurrentUser();
        this.setState({ user });
    }


    render(){
        const {user} = this.state;
        return(
        <React.Fragment>   
                <ToastContainer/>
                <NavBar user={user}/>
                <div className="content">
                    <Switch>
                        <Route path='/new' component={MovieForm}></Route>
                        <Route path='/register' component={RegisterForm}></Route>
                        <Route path='/login' component={LoginForm}></Route>
                        <Route path='/logout' component={Logout}></Route>
                        <Route path='/customers' component={Customers}></Route>
                        <Route path='/rentals' component={Rentals}></Route>
                        <Route path='/not-found' component={NotFound}></Route>
                        <ProtectedRoute path='/movies/:id' component={MovieForm}></ProtectedRoute>
                        <Route 
                            path='/movies' 
                            render={props => <Movies {...props} 
                            user = {user}
                        />}></Route>
                        <Redirect from='/' exact to='/movies'/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </div>
                
        </React.Fragment>
        );
    }
  
}

export default App;
