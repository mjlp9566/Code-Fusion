import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Dialog } from "primereact/dialog"
import Unav from "./Nav";
import { Toast } from 'primereact/toast';
import { useEffect,useState,useRef } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import './COn2.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap"
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext"
import { Toolbar } from 'primereact/toolbar';
const Con2=(props)=>
{
    const toast = useRef(null);
   const [ed,seted]=useState(false);
    const {state} = useLocation();
    const navigate=useNavigate();
    const [lang, setLang] = useState("c");
//    const { name,desc,start,end } = state;
 
   
    let emptyProduct = {
        id:null,
        name:"",
        inp:"",
        op:""
      };
    const [value, setValue] = useState('');//question name
    const [obj,setobj] = useState('')
    const [sampleip,setsampleip] = useState('')
    const [sampleop, setsampleop] = useState('')
    const [pro, setpro] = useState('')
    const [submitted, setSubmitted] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(emptyProduct);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
   

   // const [test,settest]=([]);
 
 
    useEffect(() => {
         document.body.style.backgroundImage=null;
         document.body.style.backgroundColor="#23242a";
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
 }
let modules = {
    toolbar: [
 
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
 
    ],
}

let modules1 = {
    toolbar: []
}
const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
};
let formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


  const leftToolbarTemplate = () => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew}/>
           
        </div>
    );
};
const hideDialog = () => {
    setSubmitted(false);
    seted("false")
    setProductDialog(false);
};

const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);

};



const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
        let _products = [...products];
        let _product = { ...product };

        if (product.id) {
            const index = findIndexById(product.id);

            _products[index] = _product;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Testcase Updated', life: 3000 });
        } else {
            _product.id = createId();
           
            _products.push(_product);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Testcase Created', life: 3000 });
        }

        setProducts(_products);
        setProductDialog(false);
        setProduct(emptyProduct);
    }
};
const productDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
);
const editProduct = (product) => {
    setProduct({ ...product });
    seted(true);
    setProductDialog(true);
};

const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
};

const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    console.log(_products)
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Testcatse Deleted', life: 3000 });
};
const deleteProductDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
        <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
);
const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
};
const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
};

const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)}  />&nbsp;

            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
        </React.Fragment>
    );
};
const submit=()=>{
   if(value.trim()!="" && obj.trim()!="" && sampleip.trim()!="" && sampleop.trim()!="" && pro.trim()!="")
   {
    navigate("/Create",{ state: {qname:value,obj:obj,sip:sampleip,sop:sampleop,pro:pro,test:products,lang:lang} });
    console.log(products);

   }
   else{
  alert("ENTER ALL DETAILS")
   }
}

const handleLang = (event) => {
    setLang(event.target.value);
   
  };

    return (
<>
        <Unav  data={{page:"Con2"}}/>
        <Toast ref={toast} />
        <br></br>
    <Container>
<Row >
   <Col>
<h5 style={{  fontFamily: "'Courier New', Courier, monospace",
letterSpacing:"0.1em",
  color:"#95ef1d",
  fontSize:"xx-large"
  }}>Question Name</h5>
<ReactQuill  className="quill" formats={formats} modules={modules}  value={value} onChange={setValue} />
</Col>
</Row>

<Row>
    <Col>
    <h5 style={{  fontFamily: "'Courier New', Courier, monospace",
letterSpacing:"0.1em",
  color:"#95ef1d",
  fontSize:"xx-large"
  }}>Question Objective</h5>
<ReactQuill className="quill" formats={formats} modules={modules}  value={obj} onChange={setobj} />
</Col>
</Row>

         
<Row>
    <Col>
    <h5 style={{  fontFamily: "'Courier New', Courier, monospace",
letterSpacing:"0.1em",
  color:"#95ef1d",
  fontSize:"xx-large"
  }}>Sample Input</h5>
<textarea className="box" id="outer" name="cus_test" rows={5} cols={20} value={sampleip} onChange={(e)=>setsampleip(e.target.value)} />;
</Col>
</Row>

<Row>
    <Col>
    <h5 style={{  fontFamily: "'Courier New', Courier, monospace",
letterSpacing:"0.1em",
  color:"#95ef1d",
  fontSize:"xx-large"
  }}>Sample Output</h5>
<textarea className="box" id="outer" name="cus_test" rows={5} cols={20} value={sampleop} onChange={(e)=>setsampleop(e.target.value)} />;
</Col>
</Row>

<Row>
    <Col>
    <h5 style={{  fontFamily: "'Courier New', Courier, monospace",
letterSpacing:"0.1em",
  color:"#95ef1d",
  fontSize:"xx-large"
  }}>Test Program</h5> 
  <div style={{marginBottom:"10px"}}>
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
   </div>
   <textarea className="box" id="outer" name="cus_test" rows={5} cols={50}  value={pro} onChange={(e)=>setpro(e.target.value)} />;
</Col>
</Row>

<Row>

    <Col>
    <h5 style={{  fontFamily: "'Courier New', Courier, monospace",
letterSpacing:"0.1em",
  color:"#95ef1d",
  fontSize:"xx-large"
  }}>Test cases</h5>
<div  style={{marginTop:"10px"}} className="card">
<Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <DataTable value={products} style={{marginTop:"10px"}} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
               
               className="datatable-responsive"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" >
                              <Column field="id" header="Id" style={{ width: '20%' }}></Column>
                              <Column field="name" header="Name" style={{ width: '20%' }}></Column>
                <Column field="inp" header="Input" style={{ width: '20%' }}></Column>
                <Column field="op" header="Output" style={{ width: '20%' }}></Column>
                <Column body={actionBodyTemplate} exportable={false}  style={{ width: '20%' }} ></Column>
            </DataTable>
     </div>  
    </Col>
</Row>
<br></br>
<Row>
    <Col>
    <Button style={{color:"#23242a",backgroundColor:"#95ef1d"}} onClick={submit}>SUBMIT</Button>
    </Col>
</Row>


<Dialog visible={deleteProductDialog} style={{ width: '32rem' }} footer={deleteProductDialogFooter} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal  onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>


            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Testcase Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
              
        
                <div className="field">
                    <label  className="font-bold">
                        Name
                    </label>
                    <InputText id="description" value={product.name} onChange={(e) => onInputChange(e, 'name')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label  className="font-bold">
                        Input
                    </label>
                    <InputTextarea id="description" value={product.inp} onChange={(e) => onInputChange(e, 'inp')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label className="font-bold">
                        Output
                    </label>
                    <InputTextarea id="description" value={product.op} onChange={(e) => onInputChange(e, 'op')} required rows={3} cols={20} />
                </div>
            </Dialog>
</Container>

</>
    )

}
export default Con2;