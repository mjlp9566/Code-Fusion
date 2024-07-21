import Unav from "./Nav";

import React,{useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import './style_Card.css'
import Card from './Card';
import CardGrid from './CardGrid';
import { useState } from "react";
import { Button } from "primereact/button";



const ViQuest=()=>
{

    const navigate = useNavigate();
    const [question,setquest]=useState([]);
    useEffect(() => {
        document.body.style.backgroundImage=null;
        document.body.style.backgroundColor="#23242a";
        getEvents();
      }, []);

    
      const fun=(qid)=>
      {
          navigate("/getqdet",{state:{ "qid":qid }})
      }
        
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
    .post("http://localhost:8081/getq", {
    sessi:Cookies.get("sess")
    })
    .then((res) => {
    setquest(res.data)
      console.log(res.data);
    })
    .catch((err) => { console.log("error"); });


}
    return(
        <>   
        <Unav/>
       <br></br>
         <CardGrid>
    
    { question.map((_,i) => (
        <Card key={question[i].qid} >
          <h4>{question[i].qname}</h4>&nbsp;

          <Button id={question[i].qid} onClick={(e)=>fun(e.target.id)}>GO</Button>
        </Card>
      ))
    }
  </CardGrid>
 
  </>
    )
}
export default ViQuest;