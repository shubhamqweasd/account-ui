import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'

class Activate extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         code:null
      }
   }
   componentWillMount() {
      if(this.props.location.query.code == undefined){
         this.props.history.pushState('login')
      } else {
         this.state.code = this.props.location.query.code
      }
   }
   componentDidMount() {
      this.activate()
   }
   activate(){
      let postData = {code:this.state.code}
      axios.post(configObject.frontendServerURL+"/user/activate",postData).then(function(data){
         window.location.href = configObject.dashboardUrl
      }.bind(this),function(error){
         this.state['errorMessage'] = 'Invalid Activation code.'
         this.setState(this.state)
      }.bind(this))
   }
   render() {
      return (
       	<div id="login">
      		<div className="loginbox">
               <h1 className="tacenter fs43">Account Activation</h1>
               <h5 className="tacenter bfont resetp">Please wait while we are activating your account...</h5>
               <h5 className="tacenter red">{ this.state.errorMessage }</h5>
               <h4 className="tacenter"><Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link> </h4>
      		</div>
      	</div>
      );
   }
}

export default Activate;