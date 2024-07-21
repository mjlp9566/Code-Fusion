import Unav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import React,{ useEffect,useState } from "react";
import './Con1.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';


const Con1=(props)=>
{

    const [stime, setstime] = useState(null);
    const [etime, setetime] = useState(null);
    const [conname,setconname]=useState("");
    const [condesc,setcondesc]=useState("");
    const navigate=useNavigate();
   useEffect(() => {
        document.body.style.backgroundImage=null;
        document.body.style.backgroundColor="#23242a";
        getEvents();
      }, []);
      const [disable,setdisable]=useState(false);
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

function al()
{
  let st=new Date(stime);
  let et=new Date(etime);
  let now=new Date();
  let f1=true,f2=true,f3=true,f4=true;
if(etime!=null && st.getDate()>et.getDate())
{
    alert("END DATE SHOULD BE GREATER THAN STAR DATE");
    f1=false;
}

if(st.getDate()<now.getDate())
{
    alert("START DATE SHOULD NOT BE IN PAST");
    f2=false;
}
/*if(st.getTime()<now.getTime())
{
    alert("START TIME SHOULD BE GRATER THAN CURRENT TIME");
    f3=false;
}*/
if(f1===true && f2===true)
{
    if(disable===true)
    {
      et=0;
    }
    navigate("/Con2",{ state: { name:conname,desc:condesc,start:st,end:et } });

}
else{
    alert("check details");
}
}
return(


<>
<Unav data={{page:"con1"}}/>
<br></br>
<div className="form-container">
    <form  onSubmit={al}>
    <h2>Contest Form</h2>
 
      <label >Contest Name:</label>
      <input onChange={(e) => setconname(e.target.value)} type="text" required></input>
      
      <label>Start Date:</label>
      <Calendar showButtonBar={true} minDate={new Date()} required value={stime} onChange={(e) => setstime(e.value)}  dateFormat="dd/mm/yy" showTime showSeconds />

      
      <label >End Date:</label>
      <Calendar showButtonBar={true} minDate={new Date()} disabled={disable} required value={etime} onChange={(e) => setetime(e.value)}  dateFormat="dd/mm/yy" showTime showSeconds />
      <br></br>
      <input type="checkbox" onChange={() => setdisable(!disable)}></input>&nbsp;<span>no end time</span>
<br></br>
      <label >Contest Description:</label>
      <InputTextarea onChange={(e) => setcondesc(e.target.value)}required  rows={5} cols={43} />

      
      <input type="submit"></input>
</form>
  </div>
</>


)
}
export default Con1;