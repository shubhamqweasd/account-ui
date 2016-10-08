import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'
import CircularProgress from 'material-ui/CircularProgress'

class Register extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         successMessage: "",
         name:'',
         email:'',
         password:'',
         successChange:false,
         progress:false
      }
   }
   signUp(e){
      e.preventDefault()
      this.setProgress(true)
      let postData = {email:this.state.email,password:this.state.password,name:this.state.name,isAdmin:false}
      axios.post(configObject.frontendServerURL+"/user/signup",postData).then(function(data){
         this.setProgress(false) 
         this.state.password = ''
         this.state.name = ''
         this.state.email = ''
         this.state.successChange = true
         this.state.successMessage = 'We have sent you an account activation link on your email, please verify your email before loging in.'
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.setProgress(false) 
         this.state['errorMessage'] = 'User with same credentials exists, Please try again.'
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
      			<h3 className="tacenter hfont">One account for all CloudBoost.</h3>
      		</div>
      		<div id="box">
      			<h5 className="tacenter bfont">Sign up free, no card required, $0 forever.</h5>
      		</div>
      		<div className="loginbox">
               <h5 className="tacenter red">{ this.state.errorMessage }</h5>
               <h4 className="tacenter green">{ this.state.successMessage }</h4>
               <form onSubmit={this.signUp.bind(this)}>
         			<input disabled={this.state.successChange} type="text" value={this.state.name} onChange={this.changeHandler.bind(this,'name')} className="loginInput from-control" placeholder="Full Name" required/>
                  <input disabled={this.state.successChange} type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Email" required/>
                  <input disabled={this.state.successChange} type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Password" required/>
         			<button disabled={this.state.successChange} className={!this.state.progress ? 'loginbtn':'hide'} type="submit"> Sign up</button>
                  <button className={this.state.progress ? 'loginbtn':'hide'} type="submit"> <CircularProgress color="white" size={28} thickness={4} /></button>
               </form>
      		</div>
            <div className="loginbox twotop">
               <h5 className="tacenter bfont fs13">By creating an account, you agree with the <a href="" className="forgotpw">Terms and Conditions </a>.</h5>
            </div>
            <div className="loginbox twotop">
               <h5 className="tacenter">Already have an account? <Link to="/login"><a href="" className="forgotpw">Log in </a></Link>.</h5>
            </div>
      	</div>
      );
   }
}

export default Register;