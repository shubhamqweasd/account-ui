import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

//components
import Login from './components/login.js';
import Register from './components/register.js';
import Reset from './components/reset.js';
import ChangePassword from './components/changePassword.js';

class Layout extends React.Component {
	componentDidMount() {
		//console.log(this.props)
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
	     	<Route path="signup" component={Register}/>
	     	<Route path="reset" component={Reset}/>
	     	<Route path="forgotpassword" component={ChangePassword}/>
	    </Route>
	</Router>
), document.getElementById('main'));