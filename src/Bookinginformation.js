import React from 'react';
import { Table} from 'reactstrap';
import bin from './pic/bin.png';
import {Route} from "react-router-dom";
import {Modal,ButtonToolbar} from 'react-bootstrap';
import axios from 'axios';
import {Apiurl} from './config'
import {Dropdown,DropdownButton,Row} from 'react-bootstrap';
import { Button, ButtonGroup ,Input} from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Badge from '@material-ui/core/Badge';
import socketIOClient from "socket.io-client";
import { createNotification } from './notification'



const images = require.context('./pic', true)


export default class Bookinginformation extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,data:[],Loading:false,status:1
        };
        this.getReservation();
     
      }
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow(id){
        const Swal = require('sweetalert2');
        this.setState({ idaction:id },()=>console.log(this.state));
      Swal.fire({
        title: '',
        text: "คุณต้องการจะยกเลิกการจองคิวหรือไม่?",
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true,
        confirmButtonColor: '#00CC00',
        cancelButtonColor: '#EE0000'
      }).then((result) => {
        if (result.value) {
          const data = {id:id}
          axios.post(Apiurl+'/canclereser',data)
        .then(res =>{
          if(res.data === "Success"){
            Swal.fire(
              'สำเร็จ!',
              'ทำการยกเลิกสำเร็จ',
              'success'
            )
            this.getReservationConfirm();
          }
        }).catch(error =>{
          console.log(error);
        })
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
         return;
        }
      })
    }
    
      
    
      getReservation(){
        var id = localStorage.getItem("id");
        const data = {id:id}
        axios.post(Apiurl+'/LoadReser',data)
        .then(response =>{
          console.log(response.data)
          this.setState({
            data:response.data,
            Loading:true,
            status:1
          },()=>console.log(this.state))
        }).catch(error =>{
            console.log(error);
        })
      }

      getReservationConfirm(){
        var id = localStorage.getItem("id");
        const data = {id:id}
        axios.post(Apiurl+'/LoadReserComfirm',data)
        
        .then(response =>{
          
          console.log(response.data)
          this.setState({
            data:response.data,
            Loading:true,
            status:2
          }
          ,()=>console.log(this.state))
         
        }).catch(error =>{
            console.log(error);
        })
      }
      getReservationUnapprove(){
        var id = localStorage.getItem("id");
        createNotification('info')
        const data = {id:id}
        axios.post(Apiurl+'/LoadReserUnapprove',data)
        .then(response =>{
          console.log(response.data)
          this.setState({
            data:response.data,
            Loading:true,
            status:3
          },()=>console.log(this.state))
        }).catch(error =>{
            console.log(error);
        })
      }

      NotificationShow = (data) =>{
        if(data.type == 1){
          NotificationManager.success(data.detail, data.name)
          this.getReservationConfirm()
        }else{
          NotificationManager.error(data.detail, data.name)
        }
        
      }

      componentDidMount = () =>{ 
        
        const id = localStorage.getItem("id")
        const {endpoint} = Apiurl;
        //Very simply connect to the socket
        
        const socket = socketIOClient(Apiurl);
        socket.on(id, data => this.NotificationShow(data) );
      }

      
     
      Load(){
        this.state.data.map((item,i) => <tr>
        <th style={style2}>{i+1}</th>
        <td>{item.firstname}</td>
        <td>{item.lastname}</td>
        <td>{console.log(item)}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.description}</td>
        <td>{item.statusbooking}</td>
        <td><img src={bin} onClick={this.handleShow} /></td>
      </tr>);
      console.log(this.state.data);
      }

  
    render() {
      let Mock = this.state.data.map((item,i) => {
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
        <td><img src={bin} onClick={() => this.handleShow(item.id_reser)} /></td>
      </tr>
        );
      });
      return (
        
        <div>
          {this.state.Loading ? <div>
            <Jumbotron className="bgColorjum" style={{height:'500px' ,overflow:'auto'}}>
            <DropdownButton variant="info" title="สถานนะ" style={{float:'right',marginTop:'-10px'}} >
              <Dropdown.Item as="button" onClick={() => this.getReservation()}>รอดำเนินการ  </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => this.getReservationConfirm()}>อนุมัติ  </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => this.getReservationUnapprove()}>ไม่อนุมัติ </Dropdown.Item>
            </DropdownButton>
            <Row>
            <h3>ประวัติการจอง</h3>
            
            <h5 style={{paddingLeft:'30%'}}>สถานะ  : {this.state.status == 1 ? "รอดำเนินการ" : this.state.status == 2 ? "อนุมัติ" :this.state.status == 3 && "ไม่อนุมัติ"}</h5>
            </Row>
            
            <Table responsive hover >
            
        <thead>
          <tr>
            <th style={style2} >No.</th>
            <th style={{width:'10%'}}>ชื่อจริง</th>
            <th style={{width:'10%'}}>นามสกุล</th>
            <th>คอร์ส</th>
            <th>วัน</th>
            <th>เวลา</th>
            <th style={{width:'10%'}}>รายละเอียด</th>
            <th>สถานะ</th>
            <th>ยกเลิก</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data ? Mock : "" }
        </tbody>
      </Table>
      <NotificationContainer/>
   
      </Jumbotron > 
           </div> : "กำลังโหลด"}
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
