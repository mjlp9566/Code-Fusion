import axios from "axios";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const Getqfet=(props)=>
{
    const navigate = useNavigate();
    const { state } = useLocation();
    const { qid } = state;
    const [qdet,setqdet]=useState([]);
    axios
    .post("http://localhost:8081/getqdet", {
    sessi:Cookies.get("sess"),
    qid:qid
    })
    .then(res => {

setqdet(res.data)
navigate("/prac_ground",{state:{ "qid":qid,"qdet":res.data }})
    })
  

}
export default Getqfet;