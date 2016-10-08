import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'
import CircularProgress from 'material-ui/CircularProgress'

class Reset extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         email:'',
         successReset:false,
         successMessage: "",
         progress:false
      }
   }
   reset(e){
      e.preventDefault()
      this.setProgress(true)
      let postData = {email:this.state.email}
      axios.post(configObject.frontendServerURL+"/user/ResetPassword",postData).then(function(data){
         this.setProgress(false)
         this.state.email = ''
         this.state.successReset = true
         this.state.successMessage = "We have sent you an email with a password reset link. Please check your spam (just in case)."
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.setProgress(false)
         this.state['errorMessage'] = 'Invalid Email, please try again.'
         this.state.email = ''
         this.setState(this.state)
      }.bind(this))
   }
   changeHandler(which,e){
      this.state[which] = e.target.value
      this.setState(this.state)
   }
   setProgress(which){
      this.state.progress = which
      this.setState(this.state)
   }
   render() {
      return (
       	<div id="login">
      		<div className="loginbox">
               <h1 className="tacenter fs43">Reset your password</h1>
               <h5 className="tacenter bfont resetp">Enter your email below and we will send you a link to reset your password.</h5>
               <h5 className="tacenter red">{ this.state.errorMessage }</h5>
               <h4 className="tacenter green">{ this.state.successMessage }</h4>
               <h4 className="tacenter"><Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link></h4>
               <form onSubmit={this.reset.bind(this)}>
         			<input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control mt15" placeholder="Email." disabled={this.state.successReset} required/>
         			<button className={!this.state.progress ? 'loginbtn':'hide'} type="submit" disabled={this.state.successReset}> SUBMIT </button>
                  <button className={this.state.progress ? 'loginbtn':'hide'} type="submit"> <CircularProgress color="white" size={28} thickness={4} /></button>
               </form>
      		</div>
      	</div>
      );
   }
}

export default Reset;