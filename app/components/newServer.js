import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'
import cookie from 'react-cookie'
import CircularProgress from 'material-ui/CircularProgress'

class NewServer extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         name:'',
         email:'',
         password:'',
         progress:false
      }
   }
   componentWillMount() {
      axios.get(configObject.frontendServerURL+'/server/isNewServer').then((res)=>{
         if(!res.data){
            window.location.href = '/#/login'
         }
      })
   }
   signUp(e){
      e.preventDefault()
      this.setProgress(true)
      let postData = {email:this.state.email,password:this.state.password,name:this.state.name,isAdmin:true}
      axios.post(configObject.frontendServerURL+"/user/signup",postData).then(function(data){
         cookie.save('userId', data._id, { path: '/' });
         cookie.save('userFullname', data.name, { path: '/' });
         cookie.save('email', data.email, { path: '/' });
         cookie.save('createdAt', data.createdAt, { path: '/' });
         window.location.href = configObject.dashboardUrl+"/#/admin"
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
         <MuiThemeProvider>
          	<div id="login">
         		<div id="image">
         			<img className="logo" src="./app/assets/images/CbLogoIcon.png"/>
         		</div>
         		<div id="headLine">
         			<h3 className="tacenter hfont">Setup your CloudBoost Server.</h3>
         		</div>
         		<div id="box">
         			<h5 className="tacenter bfont">Create an Admin account to get started.</h5>
         		</div>
         		<div className="loginbox">
                  <h5 className="tacenter red">{ this.state.errorMessage }</h5>
                  <form onSubmit={this.signUp.bind(this)}>
            			<input type="text" value={this.state.name} onChange={this.changeHandler.bind(this,'name')} className="loginInput from-control" placeholder="Full Name" required/>
                     <input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Email" required/>
                     <input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Password" required/>
            			<button className={!this.state.progress ? 'loginbtn':'hide'} type="submit"> Sign up</button>
                     <button className={this.state.progress ? 'loginbtn':'hide'} type="submit"> <CircularProgress color="white" size={28} thickness={4} /></button>
                  </form>
         		</div>
               <div className="loginbox twotop">
                  <h5 className="tacenter bfont fs13">By creating an account, you agree with the <a href="" className="forgotpw">Terms and Conditions </a>.</h5>
               </div>
         	</div>
         </MuiThemeProvider>
      );
   }
}

export default NewServer;