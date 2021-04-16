import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col,
  ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText} from 'reactstrap';
import AcneEIectron from './pic/AcneEIectron.jpg'
import Image from 'react-bootstrap/Image';
import face1 from './pic/face1.png';
import {Route,withRouter} from "react-router-dom";

class Course3 extends React.Component {
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
      <Card style={{padding:'2% 0em 3% 8%'}} >
        <Row form>

        <Col md={6}>
        <CardTitle tag="h3" style={{marginTop:'10%'}}>โปรแกรมรักษาสิว</CardTitle>
        <CardImg src={AcneEIectron} alt="Card image cap"
        style={{ width:'65%',height:'65%',borderRadius:'4px', border:'1px solid #CCD1D1',padding:'3%'}}>
        </CardImg>
        </Col>

        <Col md={5}>
        <CardTitle tag="h3" style={{textAlign:'center',marginTop:'10%'}}>รายละเอียด</CardTitle>
        <CardBody style={{padding:'2% 0em'}}>
        <ListGroup style={{marginBottom:'5%'}} >
        <ListGroupItem color="success">
          <ListGroupItemHeading style={{marginLeft:'7%'}}>รักษาด้วยโปรแกรม Acne+EIectron</ListGroupItemHeading>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>เคลียร์ทุกปัญหาสิว สิวอุดตัน สิวอักเสบ รอยแดง</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>ทำให้การกดสิวไม่เป็นรอยช้ำ</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>ลดรอยแดงจากสิว</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>ช่วยให้สิวอักเสบแห้งไว</ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading style={{marginLeft:'7%'}}>ราคาเพียงครั้งละ. 1,000 บาท</ListGroupItemHeading>
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

export default withRouter (Course3);
