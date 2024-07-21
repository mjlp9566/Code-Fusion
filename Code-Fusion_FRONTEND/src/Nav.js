import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import './nav.css'
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import img from './favicon.ico'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Unav = (props) => {
    const navigate = useNavigate();
    const items = [
        {
            label: 'RIT-CODE GROUND',
            className: 'menubar-root',
            url:"/#",
           
        },
        {
            label:'Home',
            url:"/Dashboard",
            icon:"pi pi-home",
        },
       
        
    ];

    function Logout()
    {
    if(props.data.page==="code_ground"){
      Cookies.set('time',props.data.time);
      alert(props.data.page+props.data.time+Cookies.get("time"));
      navigate("/Logout");
    }
    else{
    Cookies.set('time',0);
        navigate("/Logout");
        
    }
    } 

    const start =<img alt="logo" src={img}  height="80" className="mr-2"></img>;
   const end=<div>&nbsp;&nbsp;&nbsp;
   <Button label="Logout" icon="pi pi-sign-out" onClick={Logout} iconPos="left" className="p-button-danger  p-button-text" /></div>;
   

    return (
        <div>
            <div className="card" style={{zIndex: 999}}>
                <Menubar style={{color:"#95ef1d"}} model={items} start={start} end={end}/>
                
            </div>
        </div>
    );
}
                
export default Unav;