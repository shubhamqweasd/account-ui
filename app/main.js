import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import routes from './routes.js'

if(__isHosted){
	//If its hosted on CloudBoost Official Server
	ReactDOM.render((
		<Router history={browserHistory}>
		    { routes.routes_prod }
		</Router>
	), document.getElementById('main'));
}else{
	ReactDOM.render((
		<Router history={browserHistory}>
		    { routes.routes_dev }
		</Router>
	), document.getElementById('main'));
}

