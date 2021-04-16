import React from 'react';
import { Table} from 'reactstrap';
import bin from './pic/bin.png';
import {Route} from "react-router-dom";
import axios from 'axios';
import {Apiurl} from './config'
import { Button, ButtonGroup ,Input} from 'reactstrap';
import { Jumbotron } from 'reactstrap';


const images = require.context('./pic', true)


export default class ContactMsg extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            data:[]
        }
         this.getMsg();
      }
      
    
      getMsg(){
        var id = localStorage.getItem("id");
        const data = {id:id}
        axios.get(Apiurl+'/getMessage')
        .then(response =>{
          this.setState({
            data:response.data,
            Loading:true,
          },()=>console.log(this.state))
        }).catch(error =>{
            console.log(error);
        })
      }
      delectMsg(id){
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
          axios.post(Apiurl+'/deleteMsgCon',data)
        .then(res =>{
          
            Swal.fire(
              'สำเร็จ!',
              'ทำการยกเลิกสำเร็จ',
              'success'
            )
            this.getMsg();
          
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
     
      Load(){
        this.state.data.map((item,i) => <tr>
        <th style={style2}>{i+1}</th>
        <td>{item.firstnameCon}</td>
        <td>{item.lastnameCon}</td>
        <td>{item.emailCon}</td>
        <td>{item.msgCon}</td>
        <td><img src={bin} onClick={this.handleShow} /></td>
      </tr>);
      console.log(this.state.data);
      }

    render() {
      let Mock = this.state.data.map((item,i) => {
        return (
      <tr>
        <th style={style2}>{i+1}</th>
        <td>{item.firstnameCon}</td>
        <td>{item.lastnameCon}</td>
        <td>{item.emailCon}</td>
        <td>{item.msgCon}</td>
        <td><img src={bin} onClick={() => this.delectMsg(item.idcontact)} /></td>
      </tr>
        );
      });
      return (
        
        <div>
          {this.state.Loading ? <div>
            <Jumbotron className="bgColorjum" style={{height:'500px' ,overflow:'auto'}}>
            <h3>ข้อความ</h3>
            <Table responsive hover >
                <thead>
                <tr>
                    <th style={style2} >No.</th>
                    <th style={{width:'10%'}}>ชื่อจริง</th>
                    <th style={{width:'10%'}}>นามสกุล</th>
                    <th>อีเมล</th>
                    <th style={{width:'45%'}}>ข้อความ</th> 
                    <th>ลบ</th>
                </tr>
                </thead>
                <tbody>
                {this.state.data ? Mock : "" }
                </tbody>
            </Table>
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
