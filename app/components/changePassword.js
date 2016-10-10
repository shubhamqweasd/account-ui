import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'
import CircularProgress from 'material-ui/CircularProgress'

class ChangePassword extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         successMessage: "",
         password:"",
         confirmPassword:"",
         code:null,
         progress:false
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
      this.setProgress(true)
      let postData = {code:this.state.code,password:this.state.password}
      axios.post(configObject.frontendServerURL+"/user/updatePassword",postData).then(function(data){
         this.setProgress(false)
         this.state.password = ''
         this.state.confirmPassword = ''
         this.state.successMessage = 'We have changed your password, you can now login with your new password. '
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.setProgress(false)
         this.state['errorMessage'] = 'This change password request cannot be processed right now.'
         if(err.response == undefined){
            this.state['errorMessage'] = "Sorry, we currently cannot process your request, please try again later."
         }
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
               <div id="headLine" >
                  <h3 className="tacenter hfont">Change password.</h3>
               </div>
               <div id="box" >
                  <h5 className="tacenter bfont">Enter your new password below.</h5>
               </div>
         		<div className="loginbox">
                  <h5 className="tacenter red">{ this.state.errorMessage }</h5>
                  <h5 className="tacenter green">{ this.state.successMessage }</h5>
                  <h4 className={!this.state.successMessage == '' ? 'tacenter':'hide'}><Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link> </h4>
                  <form onSubmit={this.matchPasswords.bind(this)} className={this.state.successMessage == '' ? '':'hide'}>
            			<input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Password." required/>
                     <input type="password" value={this.state.confirmPassword} onChange={this.changeHandler.bind(this,'confirmPassword')} className="loginInput from-control" placeholder="Confirm password." required/>
            			<button className="loginbtn" type="submit"> SUBMIT </button>
                     <Link to="/login" className={this.state.successMessage == '' ? '':'hide'}><a href="#" className="forgotpw fl">Login.</a></Link>
                  </form>
         		</div>
         	</div>
         </div>
      );
   }
}

export default ChangePassword;