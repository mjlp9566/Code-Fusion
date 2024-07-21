import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login'
import Logout from './Logout';
import reportWebVitals from './reportWebVitals';
import Reg from './Reg';
import Dashboard from './Dashboard';
import Contest from './Contest';
import Con1 from './Con1';
import Con2 from './Con2';
import Create from './Create';
import Prac_ground from './prac_ground'
import  {BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import ViQuest from './ViQuest';
import Getqfet from './getqfet';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <Router>

    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/Contest' element={<Contest />}></Route>
      <Route path='/Dashboard' element={<Dashboard />}></Route>
      <Route path='/Run' element={<App />}></Route>
      <Route path='/Logout' element={<Logout />}></Route>
      <Route path='/Register' element={<Reg />}></Route>
      <Route path='/Con1' element={<Con1 />}></Route>
      <Route path='/Con2' element={<Con2 />}></Route>
      <Route path='/Create' element={<Create/>}></Route>
      <Route path='/prac_ground' element={<Prac_ground/>}></Route>
      <Route path='/viquest' element={<ViQuest/>}></Route>
      <Route path='/getqdet' element={<Getqfet/>}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
