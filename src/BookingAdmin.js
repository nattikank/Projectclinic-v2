import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import { Apiurl } from './config'
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import './Calendar.css'
import { Jumbotron } from 'reactstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import socketIOClient from "socket.io-client";


class BookingAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      modal: false,
      reservation: true,
      event: [],
      calendarEvents: [
        {
          title: "Atlanta Monster",
          start: new Date("2019-08-24 00:00"),
          end: new Date("2019-08-24 03:00"),
          id: 99999998
        },
        {
          title: "My Favorite Murder",
          start: new Date("2019-04-05 00:00"),
          id: 99999999
        },
        {
          title: "My FavoriteNaja Murder",
          start: new Date("2019-08-24 00:00"),
          end: new Date("2019-08-24 03:00"),
          id: 99999999
        }
      ],
      time: '',
      course: "", 
      selectedTime: [],
      description: "", 
      load: true,
      timeRender:[
        {
          component:"12.00"
        },
        {
          component:"12.30"
        },
        {
          component:"13.00"
        },
        {
          component:"13.30"
        },
        {
          component:"14.00"
        },
        {
          component:"14.30"
        },
        {
          component:"15.00"
        },
        {
          component:"15.30"
        },
        {
          component:"16.00"
        },
        {
          component:"16.30"
        },
        {
          component:"17.00"
        },
        {
          component:"17.30"
        },
        {
          component:"18.00"
        },
        {
          component:"18.30"
        },
        {
          component:"19.00"
        },
        {
          component:"19.30"
        },
        {
          component:"20.00"
        }
      ],
      index:[]
    };

    this.toggle1 = this.toggle1.bind(this);
    this.handleMake = this.handleMake.bind(this)

  }
  toggle1() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  load = () => {
    console.log("Is Load")
    axios.get(Apiurl + "/Adminreservation").then(async res => {
      console.log(res.data)
      var arr = new Array()
      console.log(res.data)
      res.data.map((item, i) => {
        arr.push({ id: item.id, start: new Date(item.start), end: new Date(item.end), title: item.title })
      })
      await this.setState({
        event: arr
      }, () => console.log(this.state.event))
      console.log("ex", this.state.calendarEvents)
    }).catch(err => {
      console.log(err)
    })
  }

  calendarComponentRef = React.createRef()
  state = {
    calendarWeekends: true,
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() }
    ]
  }
  componentWillMount = () => {
    
    this.load()
    const id = localStorage.getItem("id")
    const {endpoint} = Apiurl;
    //Very simply connect to the socket
    
    const socket = socketIOClient(Apiurl);
    socket.on("admin", data => NotificationManager.success(data.detail, data.name));
  }
  handleMake = (e) => {
    this.setState({ [e.target.name]: e.target.value, load: false })
    axios.post(Apiurl + `/checkvalid`,{date:this.state.date}).
    then(({data,status})=>{
      console.log(data)
        this.setState({index:data})
    }).catch(err =>{
      console.log(err)
    })
  }


  



  //checkvalid

  handleCourse = (e) => {
    var timereservation = e.target.value
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var yearthai = parseInt(year) + 543
    var time = (e.target.value).split(".")
    var times = time[0] + ":" + time[1]
    axios.post(Apiurl + "/checkcourse", { date: this.state.date, time: times, id: this.state.course })
      .then(async res => {
        console.log(res)
        await this.setState({ time: timereservation })
      }).catch(async err => {
        await this.setState({ reservation: true })
        Swal.fire({
          type: 'error',
          title: 'ผิดพลาด',
          text: 'เวลานี้มีคนจองแล้ว',
          showConfirmButton: false,
          timer: 2000
        })
        
      })
  }



  render() {
    return (
      <div className='demo-app'>
        <Jumbotron className="bgColorjum">
          <div className='demo-app-calendar font'>
            <h4>ตารางการจองคิว</h4>
            <Label style={{ color: 'red' }}>*โปรดเลือกวันและเวลา</Label>
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.event}
              dateClick={(arg) => this.handleDateClick(arg)}
            />
          </div> 

          

          </Jumbotron>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader>เลือกคอร์สและเวลา</ModalHeader>
          <ModalBody>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="course">คอร์ส</Label>
                  <Input type="select" name="course" id="course" onChange={e => this.handleMake(e)}>
                    <option value="1">เลือก</option>
                    <option value="1">Bright Booster จาก1,500 พิเศษราคานักศึกษา 750</option>
                    <option value="2">ฉีดสิว/กดสิว,เม็ดแรก 150 เม็ดต่อไป 50+</option>
                    <option value="3">Aura Booster คอร์ส 5 ครั้ง 13,500</option>
                    <option value="4">Dermabrasion สะกิดหลุมสิว,ผลัก Growth factor 2,500</option>
                    <option value="5">Subcision รักษาหลุมสิว ตัดผังผืดใต้ผิวหนัง. 3,500</option>
                    <option value="6">Made Collagen มาเด้ คอลลาเจน 2,200</option>
                    <option value="7">Placenta Extract รกแกะ เมโส หน้าใส Switzerland  2,500</option>
                    <option value="8">Intravenous vitamin วิตามินผิว cocktail. 2,000</option>
                    <option value="9">Intravenous vitamin วิตามินผิว signature Aura 3,500</option>
                    <option value="10">Mesofat ลดไขมันแก้ม. 3,500</option>
                    <option value="11">Mesofat ลดเหนียง.  2,800</option>
                    <option value="12">Mesofat ลดไขมันแก้ม+เหนียง 5,500</option>
                    <option value="13">Botox โบท็อกซ์ Upper face ลดริ้วรอยหางตา หน้าผาก คิ้ว 4,500</option>
                    <option value="14">Botox โบท็อกซ์ Super V-life technique หน้าวีเชฟ 6,000</option>
                    <option value="15">Botox โบท็อกซ์ Masseter ลดกราม 4,000-5,500</option>
                    <option value="16">Botox โบท็อกซ์ 100 unit.  8,900-22,000</option>
                    <option value="17">Filler ฟิลเลอ เติมเต็ม ใต้ตา หน้าผาก แก้ม จมูก คาง ขมับ.  9,500-20,000</option>
                    <option value="18">Thread life ร้อยไหม ก้างปลา collagen 8 D.  9,900-15,000</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>

              <Col md={12}>
                <FormGroup>
                  <Label for="time">เวลา</Label>
                  <Input disabled={this.state.load} type="select" name="time" id="time" onChange={e => this.handleCourse(e)}>
                  <option value="">กรุณาเลือกเวลา</option>
                  {
                    this.state.timeRender.map((data,index) =>{
                      var a = false
                      this.state.index.map(item =>{
                        if(index === item){
                           a = true
                        }
                      })
                      if(a == false){
                        return(<option value={data.component}>{data.component}</option>)
                      }else{
                        return(<option value={data.component} disabled>{data.component}</option>)
                      }
                      
                    })
                  }
                  
                  </Input>
               
                </FormGroup>

              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="text">รายละเอียด</Label>
                  <Input type="textarea" name="description" id="description" style={{ height: '7em' }} onChange={e => this.handleMake(e)} />
                </FormGroup>
              </Col>
             


            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" disabled={this.state.course !== "" && this.state.time !== "" ? false : true} onClick={() => this.submit()}>จอง</Button>{' '}
            <Button color="danger" onClick={this.toggle1}>ยกเลิก</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  handleDateClick = async (arg) => {
    
    var date = (arg.dateStr).split("-")
    var datena = date[2] + "-" + date[1] + "-" + (parseInt(date[0]) + 543)
    this.loadtime(datena)
    await this.setState({ modal: true, date: datena });
  }
  submit = () => {
    const Swal = require('sweetalert2');
    var id = localStorage.getItem("id")
    axios.post(Apiurl + "/book", { date: this.state.date, course: this.state.course, time: this.state.time, description: this.state.description, id:id })
      .then(res => {
        this.setState({
          modal: false, reservation: true, date: '', course: '', time: '', description: '', load: true
        })
        Swal.fire({
            type: 'success',
            title: 'ทำการจองคิวสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          })
        this.load()

      }).catch(err => {
        console.log(err)
      })
  }

  loadtime = (date) => {
    axios.post(Apiurl + "/checktimecourse", { date: date })
      .then(res => {
        this.setState({ selectedTime: res.data })
      }).catch(err => {
        console.log(err)
      })
  }

}
export default withRouter(BookingAdmin)