
import React  from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Reg.css';
import {withRouter} from "./withRouter";

class Reg extends React.Component{
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
handleSubmit=(e)=> {
e.preventDefault();
let flag1=true,flag2=true,flag3=false;
  let re=new RegExp(`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`);
if(this.state.user===""){
    flag1=false;
    alert("user name should not be empty")
   }

   if(!re.test(this.state.pass)){
    flag2=false;
    alert("Enter a strong password")
   }

   if(flag1===true && flag2===true){
   
        axios
            .post("http://localhost:8081/reg", {
                Reg: this.state.user,
                Pass: this.state.pass,
            })
            .then((response) => {
                const { navigate }=this.props;
  alert(response.data);
  if(response.data==="ACCOUNT CREATED SUCCESSFULLY"){
    navigate("/");
  }
        
            })
            .catch((err) => {});
         

        }
        }
        
        render(){
    return(
        <body id="reg_bod">
       {/*  <center>
        <form>
            
        <h1 style={{color:"blue"}}>REGISTER</h1><br/><br/>
        <div className="input-container">
        <label>Username</label><br/>
        <input type="text" name="user" onChange={(e) => this.setUser(e.target.value)} required={true} /><br/><br/>
        </div>
        <div className="input-container">
        <label>Password</label>&nbsp;&nbsp;<br/>
        <input type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" name="pass" onChange={(e) => this.setPass(e.target.value)}/><br/><br/>
        </div>
        <div className="button-container">
          
        <input type="submit" onClick={this.handleSubmit} value="submit"></input>
        </div>
        </form>
        <Link to="/"><b  >Already have account? LOGIN</b></Link>
    
    </center>*/}

    
<div className="box">
		<form id="reg_form" autocomplete="off">
			<h2>Sign up</h2>
			<div className="inputBox">
            <input type="text" name="user" onChange={(e) => this.setUser(e.target.value)} required />
				<span>Userame</span>
				<i></i>
			</div>
			<div className="inputBox">
            <input type="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$" required  name="pass" onChange={(e) => this.setPass(e.target.value)}/>
				<span>Password</span>
				<i></i>
			</div>
			<div className="links">
			
                <Link to="/"><b>Already have account? LOGIN</b></Link>
			</div>
      <input type="submit" onClick={this.handleSubmit} value="submit"></input>
		</form>
	</div>
        </body>
    );
        }
}
export default withRouter(Reg);