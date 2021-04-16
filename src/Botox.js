import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col,
  Label, ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText} from 'reactstrap';
import face2 from './pic/face2.png';
import botox from './pic/botox.jpg';
import Image from 'react-bootstrap/Image';
import {Route} from "react-router-dom";


const images = require.context('./pic', true)
const imagePath = (name) => images(name, true)
const Course2 = (props) => {
  return (
    <div style={{padding:'4% 0em'}}>
      <Card style={{padding:'4% 0em 3% 8%',}}>
        <Row form>

        <Col md={6}>
        <CardTitle tag="h3" style={{marginBottom:'4%'}}>Botox 100 units</CardTitle>
        <CardImg src={botox}
        style={{width:'80%',height:'70%',borderRadius:'4px', border:'1px solid #CCD1D1',padding:'3%'}}>
        </CardImg>
        </Col>

        <Col md={5}>
        <CardTitle tag="h3" style={{textAlign:'center'}}>รายละเอียด</CardTitle>
        <CardBody style={{padding:'2% 0em'}}>
        <ListGroup style={{marginBottom:'5%'}} >
        <ListGroupItem color="success">
          <ListGroupItemHeading style={{marginLeft:'7%'}}>Botox 100 units</ListGroupItemHeading>
        </ListGroupItem>

        <ListGroupItem>
        <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>ปัญหาริ้วรอย </ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>ปัญหาริ้วรอย </ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>ใบหน้าหย่อนคล้อย </ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>หน้ายกกระชับ </ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>ลดหน้าบาน กรามใหญ่</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><img src={face2}/>ยกกระชับผิวหน้าที่หย่อนคล้อยด้วย Botox ด้วยเทคนิคพิเศษ </ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading style={{marginLeft:'7%'}} >โปรโมชั่น 100  units เหลือเพียง 9,500 จากราคาปกติ 12,500</ListGroupItemHeading>
        </ListGroupItem>
        </ListGroup>
        <Route render={({ history }) => (
              <Button style={{background : 'green',width:'150px',marginLeft:'130px'}}
                type='button'
                onClick={() => { history.push('/Booking') }}
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
};

export default Course2;