import Unav from "./Nav";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import React,{useEffect} from "react";
import axios from "axios";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { Button } from "primereact/button";
import './Contest.css'
const Contest=(props)=>
{
    const navigate=useNavigate();
    useEffect(() => {
        document.body.style.backgroundImage=null;
        document.body.style.backgroundColor="#23242a";
        getEvents();
      }, []);

      const Users = [
        {
          id: '01',
          name: 'C game',
          owner:'rit1'
        },
        {
          id: '02',
          name: 'Py Game',
          owner:'rit2'
        },
      ];
    
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
const actionBodyTemplate = () => {
  return <Button type="button" label="participate" icon="pi pi-sign-out" rounded></Button>;
};
function cr(){
  navigate("/Con1");
}
return(
<>

    <Unav data={{page:"contest"}} />
    <Container>
        <Row>
<Col>
{/*list for viewing contests*/}
<div  style={{marginTop:"10px"}} className="card">
            <DataTable value={Users} style={{marginTop:"10px"}} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
               
               className="datatable-responsive"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" >
                <Column field="id" header="Contest ID" style={{ width: '25%' }}></Column>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="owner" header="Owner" style={{ width: '25%' }}></Column>
                <Column style={{ width: '25%' }} body={actionBodyTemplate} />
                
            </DataTable>
     </div>  
</Col>

<Col>
<div className="side">
<Button type="button" style={{paddingLeft:"30px"}} className="butt" onClick={cr} label="CREATE CONTEST" icon="pi pi-sign-out" rounded></Button>
<br></br>
<br></br>
<Button type="button" className="butt" label="MANAGE CONTEST" icon="pi pi-sign-out" rounded></Button>
</div>
</Col>
        </Row>    
    </Container> 
</>
)
}
export default Contest;