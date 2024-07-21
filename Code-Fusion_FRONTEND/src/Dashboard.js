import Unav from "./Nav";
import React, { useState, useEffect } from 'react';
import pic from './laptop.png'
import pic1 from './pic1.jpg'
import { useNavigate } from "react-router-dom";
import pic2 from './pic2.jpg'
import { CCard,CCardImage,CCardBody,CCardText,CCardTitle,CButton } from "@coreui/react";
import { Button } from "primereact/button";
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './Dashboard.css';
import axios from "axios";
import Cookies from "js-cookie";
const Dashboard=(props)=>
{
    const navigate = useNavigate();
    useEffect(() => {
        document.body.style.backgroundImage=null;
        document.body.style.backgroundColor="#23242a";
        getEvents();
      }, []);


function run()
{
    navigate('/Run');
}
function con()
{
    navigate('/Contest');
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
}
const create=()=>
{
  navigate("/Con2");
}

const part=()=>{
  navigate("/viquest");
}
    return(
    <>
    <Unav data={{page:"dashboard"}} />
    <Container style={{marginTop:"300px"}}>
        <Row>
            <Col>
    <CCard className="ccard" style={{ width: '18rem' }}>
            <CCardImage orientation="top" height={"165px"} src={pic} />
            <CCardBody>
            <CCardTitle className="ctit"  >PRACTICE</CCardTitle>
            <CCardText className="ctex">
                <p>pratice coding</p>
            </CCardText>
            <Button onClick={part} className="but" label="GET IN!" icon="pi pi-sign-in"></Button>
            </CCardBody>
            </CCard>
</Col>
          <Col>
            <CCard className="ccard" style={{ width: '18rem' }}>
            <CCardImage orientation="top" src={pic1} />
            <CCardBody>
            <CCardTitle className="ctit" >CONTEST</CCardTitle>
            <CCardText className="ctex">
                <p>Host and particpate contests</p>
            </CCardText>
            <Button onClick={con} className="but" label="GET IN!" icon="pi pi-sign-in"></Button>

            </CCardBody>
            </CCard>
            <br></br>
            <br></br>
            <Button style={{marginLeft: "45px"}} className="but" onClick={create} label="ADD QUESTIONS FOR PRACTICE!" icon="pi pi-plus"></Button>
            </Col>

            <Col>
            <CCard className="ccard" style={{ width: '18rem' }}>
           <CCardImage orientation="top" height={"165px"} src={pic2} />
            <CCardBody>
            <CCardTitle className="ctit" >CODE GROUND</CCardTitle>
            <CCardText className="ctex">
              
          <p>Run your code</p>
              
            </CCardText>
            <Button className="but" onClick={run}label="GET IN!" icon="pi pi-sign-in"></Button>

            </CCardBody>
            </CCard>
            </Col>
            </Row>
            </Container>
    </>
    
    
    
    
    );

}

export default Dashboard;