import React ,{useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Logout=(props)=>{

    const navigate = useNavigate();
   const user=Cookies.get("user");
   const sessi=Cookies.get("sess");
 const time=Cookies.get("time");
    function getEvents(){

    axios
            .post("http://localhost:8081/logout", {
                user: user,
                sessi: sessi,
                sec: parseInt(time)          })
            .then((res) => {
               console.log(res.data)
                if(res.data==="1")
                {
                   Cookies.remove("user")
                   Cookies.remove("sess")
                   Cookies.remove("time");
                   navigate('/');
                }
                else{
                    alert("logout unsucces");
                    
                }
           
               
            })
            .catch((err) => {});
           

}
      useEffect(()=>{
         getEvents();
               },[])
}
export default Logout;