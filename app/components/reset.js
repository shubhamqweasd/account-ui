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
            <div id="image">
               <img className="logo" src="./app/assets/images/CbLogoIcon.png"/>
            </div>
            <div id="headLine">
               <h3 className="tacenter hfont">Reset your password.</h3>
            </div>
            <div id="box">
               <h5 className="tacenter bfont">Enter your email and we'll reset the password for you.</h5>
            </div>
      		<div className="loginbox">
               <h5 className="tacenter red">{ this.state.errorMessage }</h5>
               <h4 className="tacenter green">{ this.state.successMessage }</h4>
               <form onSubmit={this.reset.bind(this)}>
         			<input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Email." disabled={this.state.successReset} required/>
         			<button className={!this.state.progress ? 'loginbtn':'hide'} type="submit" disabled={this.state.successReset}> Reset Password </button>
                  <button className={this.state.progress ? 'loginbtn':'hide'} type="submit"> <CircularProgress color="white" size={28} thickness={4} /></button>
               </form>
               <Link to="/login"><a href="#" className="forgotpw fl">Login.</a></Link>
               <Link to="/signup"><a href="#" className="forgotpw fr"><span class="blackColor">Dont have an account?</span> Create one.</a></Link>
      		</div>
      	</div>
      );
   }
}

export default Reset;