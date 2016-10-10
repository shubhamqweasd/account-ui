import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'
import cookie from 'react-cookie'
import CircularProgress from 'material-ui/CircularProgress';

class Login extends React.Component {
	constructor(){
		super()
		this.setInitialState()
	}
	login(e){
		e.preventDefault()
		this.setProgress(true)
		let postData = {email:this.state.email,password:this.state.password}
		axios.post(configObject.frontendServerURL+"/user/signin",postData).then(function(data){
			cookie.save('userId', data.data._id, { path: '/' });
            cookie.save('userFullname', data.data.name, { path: '/' });
            cookie.save('email', data.data.email, { path: '/' });
            cookie.save('createdAt', data.data.createdAt, { path: '/' });
			window.location.href = configObject.dashboardUrl
		}.bind(this),function(error){
			this.setProgress(false)			
			if(error.response.data.message == "Account verification needed"){
				this.state['errorMessage'] = 'You email is not verified yet!.'
				this.state.notVerified = true
			} else{
				this.state.notVerified = false
				this.state['errorMessage'] = 'Invalid Credentials, Please try again or create a new account.'
			}
			if(error.response == undefined){
            	this.state['errorMessage'] = "Sorry, we currently cannot process your request, please try again later."
         	}
			this.setState(this.state)
		}.bind(this))
	}
	resend(){
		let postData = {email:this.state.email}
		// axios.post(configObject.frontendServerURL+"/user/resendverification",postData).then(function(data){
		// 	this.setInitialState()
		// }.bind(this))
		axios.post(configObject.frontendServerURL+"/user/resendverification",postData)
		this.setInitialState()
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	setInitialState(){
		this.state = {
				errorMessage:'',
				email:'',
				password:'',
				notVerified:false,
				progress:false
			}
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
				<div id="login" className={!this.state.progress ? '':'hide'}>
					<div id="image">
						<img className="logo" src="./app/assets/images/CbLogoIcon.png"/>
					</div>
					<div id="headLine">
						<h3 className="tacenter hfont">Welcome back!</h3>
					</div>
					<div id="box">
						<h5 className="tacenter bfont">Sign in with your CloudBoost ID to continue.</h5>
					</div>
					<div className="loginbox">
						<h5 className="tacenter red">{ this.state.errorMessage }</h5>
						<button onClick={this.resend.bind(this)} className={this.state.notVerified ? 'loginbtn':'hide'}>Resend Verification Email</button>
						<form onSubmit={this.login.bind(this)} className={!this.state.notVerified ? '':'hide'}>
							<input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Your Email." required />
							<input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Your Password." required />
							<button className="loginbtn" type="submit"> Sign in to CloudBoost <i class="icon ion-chevron-right"></i> </button>
						</form>
						<Link to="/reset" className={!this.state.notVerified ? '':'hide'}><a href="#" className="forgotpw fl">Forgot password.</a></Link>
						<Link to="/login" className={this.state.notVerified ? '':'hide'} onClick={this.setInitialState.bind(this)}><a href="#" className="forgotpw fl">Login.</a></Link>
						<Link to="/signup"><a href="#" className="forgotpw fr"><span class="blackColor">Dont have an account?</span> Get Started.</a></Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;