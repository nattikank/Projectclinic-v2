import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { Card, Button, CardImg, CardTitle,  CardDeck, CardBody } from 'reactstrap';
import {  CardText, CardLink, CardSubtitle ,Row ,Col} from 'reactstrap';
import { Jumbotron, Container } from 'reactstrap';
import booster from './pic/booster.jpg';
import botox from './pic/botox.jpg';
import aura from './pic/aura.jpg'
import Image from 'react-bootstrap/Image';
import doctor from './pic/doctor.jpg'
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Route,withRouter,Redirect,Link} from "react-router-dom";
//import { Collapse, Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
  
  
  const items = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/photo-9b645.appspot.com/o/doc.jpg?alt=media&token=7da4fa54-8b0f-43b1-b968-c1a08579cf3b',
      altText: '',
      caption: '',
      header: ''
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/photo-9b645.appspot.com/o/37853250_279416946125147_2979753730489974784_o.jpg?alt=media&token=0d4f8aee-9068-45bf-a9b2-23b446523e6c',
      altText: '',
      caption: '',
      header: ''
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/photo-9b645.appspot.com/o/logointro.png?alt=media&token=197979a6-3d91-4fb0-bed3-bf767f005450',
      altText: '',
      caption: '',
      header: ''
    }
    
  ];

  const images = require.context('./pic', true)
  const imagePath = (name) => images(name, true)
  
const Slide = () => <UncontrolledCarousel items={items} />;
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentWillMount(){
    var token = localStorage.getItem("token");
    if(!token){
      return <Redirect to='/Login'  />
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    return (
    <div>
        <Slide/>
        <Jumbotron fluid >
        <Row >
        <Col sm="8" style={{ marginLeft:'0px'}}>
        <Container fluid style={{backgroundColor:'white', padding:'20px' ,marginLeft:'20px',  boxShadow:'0 1px 10px 0 rgba(0, 0, 0, 0.10)'}}>
          <h1 className="display-3" style ={style1}>คลินิกผิวพรรณและความงามหมอเพื่อน</h1>
          <hr/>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;คลินิกดูแลผิวพรรณและความงาม จุดเด่นของคลินิกหมอเพื่อน คือแพทย์ผู้เชี่ยวชาญ พร้อมให้คำปรึกษาปัญหาเรื่องความสวยความงามโดยตรง ทั้งด้านหัตถการความงาม ผิวพรรณ ครบวงจร อีกทั้งยังมี เครื่องมือมีความปลอดภัย 
          รวมถึงผลิตภัณฑ์และยาที่ได้มาตรฐานจากองค์การอาหารและยา กระทรวงสาธารณสุข โปรแกรมการรักษาในราคาที่คุ้มค่าและพอใจ</p>
        </Container>
        </Col>
        <Col sm="8" style={{marginTop:'30px' ,marginLeft:'0px'}}>
        <Container fluid style={{backgroundColor:'white', padding:'17px' ,marginLeft:'20px' , boxShadow:'0 1px 10px 0 rgba(0, 0, 0, 0.10)'}}>
          <h1 className="display-3" style ={style1}>ประวัติคุณหมอเพื่อน</h1>
          <hr/>
          <p >นางสาวกอบกุลยา จึงประเสริฐศรี (หมอเพื่อน)
          สำเร็จการศึกษาแพทยศาสตรบัณฑิต เกียรตินิยมอันดับ 2 จากคณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น
          จบการศึกษาปริญญาโทคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย <a href="https://th.wikipedia.org/wiki/%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%81%E0%B8%B8%E0%B8%A5%E0%B8%A2%E0%B8%B2_%E0%B8%88%E0%B8%B6%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B8%B4%E0%B8%90%E0%B8%A8%E0%B8%A3%E0%B8%B5"> อ่านต่อ </a></p>
        </Container>
        </Col>
        <Col sm="4">
       
        <img  style={{marginTop:'-217px' , marginLeft:'25px' , width:'86%' ,boxShadow:'0 1px 10px 0 rgba(0, 0, 0, 0.10)'}}src={doctor} alt="Card image cap" />
      </Col>
      </Row>
      </Jumbotron>
      <CardDeck>
      <Card>
        <CardImg top width="100%" src={booster}/>
        <CardBody>
          <CardTitle style ={style2}>Bright Booster</CardTitle>
          <Route render={({ history }) => (
              <Button color="success"
                type='button'
                onClick={() => { history.push('/Course2') }}
              >
                รายละเอียดเพิ่มเติม
              </Button>
            )} 
            />
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src= {botox}/>
        <CardBody>
          <CardTitle style ={style2}>Botox</CardTitle>
          <Route render={({ history }) => (
              <Button color="success"
                type='button'
                onClick={() => { history.push('/Botox') }}
              >
                รายละเอียดเพิ่มเติม
              </Button>
            )} 
            />
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src={aura}  />
        <CardBody>
          <CardTitle style ={style2}>Aura Booster</CardTitle>
          <Route render={({ history }) => (
              <Button color="success"
                type='button'
                onClick={() => { history.push('/Aura') }}
              >
                รายละเอียดเพิ่มเติม
              </Button>
            )} 
            />
        </CardBody>
      </Card>
    </CardDeck>
    
      </div>
     
    );
  }
}

const style1 ={
    fontSize : '20pt'
}
const style2 ={
  fontSize : '20pt'
}
export default withRouter(Home);