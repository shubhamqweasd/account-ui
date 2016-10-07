import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'

class Reset extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         email:'',
         successReset:false,
         successMessage: ""
      }
   }
   reset(e){
      e.preventDefault()
      let postData = {email:this.state.email}
      axios.post(configObject.frontendServerURL+"/user/ResetPassword",postData).then(function(data){
         this.state.email = ''
         this.state.successReset = true
         this.state.successMessage = "We have sent you an email with a password reset link. Please check your spam (just in case)."
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.state['errorMessage'] = 'Invalid Email, please try again.'
         this.state.email = ''
         this.setState(this.state)
      }.bind(this))
   }
   changeHandler(which,e){
      this.state[which] = e.target.value
      this.setState(this.state)
   }
   render() {
      return (
       	<div id="login">
      		<div className="loginbox">
               <h1 className="tacenter fs43">Reset your password</h1>
               <h5 className="tacenter bfont resetp">Enter your email below and we will send you a link to reset your password.</h5>
               <h5 className="tacenter red">{ this.state.errorMessage }</h5>
               <h4 className="tacenter green">{ this.state.successMessage } <Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link> </h4>
               <form onSubmit={this.reset.bind(this)}>
         			<input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control mt15" placeholder="Email." disabled={this.state.successReset} required/>
         			<button className="loginbtn" type="submit" disabled={this.state.successReset}> SUBMIT </button>
               </form>
      		</div>
      	</div>
      );
   }
}

export default Reset;