import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import axios from 'axios'
import configObject from './config/app'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

//components
import Login from './components/login.js';
import Register from './components/register.js';
import Reset from './components/reset.js';
import ChangePassword from './components/changePassword.js';
import Activate from './components/activate.js';
import NewServer from './components/newServer.js';

class Layout extends React.Component {
	componentWillMount() {
		axios.defaults.withCredentials = true
		axios.get(configObject.frontendServerURL+'/server/isNewServer').then((res)=>{
			if(res.data){
				// changes this to server root/#/newserver
				window.location.href = '/accounts/#/newserver'
			}
		})
	}
	render() {
	  return (
	  	<div>
	  		<MuiThemeProvider>
	  			{ this.props.children }
	  		</MuiThemeProvider>
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