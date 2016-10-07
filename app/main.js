import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import axios from 'axios'
import configObject from './config/app'

//components
import Login from './components/login.js';
import Register from './components/register.js';
import Reset from './components/reset.js';
import ChangePassword from './components/changePassword.js';
import Activate from './components/activate.js';
import NewServer from './components/newServer.js';

class Layout extends React.Component {
	componentWillMount() {
		axios.get(configObject.frontendServerURL+'/server/isNewServer').then((res)=>{
			if(res.data){
				window.location.href = '/#/newserver'
			}
		})
	}
	render() {
	  return (
	  	<div>
	  		{ this.props.children }
	  	</div>
	  );
	}
}

ReactDOM.render((
	<Router history={hashHistory}>
	    <Route path="/" component={Layout}>
	    	<IndexRoute component={Login} />
	     	<Route path="login" component={Login}/>
	     	<Route path="activate" component={Activate}/>
	     	<Route path="signup" component={Register}/>
	     	<Route path="reset" component={Reset}/>
	     	<Route path="forgotpassword" component={ChangePassword}/>
	    </Route>
	    <Route path="/newserver" component={NewServer}>
	    </Route>
	</Router>
), document.getElementById('main'));