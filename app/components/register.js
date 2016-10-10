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
         this.state.successMessage = 'We have sent you an account activation link on your email, please verify your email before loging in.'
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.setProgress(false) 
         this.state['errorMessage'] = "User with same email already exists. You can reset your password, if you don't remember it."
         if(err.response == undefined){
            this.state['errorMessage'] = "Sorry, we currently cannot process your request, please try again later."
         }
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
       	<div>
            <div className={this.state.progress ? 'loader':'hide'}>
               <CircularProgress color="#4E8EF7" size={50} thickness={6} />
            </div>
            <div id="signup" className={!this.state.progress ? '':'hide'}>
         		<div id="image" >
         			<img className="logo" src="./app/assets/images/CbLogoIcon.png"/>
         		</div>
         		<div id="headLine" >
         			<h3 className="tacenter hfont">One account. For all of CloudBoost.</h3>
         		</div>
         		<div id="box" >
         			<h5 className="tacenter bfont">Sign up free, no card required.</h5>
         		</div>
               
         		<div className="loginbox" >
                  <h5 className="tacenter red">{ this.state.errorMessage }</h5>
                  <h5 className="tacenter green">{ this.state.successMessage }</h5>
                  <h4 className={!this.state.successMessage == '' ? 'tacenter':'hide'}><Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link> </h4>
                  <form onSubmit={this.signUp.bind(this)} className={this.state.successMessage == '' ? '':'hide'}>
            			<input type="text" value={this.state.name} onChange={this.changeHandler.bind(this,'name')} className="loginInput from-control" placeholder="Full Name" required/>
                     <input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Email" required/>
                     <input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Password" required/>
            			<button className="loginbtn"  type="submit"> Sign up for CloudBoost </button>
                  </form>
         		</div>

               <div className={this.state.successMessage == '' ? 'loginbox twotop':'hide'}>
                  <h5 className="tacenter bfont fs13">By creating an account, you agree with the <a href="https://cloudboost.io/terms" target="_blank" className="forgotpw">Terms and Conditions </a>.</h5>
               </div>
               
               <div className={this.state.successMessage == '' ? 'loginbox twotop':'hide'}>
                  <h5 className="tacenter">Already have an account? <Link to="/login"><a href="" className="forgotpw">Log in. </a></Link></h5>
               </div>
            </div>
      	</div>
      );
   }
}

export default Register;