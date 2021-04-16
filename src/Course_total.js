import React from 'react';
import { Table, Card, CardText, Button,Col, Row } from 'reactstrap';
import {Route,withRouter,Redirect,Link} from "react-router-dom";
import axios from 'axios';
import {Apiurl} from './config'

class CrouseT extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,data:[]
    };
   
    this.getCourseuser();
  }
  CheckLogin = () =>{
    let login = localStorage.getItem("name");
    var status =  localStorage.getItem("status");
    if(!login){
      this.props.history.push("/Login")
    }else{
      if(status === "user"){
      this.props.history.push('/Booking')
      }
      else{
        this.props.history.push('/BookingAdmin')
      } 
    }
  }
  

  getCourseuser(){
    var id = localStorage.getItem("id");
    const data = {id:id}
    axios.post(Apiurl+'/totalcourseUser',data)
    .then(response =>{
      console.log(response.data)
      this.setState({
        data:response.data,
        Loading:true
      },()=>console.log(this.state))
    }).catch(error =>{
        console.log(error);
    })
  }
  Load(){
    this.state.data.map((item,i)=> 
      <tr>
        <th style={style2}>{i+1}</th>
            <td>{item.course_name}</td>
            <td>{item.price}</td>
            <td>{item.time_course}ชม.</td>
            <td><Route render={({ history }) => (
              <Button style={{background : 'green'}}
                type='button'
                onClick={() => { history.push('/BookingAdmin') }}
              >
                จอง
              </Button>
            )} 
            /></td>
            
      </tr>);
      console.log(this.state.data);
        }

        render() {
          let Mock = this.state.data.map((item,i) => {
            return (
              <tr>
              <th style={style2}>{i+1}</th>
                  <td>{item.course_name}</td>
                  <td>{item.price}</td>
                  <td>{item.time_course}ชม.</td>
                  <td><Route render={({ history }) => (
                    <Button style={{background : 'green'}}
                      type='button'
                      onClick={() => this.CheckLogin() }
                    >
                      จอง
                    </Button>
                  )} 
                  /></td>
                  
            </tr>);
          });


 

    return (
    <div >
       {this.state.Loading ? <div>
       <Card style={{padding:'5% 0em',}}>
          <Row form>
            <Col md={8}>
            <CardText style={{margin:'0% 15% 5%',marginRight:'5%'}}tag="h3">คอร์สดูแลผิวพรรณ</CardText>
            </Col>
          </Row>
      <Table striped style={{width:'80%', marginLeft:'10%',border:'1px solid #CCD1D1'}}>
        <thead>
          <tr>
            <th >No.</th>
            <th >รายการ</th>
            <th >ราคา</th>
            <th >เวลาทำ(ต่อครั้ง)</th>
            <th >จองคิว</th>
          </tr>
        </thead>
        <tbody>
         {this.state.data ? Mock : "" }  
        </tbody>
      </Table>
      </Card>
      </div> : "กำลังโหลด"}
    </div>
    );
  }
}
const style2={
  width:'1%',
  right:'5%',
  left:'5%'
}

export default withRouter(CrouseT)