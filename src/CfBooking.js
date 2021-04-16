import React from 'react';
import { Button,Table,ButtonGroup} from 'reactstrap';
import axios from 'axios';
import {Apiurl} from './config'
import {withRouter} from "react-router-dom";
import { Jumbotron} from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Dropdown,DropdownButton,Row} from 'react-bootstrap';
import socketIOClient from "socket.io-client";
const images = require.context('./pic', true)



class Update extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,data:[],Loading:false,status:1
    };
    this.getReservation();
  }
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  getReservation(){
    axios.get(Apiurl+'/loaduserreser')
    .then(response =>{
      this.setState({
        data:response.data,
        Loading:true,
        status:1
      },()=>console.log(this.state))
    }).catch(error =>{
        console.log(error);
    })
  }

  getReservationConfirmAD(){
    axios.get(Apiurl+'/loaduserreserConfirm')
    .then(response =>{
      this.setState({
        data:response.data,
        Loading:true,
        status:2
      },()=>console.log(this.state))
    }).catch(error =>{
        console.log(error);
    })
  }
  getReservationUnapproveAD(){
    axios.get(Apiurl+'/loaduserreserUnapprove')
    .then(response =>{
      this.setState({
        data:response.data,
        Loading:true,
        status:3
      },()=>console.log(this.state))
    }).catch(error =>{
        console.log(error);
    })
  }

  ShowNotification = (data) =>{
    NotificationManager.warning(data.detail, data.name)
    this.getReservation();
  }

  componentDidMount = () => {
    const {endpoint} = Apiurl;
    //Very simply connect to the socket
    
    const socket = socketIOClient(Apiurl);
    socket.on("admin", data => this.ShowNotification(data));
  }

  

  
 
  Update(id,status){
    const Swal = require('sweetalert2');
    const data ={id:id,status:status}
    axios.post(Apiurl+'/update',data)
    .then(response =>{
      console.log(response);
      if(status === "อนุมัติ"){
      Swal.fire({
        type: 'success',
        title: 'ยืนยันสำเร็จ',
        showConfirmButton: false,
        timer: 2000
      }) 
      
      this.getReservationConfirmAD()
      
    }else{
      Swal.fire({
        type: 'success',
        title: 'ยกเลิกสำเร็จ',
        showConfirmButton: false,
        timer: 2000
      })
      this.getReservationUnapproveAD()
    }
    }).catch(err =>{
      console.log(err);
    })
  }

    render() {
      let Mock = this.state.data.map((item,i) => {
        const id = item.id_reser;
        return (

      <tr>
        <th style={style2}>{i+1}</th>
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{item.course_name}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.description}</td>
        <td>{item.statusbooking}</td>
        <td><Button color="success" onClick={()=>this.Update(id,"อนุมัติ")}  disabled={item.statusbooking === "อนุมัติ" || item.statusbooking === "ไม่อนุมัติ" ? true : false} >อนุมัติ</Button>{' '}</td>
        <td><Button color="danger" onClick={()=>this.Update(id,"ไม่อนุมัติ")} disabled={item.statusbooking === "อนุมัติ" || item.statusbooking === "ไม่อนุมัติ" ? true : false}>ไม่อนุมัติ</Button>{' '}</td>
        
      </tr>
        );
      });
      return (
        <div >
          <Jumbotron className="bgColorjum" style={{height:'500px' ,overflow:'auto'}}> 
            <DropdownButton variant="info" title="สถานนะ" style={{float:'right',marginTop:'-10px'}} >
              <Dropdown.Item as="button" onClick={() => this.getReservation()}>รอดำเนินการ</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => this.getReservationConfirmAD()}>อนุมัติ</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => this.getReservationUnapproveAD()}>ไม่อนุมัติ</Dropdown.Item>
            </DropdownButton>
           <Row> 
           <h5>ยืนยันการจองคิว</h5>
           <h5 style={{paddingLeft:'30%'}}>สถานะ  : {this.state.status == 1 ? "รอดำเนินการ" : this.state.status == 2 ? "อนุมัติ" :this.state.status == 3 && "ไม่อนุมัติ"}</h5>
           </Row>
             
            <Table responsive hover >
        <thead>
          <tr>
            <th style={style2}>No.</th>
            <th style={{width:'10%'}}>ชื่อจริง</th>
            <th style={{width:'10%'}}>นามสกุล</th>
            <th>คอร์ส</th>
            <th>วัน</th>
            <th>เวลา</th>
            <th style={{width:'10%'}}>รายละเอียด</th>
            <th>สถานะ</th>
            <th>อนุมัติ</th>
            <th style={{width:'10%'}}>ไม่อนุมัติ</th>
          </tr>
        </thead>
        <tbody style={{overflow: 'scroll '}}> 
          {this.state.Loading ? Mock : ""}
        </tbody>
      </Table>
      
 
        <NotificationContainer/>
      </Jumbotron>
      
      </div>
    );
  }
}
const style1={
    marginleft:'300px'
   
}
const style2={
  whight:'1%',
  right:'5%',
  left:'5%'
}
export default withRouter(Update)