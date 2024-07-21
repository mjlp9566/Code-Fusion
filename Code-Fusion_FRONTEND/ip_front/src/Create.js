import React,{useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Create=()=>{
    const{ state }=useLocation();
    const navigate=useNavigate();
 
    const{ qname,lang,obj,sip,sop,pro,test }=state; 
    
    useEffect(() => {
    
      
        getEvents();
      
     
      }, []);
  
      const getEvents=()=>
{
    axios
    .post("http://localhost:8081/check_exp", {
      user: Cookies.get('user'),
      sessi:Cookies.get('sess') 
    })
    .then((res) => {

      if (res.data === "0") {
        Cookies.remove('sess');
        Cookies.remove('user');
        navigate('/');
      }
      else{
        axios
        .post("http://localhost:8081/get_uname", {
        sess:Cookies.get("sess")
        })
        .then((res) => {
         
          Cookies.set("user",res.data);
        })
        .catch((err) => { console.log("error"); });
      
      }
    })
    .catch((err) => {});



    
    axios
    .post("http://localhost:8081/post_quest", {
      user: Cookies.get('user'),
      sessi:Cookies.get('sess'),
      qname:qname,
      obj:obj,
      sip:sip,
      sop:sop,
      test:test,
      pro:pro,
      lang:lang
    })
    .then((res) => {
        if(res.data==="1"){
            alert("QUESTION INSERTED")
            navigate("/Dashboard");
        }
        else if(res.data==="ALREADY EXIST")
        {
            alert("QUESTION NAME ALREADY EXISTS")
            navigate("/Con2");
        }
        else{
            navigate("/");
        }
     

    })
    .catch((err) => {});
    
}

}
export default Create;