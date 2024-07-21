
import React  from "react";
import axios from "axios";
import './csfile.css';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {withRouter} from "./withRouter";
import './login.css';
class Login extends React.Component{
 state={
    user:"",
    pass:"",
    res:[]

 }
 setUser=(e)=>
 {
    this.setState({user:e})
 }
 setPass=(e)=>
 {
    this.setState({pass:e})
 }
 check=()=>
 {
 
  if(Cookies.get('sess')!=null){
    alert("already login");
  window.location.href="/Dashboard"
  }
 }
 
 componentDidMount=()=>
 {

   this.check();
   
 }
handleSubmit=(e)=> {
  let flag1=true,flag2=true;
e.preventDefault();
if(this.state.user===""){
  flag1=false;
  alert("user name should not be empty");
 }

 if(this.state.pass===""){
  flag2=false;
  alert("password should not be empty");
 }
 if(flag1===true && flag2===true){
        axios
            .post("http://localhost:8081/login", { //http:localhost:8081/login
                user: this.state.user,
                pass: this.state.pass,
            })
            .then((response) => {
       this.state.res=response.data
            const { navigate }=this.props;
            if(this.state.res['q'] === "LOGIN SUCCESSFULL"){
                
                Cookies.set('sess',this.state.res['sess'], { expires: 7 });
                Cookies.set('user',this.state.res['user'],{ expires: 7});
                navigate("/Dashboard");

              }
              else{
                alert(response.data["q"])
              }
        
            })
            .catch((err) => {});
          //  alert(this.state.response)
            //if(res==succ && name=admin)

          }
        }
        
        render(){
    return(
        <body id="log_bod">
        
       {/* <center>
    
        <form >
        <h1 style={{color:"blue"}} >SIGN IN</h1><br/><br/>
        <div className="input-container">
        <label>Username</label>&nbsp;&nbsp;<br/>
        <input type="text" name="user" onChange={(e) => this.setUser(e.target.value)}  required /><br/><br/>
        </div>
        <div className="input-container">
        <label>Password</label>&nbsp;&nbsp;<br/>
        <input type="password" required={true} name="pass" onChange={(e) => this.setPass(e.target.value)}/><br/><br/>
        </div>
        <div className="button-container">
        <input type="submit" onClick={this.handleSubmit} value="submit"></input><br></br><br></br>
        </div>
        <Link to="/Register"><b  >New User? SIGNUP</b></Link>

        </form >
      
        </center>*/}
    


        <div class="box">
		<form id="log_form" autocomplete="off">
			<h2>Sign in</h2>
			<div class="inputBox">
      <input type="text" name="user" onChange={(e) => this.setUser(e.target.value)}  required />
				<span>Userame</span>
				<i></i>
			</div>
			<div class="inputBox">
      <input type="password" required name="pass" onChange={(e) => this.setPass(e.target.value)}/>
				<span>Password</span>
				<i></i>
			</div>
			<div class="links">
				<a href="#">Forgot Password ?</a>
        <Link to="/Register"><b  >New User? SIGNUP</b></Link>
			</div>
      <input type="submit" onClick={this.handleSubmit} value="submit"></input>
		</form>
	</div>

        </body>
    );
        }
}
export default withRouter(Login);