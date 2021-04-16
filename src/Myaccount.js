import React from 'react';
import { Col, Row, Button, Form,FormGroup, Label, Input} from 'reactstrap';
import {Modal,ButtonToolbar} from 'react-bootstrap';
import { Jumbotron } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import logo from './pic/logo.png'
import {Apiurl} from './config'
import axios from 'axios';
import {withRouter} from "react-router-dom";

class Myaccount extends React.Component {
    constructor(props ,context) {
        super(props ,context);
        this.toggle = this.toggle.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,firstname:'',lastname:'',address:'',tel:'',data:[]
          };
      }
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      handleClose() {
        this.setState({ show: false });
      }
      handle(e){
        this.setState({[e.target.name]: e.target.value},()=>console.log(this.state));
      }
      handleShow() {
        this.setState({ show: true });
      }
      Editprofile(){
        const Swal = require('sweetalert2');
        const id = localStorage.getItem("id");
        const data = {firstname:this.state.firstname,lastname:this.state.lastname,address:this.state.address,tel:this.state.tel,id:id};
        axios.post(Apiurl+'/EditProfile',data)
        .then(response =>{
          // console.log(response.data)
          // this.setState({
          //   data:response.data,
          //   Loading:true
          // },()=>console.log(this.state))
          // console.log('success');
        Swal.fire({
          type: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ',
          text:'กรุณาออกจากระบบเพื่อทำการอัพเดทข้อมูล',
          showConfirmButton: false,
          timer: 3000
        })
        this.setState({
          show: false
        })
        this.props.history.push("/Myaccount");
        }).catch(error =>{
            console.log(error);
        })
        
      }
        
  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
        <div>
    
      <Jumbotron className="bgColorjum">
      <h4>ข้อมูลส่วนตัว</h4>
       <hr/>
      <Row form style={{marginTop:'20px'}}>
      <Col md={6}>
      <Form style ={style1}>
      
        
        {/* <Col md={6}>
          <Col md={12}> */}
            <FormGroup>
              <Label for="exampleEmail">อีเมล</Label> : <Label for="email">{localStorage.getItem("mail")}</Label>
              </FormGroup>
          {/* </Col>  
        <Col md={12}> */}
            <FormGroup>
              <Label for="firstname">ชื่อจริง</Label> : <Label for="firstname">{localStorage.getItem("name")}</Label>
              
            </FormGroup>
          {/* </Col>
          <Col md={12}> */}
          <FormGroup>
              <Label for="lastname">นามสกุล</Label> :  <Label for="lastname">{localStorage.getItem("lname")}</Label> 
          </FormGroup>
          {/* </Col>
          <Col md ={12}> */}
            <FormGroup>
              <Label for="Address">ที่อยู่</Label> : <Label for="Address">{localStorage.getItem("address")}</Label>
              
            </FormGroup>
        {/* </Col>
          <Col md={6}> */}
            <FormGroup>
              <Label for="tel">เบอร์โทรศัพท์</Label> : <Label for="tel">{localStorage.getItem("tel")}</Label>
              
            </FormGroup>
          {/* </Col>
          </Col> */}
        
       
        <Button style ={button} onClick={this.handleShow}>แก้ไขข้อมูลส่วนตัว</Button>
      </Form>
      </Col>
      <Col md={6}>
        <Image src={logo} style={{width:'500px',height:'500px',marginTop:'-100px'}} />
       </Col>
      </Row>
      
      </Jumbotron >
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขข้อมูลส่วนตัว</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
          <Row form>
         
        <Col md={6}>
            <FormGroup>
              <Label for="firstname">ชื่อจริง</Label>
              <Input type="text" name="firstname" id="firstname" placeholder={localStorage.getItem("name")} value={this.state.firstname}  onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="lastname">นามสกุล</Label>
              <Input type="text" name="lastname" id="lastname" placeholder={localStorage.getItem("lname")} onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          <Col md ={12}>
            <FormGroup>
              <Label for="Address">ที่อยู่</Label>
              <Input type="text" name="address" id="address" placeholder={localStorage.getItem("address")} onChange={e => this.handle(e)}/>
            </FormGroup>
        </Col>
        
          <Col md={12}>
            <FormGroup>
              <Label for="tel">เบอร์โทรศัพท์</Label>
              <Input type="number" name="tel" id="tel" placeholder={localStorage.getItem("tel")} onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          
      
        </Row>
      
      
          </Modal.Body>
          <Modal.Footer>
            <Button color="danger" onClick={this.handleClose}>
              ยกเลิก
            </Button>
            <Button color="success" onClick={()=> this.Editprofile()}>
              บันทึก
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}
const style1 = {
    marginTop :'10px',
    padding :'10px'
}
const button = {
    marginTop :'15px',
    
}
export default withRouter(Myaccount)