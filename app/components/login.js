import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'

class Login extends React.Component {
	constructor(){
		super()
		this.setInitialState()
	}
	login(e){
		e.preventDefault()
		let postData = {email:this.state.email,password:this.state.password}
		axios.post(configObject.frontendServerURL+"/user/signin",postData).then(function(data){
			window.location.href = configObject.dashboardUrl
		}.bind(this),function(error){
			if(error.response.data.message == "Account verification needed"){
				this.state['errorMessage'] = 'You email is not verified yet!.'
				this.state.notVerified = true
			} else{
				this.state['errorMessage'] = 'Invalid Credentials, Please try again or continue with Signup.'
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
				notVerified:false
			}
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
					<h5 className="tacenter bfont">Sign in with your CloudBoost ID to continue.</h5>
				</div>
				<div className="loginbox">
					<button onClick={this.resend.bind(this)} className={this.state.notVerified ? 'loginbtn resendbtn':'hide'}>Resend Verification Email</button>
					<h5 className="tacenter red">{ this.state.errorMessage }</h5>
					<form onSubmit={this.login.bind(this)}>
						<input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Your Email." required />
						<input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Your Password." required />
						<button className="loginbtn" type="submit"> Sign in to Cloudboost</button>
					</form>
					<Link to="/reset"><a href="#" className="forgotpw fl">Forgot password?</a></Link>
					<Link to="/signup"><a href="#" className="forgotpw fr">Create Account</a></Link>
				</div>
			</div>
		);
	}
}

export default Login;