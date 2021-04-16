import React from 'react';
import { Jumbotron , Container} from 'reactstrap';
import { Button,Label,Input } from 'reactstrap';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {Apiurl} from './config'
import socketIOClient from "socket.io-client";
import line from './pic/line.png'
import Image from 'react-bootstrap/Image';

class Footer extends React.Component {

    
  render() {
    return (
        <div>
      <Jumbotron fluid>
        <Container fluid>
        <div className="footer-copyright text-center py-3">© 2018 Copyright:
              <a href="https://www.facebook.com/dr.phuenclinic/"> Dr.phuenclinic.com</a>
              
            </div>
        </Container>
      
      </Jumbotron>
     
    <div className="adminActions">
    <input type="checkbox" name="adminToggle" className="adminToggle" />
    <a className="adminButton" href="#!"><i className="fas fa-comments"></i></a>
    <div className="adminButtons">
        <a href="https://m.me/dr.phuenclinic?fbclid=IwAR0rBJvaX6Tl7SGc6-5DZ12hO0rXEn2faS3jRymu16q4hESPE4tdfViC_Xw"><i className="fab fa-facebook-f" style={{fontSize:'20px'}}></i></a>
        <a href="https://lin.ee/f6qau19" ><i><Image src={line} style={{width:'28px',height:'24px'}}/></i></a>
    </div>
</div>

      </div>
    );
  }
}

export default withRouter(Footer)