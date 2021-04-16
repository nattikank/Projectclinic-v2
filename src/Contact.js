import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,CardText,Card, Row, Col } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import map from './pic/map.jpg';
import Image from 'react-bootstrap/Image';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Apiurl} from './config'

class Contact extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        firstnCon:'',
        lastnCon:'',
        emailCon:'',
        msgCon:''
      }
   
  }
  handle(e){
    this.setState({[e.target.name]: e.target.value},()=>console.log(this.state));
  }
  SendMsg(){
    const Swal = require('sweetalert2');
    const data = {firstnCon:this.state.firstnCon,lastnCon:this.state.lastnCon,emailCon:this.state.emailCon,msgCon:this.state.msgCon}
    axios.post(Apiurl+'/sendMsgContact',data)
    .then(response =>{
        
          Swal.fire({
            type: 'success',
            title: 'ส่งข้อความแล้ว',
            showConfirmButton: false,
            timer: 5000
          })
          setTimeout(this.props.history.push("/"), 5000)
        
    }).catch(error =>{
        console.log(error);
    })
  }
  render() {
    return (
      
      <Jumbotron className="bgColorjum">
  
      <Form style={{ padding:'1em 10%'}}>
        <div>
        <CardText style={style2}tag="h3">ติดต่อ</CardText>
        <Row form>
         <Col md={6}>
            <FormGroup>
            <Label>ชื่อจริง</Label>
            <Input className="bg-input" type="name" name="firstnCon" id="firstnCon" placeholder="ชื่อจริง"onChange={e => this.handle(e)}/>
            </FormGroup>
         </Col>
         <Col md={6}>
         <FormGroup>
          <Label >นามสกุล</Label>
          <Input className="bg-input"  type="lastname" name="lastnCon" id="lastnCon" placeholder="นามสกุล"onChange={e => this.handle(e)}/>
        </FormGroup>
         </Col>
         <Col md={12}>
         <FormGroup>
          <Label >อีเมล</Label>
          <Input className="bg-input"  type="email" name="emailCon" id="emailCon" placeholder="อีเมล"onChange={e => this.handle(e)}/>
        </FormGroup>
        </Col>
        </Row>
        <Row form>
         <Col md={12}>
            <FormGroup>
                <Label >ข้อความ</Label>
                <Input className="bg-input"  type="textarea" name="msgCon" id="msgCon" style={{height:'5em'}} onChange={e => this.handle(e)}/>
            </FormGroup>
         </Col>
        </Row>
        <Button color="success" style={style3} onClick={()=> this.SendMsg()}>ส่งข้อความ</Button>
        <Image src={map} style={{width:'100%' , marginTop:'50px'}}/ >
        </div>
      </Form>
    
      </Jumbotron>
    );
  }
}


const style2={
    margin: 'auto auto', 
    marginBottom: '0.7em',
    display: 'flex',
    aligncontent:'center',
}
const style3={
    position:'absolute'
    
}
  
export default withRouter(Contact)