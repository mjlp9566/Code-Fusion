import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Cookies from "js-cookie";
import { useNavigate,useLocation } from 'react-router-dom';
import { loader } from '@monaco-editor/react';
import { Toast } from 'primereact/toast';
import * as monaco from 'monaco-editor'
import Unav  from './Nav';
import img from './favicon.png'
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './prac.css'

const Prac_ground=(props)=> {
  const inpp=[];
  const {state} = useLocation();
  const { qid,qdet } = state;
const [cus_en,setcus]=useState(true)
    const toast = useRef(null);
  loader.config({monaco})
  const navigate = useNavigate();
  const [code, setCode] = useState("#include<stdio.h>\nint main() \n{\n //your code goes here\n} ");
  const [op, setOp] = useState("");
  const [cusTest, setCusTest] = useState("");
  const [lang, setLang] = useState("c");
  const [theme, setTheme] = useState("vs-dark");
  const [seconds,setSeconds]=useState(0);
 //const [qdet,setqdet]=useState([]);
  const [exp,setexp]=useState([]);
  const [your,setyour]=useState([]);
  const [inp,setinp]=useState([]);
  const [ftc,setftc]=useState([]);
  const [bor,rebor]=useState(false);
 const [showCus,setShowCus]=useState(true);

  var second=0;
 var flag=true;
  useEffect(() => {
    document.body.style.backgroundImage=null;
    document.body.style.backgroundColor="#23242a";
    getEvents();
  }, [qdet]);


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
        
          axios
          .post("http://localhost:8081/get_uname", {
          sess:Cookies.get("sess")
          })
          .then((res) => {
           
            Cookies.set("user",res.data);
          })
          .catch((err) => { console.log("error"); },[]);
          setInterval(setTime, 1000);

   
      })
      .catch((err) => {},[]);

 
      
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
    setShowCus(false)
    axios
      .post("http://localhost:8081/prac", {
        pro: code,
        lang:lang,
        sessi:Cookies.get('sess'),
        qid:qid,
        time:seconds
      })
      .then((res) => {
        setftc(res.data.op.tc);
    
   
  
   setyour(res.data.op.yours);
   setexp(res.data.op.exp);
   setinp(res.data.op.inp);
   
    
   /*var delayInMilliseconds = 2000; //1 second

   setTimeout(function() {
    if(ftc.length!==0){
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Successfully submitted', life: 3000 });
        }
        else{
         toast.current.show({ severity: 'failure', summary: 'Failure', detail: 'Submission failed', life: 3000 });
        }
   }, delayInMilliseconds);*/
 
      })
      .catch((err) => { console.log("error"); });


 
  };
const show=()=>
{
your.map((i)=>{
return(
<p>{i}</p>
)
})
}
  const handleRun = (e) => {
    e.preventDefault();
    let c;
    if(cus_en===false)
     c=1
    else
     c=0;
setShowCus(true)
    axios
      .post("http://localhost:8081/crun", {
        pro: code,
        test: cusTest,
        lang: lang,
        cus_en:c,
        sessi:Cookies.get('sess'),
        qid:qid,
      })
      .then((res) => {
        setexp(res.data.res.ex_op)
        setOp(res.data.res.yo_op)
      })
      .catch((err) => { console.log("error"); });
  };

  const options = {
    selectOnLineNumbers: true
  };
const rawHTML = `
<div >
  <p  >The <strong>rat</strong> hates the uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu<strong>cat</strong></p>
  <p><i>This is something special</i></p>
  <div>
  </div>
  <h1>H1</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <h4>Just Another Heading</h4>
</div>`

    return (
      <>
     <Unav  data={{page:"code_ground",time:seconds,}}/>
     <Toast ref={toast} />
     <br></br>
     <Container>
        <Row>
    <Col sm={5}>
    <Row >
    
        <h2><u>{qdet[0].qname}</u></h2>
 
      <br></br>
        <div dangerouslySetInnerHTML={{__html:qdet[0].desc}}></div>
      
    </Row>
    <Container>
    <Row>
        <Col>
        <p>sample input</p>
        <textarea  className="box" id="outer" readOnly={true} name="cus_test" rows={5} cols={20}  value={qdet[0].sip}></textarea>

        </Col>

        <Col>
       <p>sample output</p>
       <textarea  className="box" id="outer" readOnly={true}  name="cus_test" rows={5} cols={20}  value={qdet[0].sop} ></textarea>

        </Col>
    </Row>
    </Container>
    </Col>
 
<Col style={{paddingLeft:"70px"}}>
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
  
     <Editor
      id="editor"
        height={"50vh"}
        language={lang}
        theme={theme}
        value={code}
        width={"80vh"}
        onChange={onChange}
    
    />
    <br></br>
<Container>
<Row>
<Col>
<Button  id="runbut" style={{paddingLeft:"10px"}}className="btn btn-danger navbar-btn" onClick={handleRun}>RUN</Button>
</Col>
&nbsp;
<Col>
<Button  id="subbut" className="btn btn-danger navbar-btn" onClick={handleSubmit}>SUBMIT</Button>&nbsp;
<input type="checkbox" onChange={() => setcus(!cus_en)}></input>&nbsp;<span style={{color:"white"}}>custom input?</span>
</Col>
</Row>
</Container>

  <br></br>

<Container style={{display:showCus? 'block' : 'none'}}>
<Row>
    <Col xs={6}>
    <div >
    <h5 style={{color:"#95ef1d"}}>CUSTOM INPUT</h5>
<textarea disabled={cus_en} className="box" id="outer"  name="cus_test" rows={5} cols={20} value={cusTest} onChange={onChangetext}></textarea>
</div>
</Col>
<Col>
<h5 style={{color:"#95ef1d"}}>OUTPUT</h5>
<textarea className="box" id="outer" readOnly={true} rows={10} cols={50} value={op}></textarea>
</Col>
</Row>
</Container>

<Container>
{/*EXPECTED OUTPUT and YOUR OUTPUT*/}
<Row style={{display:!showCus? 'block' : 'none'}}>
<Button style={{marginLeft:"10px"}} onClick={()=>setShowCus(!showCus)}>SHOW CUTOM INPUT BOX</Button>
<h5 style={{color:"#95ef1d"}}>INPUT</h5>
<textarea className="box" id="outer"  readOnly={true} name="cus_test" style={{height:"100%",width:"100%"}} rows={5} cols={20} value={inp.toLocaleString().replace(",","\n\n")} ></textarea>
 
</Row>

    <Row>
    <h5 style={{color:"#95ef1d"}}>EXPECTED OUTPUT</h5>
<textarea className="box" id="outer"   readOnly={true} name="cus_test" style={{height:"100%",width:"100%"}} rows={5} cols={20} value={exp.toLocaleString().replace(",","\n\n")} ></textarea>
</Row>
<Row style={{display:!showCus? 'block' : 'none'}}>
<h5 style={{color:"#95ef1d"}}>YOUR OUTPUT</h5>
<textarea className="box" id="outer" readOnly={true} rows={5} cols={20} style={{height:"100%",width:"100%"}}  value={your.toLocaleString().replace(",","\n\n")}></textarea>
</Row>
<Row style={{display:!showCus? 'block' : 'none'}}>
<h5 style={{color:"#95ef1d"}}>FAILED TESTCASES</h5>
<textarea className="box" id="outer" readOnly={true} rows={5} cols={20} style={{height:"100%",width:"100%"}}   value={ftc.toLocaleString().replace(",","\n\n")}></textarea>
</Row>

</Container>

</Col>
</Row>
</Container>

</>
    );
  }


export default Prac_ground;