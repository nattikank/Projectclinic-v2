import React from 'react';
import { Button, Form, FormGroup, Label, Input,Card, CardText,CardFooter} from 'reactstrap';
import {Apiurl} from './config'

import axios from 'axios';
import {withRouter} from "react-router-dom";
class Login extends React.Component {
      constructor(){super();
        this.state={
          email:'',password:''
        }
      }
      handle(e){
        this.setState({[e.target.name]: e.target.value},()=>console.log(this.state));
      }
      CheckLogin(){
        const Swal = require('sweetalert2');
        const data ={ mail:this.state.email,password:this.state.password}
        axios.post(Apiurl+'/login',data)
        .then(response =>{
          console.log(response);
          if(response.data.status === "Success"){
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("name",response.data.firstname);
            localStorage.setItem("mail",response.data.mail);
            localStorage.setItem("lname",response.data.lastname);
            localStorage.setItem("sex",response.data.sex);
            localStorage.setItem("address",response.data.address);
            localStorage.setItem("tel",response.data.tel);
            localStorage.setItem("status",response.data.status_);
            localStorage.setItem("id",response.data.id);
            Swal.fire({
              type: 'success',
              title: 'เข้าสู่ระบบสำเร็จ',
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(this.props.history.push("/"), 2000);
          }else{  
            Swal.fire({
              type: 'error',
              title: 'รหัสผ่านผิดพลาด',
              text: 'กรุณาตรวจสอบรหัส!',
              showConfirmButton: false,
              timer: 2000
            })
          }
        }).catch(error =>{
          console.log(error);
        })
      }
      render() {
        return (
         <div style={{display: 'flex', justifyContent: 'center',aligncontent:'center',alignItems:'center', height: '70vh'}}> 
          <Card style={style1}>
          <CardText style={style3} tag="h2">เข้าสู่ระบบ</CardText>
          <Form style={style5}>
            <FormGroup>
              {/* <InputGroup>
              <InputGroupAddon addonType="prepend">a</InputGroupAddon> */}
              <Input type="email" name="email" id="exampleEmail" placeholder="Email"  style={{width:'85%'}} onChange={e => this.handle(e)} />
            </FormGroup>
            <FormGroup>     
              <Input type="password" name="password" id="examplePassword" placeholder="password" style={{width:'85%'}} onChange={e => this.handle(e)}/>
            </FormGroup>
            
            <Button style={style4} onClick={this.CheckLogin.bind(this)}>เข้าสู่ระบบ</Button>
          </Form>
          <CardFooter style={{height:40,display:'flex',alignItems:'center',justifyContent:'center'}}>ลืมรหัสผ่าน</CardFooter>
          </Card>
          </div>
          
        );
      }
    }

    const style1={
      height:'auto',
      width: '45%',
      padding:'20px'
      }
    const checkbox={
      marginBottom:'3%',
      marginLeft:'8%'
      }
    const style3={
      margin: 'auto auto',
      display: 'block', 
      marginBottom: '1em',
      color: 'black'
    }
    const style4={
      margin:"0em 0em 2em",
      width:'85%',
      background :'green'
    }
    const style5={
      justifycontent:'flex-start',
      display: 'block', 
      marginBottom: '2em',
      marginLeft:'10%'
    }
   
  export default withRouter(Login)