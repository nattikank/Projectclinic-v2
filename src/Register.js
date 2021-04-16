import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input ,FormText} from 'reactstrap';
import axios from 'axios';
import {Route,withRouter,Redirect,Link} from "react-router-dom";
import { Jumbotron } from 'reactstrap';
import {Apiurl} from './config'
class Example extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,sex:'Male'
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      handle(e){
        this.setState({[e.target.name]: e.target.value},()=>console.log(this.state));
      }

      // sendfile = (e) =>{
      //   var bodyFormData = new FormData();
      //   bodyFormData.append("file",e.target.file[0])
      //   axios({
      //     method: 'post',
      //     url: `${Apiurl}/upload`,
      //     data: bodyFormData,
      //     config: { headers: {'Content-Type': 'multipart/form-data' }}
      //     })
      //     .then(function (response) {
      //         //handle success
      //         console.log(response);
      //     })
      //     .catch(function (response) {
      //         //handle error
      //         console.log(response);
      //     });
      // }

      Register(){
        const Swal = require('sweetalert2');
        const data = {email:this.state.email,password:this.state.password,firstname:this.state.firstname,lastname:this.state.lastname,address:this.state.address,sex:this.state.sex,tel:this.state.tel}
        axios.post(Apiurl+'/reg',data)
        .then(response =>{
            if(response.data.result === "success"){
              Swal.fire({
                type: 'success',
                title: 'ลงทะเบียนสำเร็จ',
                showConfirmButton: false,
                timer: 5000
              })
              setTimeout(this.props.history.push("/"), 5000)
            }
        }).catch(error =>{
            console.log(error);
        })
      }

        
  render() {
    return (
      <div>
      <Jumbotron className="bgColorjum">
      <Form >
       <h3>สมัครสมาชิก</h3>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="email" placeholder="with a placeholder"  onChange={e => this.handle(e)}  />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="password" placeholder="password placeholder"  onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
        <Col md={6}>
            <FormGroup>
              <Label for="firstname">ชื่อจริง</Label>
              <Input type="text" name="firstname" id="firstname" placeholder=""  onChange={e => this.handle(e)} />
            </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="lastname">นามสกุล</Label>
              <Input type="text" name="lastname" id="lastname" placeholder=""   onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          <Col md ={12}>
            <FormGroup>
              <Label for="Address">ที่อยู่</Label>
              <Input type="text" name="address" id="address" placeholder=""  onChange={e => this.handle(e)}/>
            </FormGroup>
        </Col>
        <Col md={6}>
            <FormGroup>
              <Label for="sex">เพศ</Label>
              <Input type="select" name="sex" id="sex" onChange={e => this.handle(e)}>
                <option value="Male">ชาย</option>
                <option value="Female">หญิง</option>
                </Input>
            </FormGroup>  
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="tel">โทรศัพท์</Label>
              <Input type="text" name="tel" id="tel"  onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          {/* <Col md={12}>
          <FormGroup>
          <Label for="exampleFile">Picture</Label>
            <Input type="file" name="file" id="exampleFile" onChange={(e)=>this.sendfile(e)} />
            <FormText color="muted">
              *กรุณาเลือกรูปภาพเพื่ออัพโหลด
            </FormText>
        </FormGroup>
        </Col> */}
        </Row>
        <Button style ={button} color="success"onClick={()=>this.Register()}>ยืนยันการสมัคร</Button>
      </Form>
      </Jumbotron>
      </div>
    );
  }
}
const style1 = {
    marginTop :'40px',
    padding :'10px'
}
const button = {
    marginTop :'15px',
    
}
export default withRouter(Example);