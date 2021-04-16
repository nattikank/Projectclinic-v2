import React from 'react';
import { Card, CardImg,  CardBody,
  CardTitle,  Button, Row, Col,
   ListGroup, ListGroupItem, ListGroupItemHeading,
  ListGroupItemText} from 'reactstrap';
import face1 from './pic/face1.png';
import Image from 'react-bootstrap/Image';
import omega from './pic/omega.jpg'
import {Route,withRouter,Redirect,Link} from "react-router-dom";


class Course1 extends React.Component {
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
      <Card style={{padding:'50px'}}>
        <Row form>
        
        <Col md={6}>
        <CardTitle tag="h3" style={{marginTop:'10%'}}>แสงบำบัด-โอเมก้าไลท์ Omega Light</CardTitle>
        <CardImg src={omega} alt="Card image cap"
        style={{width:'70%',height:'70%',borderRadius:'4px', border:'1px solid #CCD1D1',padding:'3%'}}>
        </CardImg>
        </Col>

        <Col md={5}>
        <CardTitle tag="h3" style={{textAlign:'center',marginTop:'12%'}}>รายละเอียด</CardTitle>
        <CardBody style={{padding:'3% 0em'}}>
        <ListGroup style={{marginBottom:'5%'}}>
        <ListGroupItem color="success">
          <ListGroupItemHeading style={{marginLeft:'7%'}}>แสงสีแดงช่วยกระตุ้นคอลลาเจน</ListGroupItemHeading>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>หน้าขาวกระจ่างใส</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>ลดเลือนรอยแผลเป็น</ListGroupItemText>
          <ListGroupItemText style={{marginLeft:'7%'}}><Image src={face1}/>รอยแดง, รอยดำจากสิว</ListGroupItemText>
        </ListGroupItem>

        <ListGroupItem>
          <ListGroupItemHeading style={{marginLeft:'7%'}}>ราคาเพียงครั้งละ. 1,500 บาท</ListGroupItemHeading>
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

export default withRouter (Course1);
