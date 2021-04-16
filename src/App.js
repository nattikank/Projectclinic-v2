import React, { Component,useState } from 'react';
import Login from './Login';
import Home from './Home';
import { BrowserRouter as Router, Route,Redirect,withRouter} from "react-router-dom";
import Register from './Register';
import Update from './Update';
import './App.css';
import Navigation from './Navigation';
import Footer from './Footer';
import CfBooking from './CfBooking';
import Contact from './Contact';
import Booking from './Booking';
import Myaccount from './Myaccount';
import Bookinginformation from './Bookinginformation';
import Course1 from './Course1';
import Course2 from './Course2';
import Course3 from './Course3';
import Botox from './Botox';
import Aura from './Aura';
import Course_total from './Course_total';
import Updatecourse from './Updatecourse';
import {Button,Label} from 'reactstrap'
import BookingAdmin from './BookingAdmin'
import ContactMsg from './ContactMsg'
const App = () =>{
  
  const [open,Setopen] = useState(true)
 
  function redirect(){
    return(
      <Redirect to='/Login' />
    )
  }
  
  return(
  <Router>
    <div style={{position:'relative'}}>
    <div className="container">
      <Navigation />

      <div style={{marginTop:'15px'}}>

      <Route exact path="/" component={Homena} />
      <Route path="/Login" component={Login_} />
      <Route path="/Register" component={Register_} />
      <Route path="/Update" component={Update_} />
      <Route path="/CfBooking" component={CfBooking_} />
      <Route path="/Contact" component={Contact_} />
      <Route path="/Booking" component={Booking_} />
      <Route path="/Myaccount" component={Myaccount_} />
      <Route path="/Bookinginformation" component={Bookinginformation_} />
      <Route path="/Course1" component={Course1_} />
      <Route path="/Course2" component={Course2_} />
      <Route path="/Course3" component={Course3_} />
      <Route path="/Botox" component={Botox_} />
      <Route path="/Aura" component={Aura_} />
      <Route path="/Course_total" component={Course_total_} />
      <Route path="/Updatecourse" component={Updatecourse_} />
      <Route path="/BookingAdmin" component={BookingAdmin_}/>
      <Route path="/ContactMsg" component={ContactMsg_}/>
      </div>
      
      <Footer />
    </div>   
    </div> 
  </Router>
  )
  
}

const Homena = () => (
  <div>
    <Home />
  </div>
);


const Login_ = () => (
  <div>
    <Login />
  </div>
);
const Register_ = () => (
  <div>
    <Register />
  </div>
);
const Update_ = () => (
  <div>
    <Update />
  </div>
);
const CfBooking_ = () => (
  <div>
    <CfBooking />
  </div>
);
const Contact_ = () => (
  <div>
    <Contact />
  </div>
);
const Booking_ = () => (
  <div>
    <Booking />
  </div>
);
const Myaccount_ = () => (
  <div>
    <Myaccount />
  </div>
);
const Bookinginformation_ = () => (
  <div>
    <Bookinginformation />
  </div>
);
const Course1_ = () => (
  <div>
    <Course1 />
  </div>
);
const Course2_ = () => (
  <div>
    <Course2 />
  </div>
);
const Course3_ = () => (
  <div>
    <Course3 />
  </div>
);
const Botox_ = () => (
  <div>
    <Botox />
  </div>
);
const Aura_ = () => (
  <div>
    <Aura />
  </div>
);
const Course_total_ = () => (
  <div>
    <Course_total/>
  </div>
);
const Updatecourse_ = () => (
  <div>
    <Updatecourse/>
  </div>
);

const BookingAdmin_ = () => (
  <div>
    <BookingAdmin/>
  </div>
);
const ContactMsg_ = () => (
  <div>
    <ContactMsg/>
  </div>
);



export default App;


