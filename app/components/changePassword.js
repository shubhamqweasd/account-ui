import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'

class ChangePassword extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         successMessage: "",
         password:"",
         confirmPassword:"",
         code:null,
         successChange:false
      }
   }
   componentWillMount() {
      if(this.props.location.query.code == undefined){
         this.props.history.pushState('login')
      } else {
         this.state.code = this.props.location.query.code
      }
   }
   change(){
      let postData = {code:this.state.code,password:this.state.password}
      axios.post(configObject.frontendServerURL+"/user/updatePassword",postData).then(function(data){
         this.state.password = ''
         this.state.confirmPassword = ''
         this.state.successChange = true
         this.state.successMessage = 'We have changed your password, you can now login with your new password. '
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.state['errorMessage'] = 'User email does not exists for this password change request.'
         this.state.successChange = true
         this.setState(this.state)
      }.bind(this))
   }
   matchPasswords(e){
      e.preventDefault()
      if(this.state.password == this.state.confirmPassword){
         this.change()
      } else {
         this.state['errorMessage'] = 'Passwords do not match try again.'
         this.state.password = ''
         this.state.confirmPassword = ''
         this.setState(this.state)
      }
   }
   changeHandler(which,e){
      this.state[which] = e.target.value
      this.setState(this.state)
   }
   render() {
      return (
       	<div id="login">
      		<div className="loginbox">
               <h1 className="tacenter fs43">Change password</h1>
               <h5 className="tacenter bfont resetp">Enter your new password below.</h5>
               <h5 className="tacenter red">{ this.state.errorMessage }</h5>
               <h4 className="tacenter green">{ this.state.successMessage } <Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link> </h4>
               <form onSubmit={this.matchPasswords.bind(this)}>
         			<input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control mt15" placeholder="Password." disabled={this.state.successChange} required/>
                  <input type="password" value={this.state.confirmPassword} onChange={this.changeHandler.bind(this,'confirmPassword')} className="loginInput from-control" placeholder="Confirm password." disabled={this.state.successChange} required/>
         			<button className="loginbtn" type="submit" disabled={this.state.successChange}> SUBMIT </button>
               </form>
      		</div>
      	</div>
      );
   }
}

export default ChangePassword;