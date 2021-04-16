import React from 'react';
import { Card, CardImg,  CardBody,
  CardTitle, Button, Row, Col,
  ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText} from 'reactstrap';
import face2 from './pic/face2.png';
import aura from './pic/aura.jpg';
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
        <CardTitle tag="h3" style={{marginBottom:'4%'}}>Aura Booster</CardTitle>
        <CardImg src={aura}
        style={{width:'80%',height:'80%',borderRadius:'4px', border:'1px solid #CCD1D1',padding:'3%'}}>
        </CardImg>
        </Col>

        <Col md={5}>
        <CardTitle tag="h3" style={{textAlign:'center'}}>รายละเอียด</CardTitle>
        <CardBody style={{padding:'2% 0em'}}>
        <ListGroup style={{marginBottom:'7%'}} >
        <ListGroupItem color="success">
          <ListGroupItemHeading style={{marginLeft:'7%'}}>Aura Booster</ListGroupItemHeading>
        </ListGroupItem>

        <ListGroupItem>
        <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face2}/>Drip วิตามิน มากกว่า10ชนิด</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face2}/>ช่วยเรื่องผิวขาวใส </ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face2}/>เปร่งประกายมีออร่า</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face2}/>ช่วยต้านอนุมูลอิสระ</ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading style={{marginLeft:'7%'}} >คอร์ส 5 ครั้ง ราคาพิเศษ 13,500 บาท จากปกติ 17,500</ListGroupItemHeading>
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