import React from 'react';
import axios from 'axios'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

class Layout extends React.Component {
   componentWillMount() {
      axios.defaults.withCredentials = true
      axios.get(USER_SERVICE_URL+'/server/isNewServer').then((res)=>{
         if(res.data){
            // changes this to server root/#/newserver
            window.location.href = '/#/newserver'
         }
      },(err)=>{
         
      })
   }
   render() {
     return (
     
      <MuiThemeProvider muiTheme={getMuiTheme(null, { userAgent: 'all' })}>
         <ReactCSSTransitionGroup
            component="div"
            transitionName="pagetransition"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
         >
            {
               React.cloneElement(this.props.children, {
               key: this.props.location.pathname
            })}
         </ReactCSSTransitionGroup>
      </MuiThemeProvider>
      
     );
   }
}

export default Layout