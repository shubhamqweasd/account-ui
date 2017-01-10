import React from 'react';
import { Link } from 'react-router'
import axios from 'axios'
import CircularProgress from 'material-ui/CircularProgress'

class Register extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         success: false,
         name:'',
         email:'',
         password:'',
         progress:false
      }
   }
   componentDidMount(){
      if(!__isDevelopment){
          /****Tracking*********/          
           mixpanel.track('Portal:Visited SignUp Page', { "Visited": "Visited Sign Up page in portal!"});
          /****End of Tracking*****/
        }
   }
   signUp(e){
      e.preventDefault()
      this.setProgress(true)
      let postData = {email:this.state.email,password:this.state.password,name:this.state.name,isAdmin:false}
      axios.post(USER_SERVICE_URL+"/user/signup",postData).then(function(data){
         if(!__isDevelopment){
            /****Tracking*********/                
             mixpanel.alias(this.state.email);

             mixpanel.people.set({ "Name": this.state.name,"$email": this.state.email});
             //mixpanel.identify(data._id);

             mixpanel.register({ "Name": this.state.name,"Email": this.state.email});
             mixpanel.track('Signup', { "Name": this.state.name,"Email": this.state.email});
            /****End of Tracking*****/
         }
         this.setProgress(false) 
         this.state.password = ''
         this.state.name = ''
         this.state.email = ''
         this.state.success = true;
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.setProgress(false) 
         this.state['errorMessage'] = "User with same email already exists. If this email belongs to you, you can reset your password."
         if(err.response == undefined){
            this.state['errorMessage'] = "Oops, we couldn't connect to the server. Please try again later."
         }
         this.setState(this.state)
      }.bind(this))
      if(!__isDevelopment){
            /****Tracking*********/          
             mixpanel.track('Portal:Clicked SignUp Button', { "Clicked": "SignUp Button in portal!"});
            /****End of Tracking*****/
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
            <div id="signup" className={!this.state.progress ? '':'hide'}>
         		<div id="image">
         			<img className="logo" src="./app/assets/images/CbLogoIcon.png"/>
         		</div>
         		<div id="headLine" className={this.state.success ? 'hide':''}>
         			<h3>One account. For all of CloudBoost.</h3>
         		</div>
               <div id="headLine" className={!this.state.success ? 'hide':''}>
                  <h3>We've sent you the verification email.</h3>
               </div>
         		<div id="box" className={this.state.success ? 'hide':''}>
         			<h5 className="tacenter bfont">Sign up free, no card required.</h5>
         		</div>
               <div id="box" className={!this.state.success ? 'hide':''}>
                  <h5 className="tacenter bfont">We have sent you the verification email. Please make sure you check spam.</h5>
               </div>
         		<div id="loginbox" className={!this.state.success ? '':'hide'}>
                  <h5 className="tacenter red">{ this.state.errorMessage }</h5>
                  <form onSubmit={this.signUp.bind(this)}>
            			<input type="text" value={this.state.name} onChange={this.changeHandler.bind(this,'name')} className="loginInput from-control" placeholder="Full Name" required/>
                     <input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Email" required/>
                     <input type="password" value={this.state.password} onChange={this.changeHandler.bind(this,'password')} className="loginInput from-control" placeholder="Password" required/>
            			<button className="loginbtn"  type="submit"> Sign up for CloudBoost </button>
                  </form>
         		</div>
               <div className={!this.state.success ? 'loginbox twotop':'hide'}>
                  <h5 className="tacenter bfont fs13">By creating an account, you agree with the <a href="https://cloudboost.io/terms" target="_blank" className="forgotpw">Terms and Conditions </a>.</h5>
               </div>

               <div className={!this.state.success ? 'loginbox twotop':'hide'}>
                  <h5 className="tacenter">Already have an account? <Link to="/login"><span className="forgotpw">Log in. </span></Link></h5>
               </div>

            </div>
      	</div>
      );
   }
}

export default Register;