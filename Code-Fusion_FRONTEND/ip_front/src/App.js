import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor'
import Unav  from './Nav';
import img from './favicon.png'
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './App.css'
const App=(props)=> {

  loader.config({monaco})
  const navigate = useNavigate();
  const [code, setCode] = useState("#include<stdio.h>\nint main() \n{\n //your code goes here\n} ");
  const [op, setOp] = useState("");
  const [cusTest, setCusTest] = useState("");
  const [lang, setLang] = useState("c");
  const [theme, setTheme] = useState("vs-dark");
  const [seconds,setSeconds]=useState(0);

  var second=0;
 var flag=true;
  useEffect(() => {
    document.body.style.backgroundImage=null;
    document.body.style.backgroundColor="#23242a";
    getEvents();
  }, []);


 const onBLur=()=>
 {
  flag=false;
 }
 const onFocus=()=>
 {
flag=true;
 }
  
  const setTime=()=> {
    if(flag===true){
      second++;
      setSeconds(second);
    }
   
  }

  

  const getEvents = () => {
 
window.addEventListener("blur",onBLur)
window.addEventListener("focus",onFocus);

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
          setInterval(setTime, 1000);
        }
      })
      .catch((err) => {});
      
  };

  const handleLang = (event) => {
    setLang(event.target.value);
    setOp("");
    if (event.target.value === "python") {
      setCode("#your code goes here");
    } else if (event.target.value === "java") {
      setCode("class Main {\n    public static void main(String[] args) {\n        //your code goes here\n   }\n}");
    } else if (event.target.value === "c") {
      setCode("#include<stdio.h>\nint main() \n{\n //your code goes here\n}");
    }
  };

  const handleTheme = (event) => {
    setTheme(event.target.value);
  };


  const onChange = (newValue, e) => {
    setCode(newValue);
  };

  const onChangetext = (e) => {
    setCusTest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/run", {
        pro: code,
        test: cusTest
      })
      .then((res) => {
        setOp(res.data.op);
        console.log(res.data.op);
      })
      .catch((err) => { console.log("error"); });
  };

  const handleRun = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/run", {
        pro: code,
        test: cusTest,
        cus_en: "1",
        lang: lang,
        sess:Cookies.get('sess')
      })
      .then((res) => {
        setOp(res.data.op);
        console.log(res.data.op);
      })
      .catch((err) => { console.log("error"); });
  };

  const options = {
    selectOnLineNumbers: true
  };


    return (
      <>
     <Unav  data={{page:"code_ground",time:seconds,}}/>
     <br></br>
       <div>
      <FormControl sx={{ minWidth: 90 }}>
        <InputLabel style={{color:"#95ef1d"}}id="demo-simple-select-label">Language</InputLabel>
        <Select
        style={{color:"#95ef1d"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Language"
  
          onChange={handleLang}
        >
          <MenuItem style={{color:"#95ef1d"}} value={"c"}>C</MenuItem>
          <MenuItem style={{color:"#95ef1d"}} value={"python"}>Python</MenuItem>
          <MenuItem  style={{color:"#95ef1d"}} value={"java"}>Java</MenuItem>
        </Select>
      </FormControl>
    
 
   &nbsp;
      <FormControl style={{color:"#95ef1d"}} sx={{ minWidth: 90 }}>
        <InputLabel style={{color:"#95ef1d"}} id="demo-simple-select-label">Theme</InputLabel>
        <Select
         style={{color:"#95ef1d"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={theme}
          label="Theme"
          onChange={handleTheme}
        >
          <MenuItem style={{color:"#95ef1d"}} value={"vs-light"}>Light</MenuItem>
          <MenuItem style={{color:"#95ef1d"}} value={"vs-dark"}>Dark</MenuItem>
    
        </Select>
      </FormControl>
    </div>
    <br></br>
    <Container>
      <Row >
        <Col sm={8}>
     <Editor
      id="editor"
      
        height={"50vh"}
        language={lang}
        theme={theme}
        value={code}
        width={"100vh"}
        onChange={onChange}
    
    />

  
{/*<button onClick={handleSubmit}>SUBMIT</button>*/}
<br></br>

<Button className="btn btn-danger navbar-btn" onClick={handleRun}>RUN</Button>

</Col>


<Col xs lg="2">

  <br></br>
<h5 style={{color:"#95ef1d"}}>CUSTOM INPUT</h5>

<textarea className="box" id="outer" name="cus_test" rows={5} cols={20} value={cusTest} onChange={onChangetext}></textarea>
<h5 style={{color:"#95ef1d"}}>OUTPUT</h5>
<textarea className="box" id="outer" readOnly={true} rows={10} cols={50} value={op}></textarea>

</Col>
</Row>
</Container>

</>
    );
  }


export default App;