import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col,
  Label, ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText} from 'reactstrap';
import face2 from './pic/face2.png';
import booster from './pic/booster.jpg';
import Image from 'react-bootstrap/Image';
import {Route,withRouter} from "react-router-dom";


const images = require.context('./pic', true)
const imagePath = (name) => images(name, true)

class Course2 extends React.Component {
  CheckLogin = () =>{
    let login = localStorage.getItem("name");
    if(!login){
      this.props.history.push("/Login")
    }else{
      this.props.history.push('/Booking') 
    }
  }
  render(){
  return (
    <div >
      <Card style={{padding:'4% 0em 3% 8%',}}>
        <Row form>

        <Col md={6}>
        <CardTitle tag="h3" style={{marginBottom:'4%'}}>โปรแกรมปรับสภาพผิว</CardTitle>
        <CardImg src={booster}
        style={{width:'70%',height:'70%',borderRadius:'4px', border:'1px solid #CCD1D1',padding:'3%'}}>
        </CardImg>
        </Col>

        <Col md={5}>
        <CardTitle tag="h3" style={{textAlign:'center'}}>รายละเอียด</CardTitle>
        <CardBody style={{padding:'2% 0em'}}>
        <ListGroup style={{marginBottom:'5%'}} >
        <ListGroupItem color="success">
          <ListGroupItemHeading style={{marginLeft:'7%'}}>Bright Booster</ListGroupItemHeading>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>อุณหภูมิเย็นที่เหมาะสม ทำให้ผิวตื่น ผ่อนคลาย และยังช่วยเรื่องความกระจ่างใสอีกด้วย</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>สำหรับผู้ที่มี ผิวแห้ง, ผิวคล้ำ, ผิวขาดน้ำ, หน้าเป็นผดผื่น </ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading style={{marginLeft:'7%'}} >ราคาเพียงครั้งละ. 1,500 บาท</ListGroupItemHeading>
        </ListGroupItem>
        </ListGroup>
        <Route render={({ history }) => (
              <Button style={{background : 'green',width:'150px',marginLeft:'130px'}}
                type='button'
                onClick={() => this.CheckLogin() }
              >
                จอง
              </Button>
            )} 
            />
        </CardBody>
        </Col>
        </Row>
      </Card>
    </div>
   );
  }
}

export default withRouter (Course2);