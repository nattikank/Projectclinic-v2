
import React from 'react';
import { Container, CardText,Button,Table,Label,FormGroup,Input } from 'reactstrap';
import bin from './pic/bin.png';
import edit from './pic/edit.png';
import {withRouter} from "react-router-dom";
import picture from './pic/picture.png';
import {Route} from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row ,FormText} from 'reactstrap';
import {Apiurl} from './config'
import { Jumbotron } from 'reactstrap';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const images = require.context('./pic', true)


class Update extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,data:[],coursename:'',descriptions:'',price:'',files:[],
      edit_name:'',edit_detail_course:'',edit_price:'',edit_time_course:'',
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.getCourse();
  }

  onChangeHandler=event=>{
    this.setState({
      file: event.target.files[0],
      loaded: 0,
    })
  }



  handle(e){
    this.setState({[e.target.name]: e.target.value},()=>console.log(this.state));
  }
  toggle(id,name,price,detail,time,img) {
    this.setState({
      modal:!this.state.modal,
      idcourse:id,
      coursename:name,
      price:price,
      descriptions:detail,
      timecousre:time,
      img:img,
      path:img
    },()=>console.log(this.state.path))
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id){
    const Swal = require('sweetalert2');
    this.setState({ idaction:id },()=>console.log(this.state));
  Swal.fire({
    title: '',
    text: "คุณต้องการลบคอร์สหรือไม่?",
    type: 'question',
    showCancelButton: true,
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก',
    reverseButtons: true,
    confirmButtonColor: '#00CC00',
    cancelButtonColor: '#EE0000'
  }).then((result) => {
    if (result.value) {
      const data = {id:id}
      axios.post(Apiurl+'/deleteCourse',data)
    .then(res =>{
      if(res.data === "Success"){
        Swal.fire(
          'สำเร็จ!',
          'ทำการยกเลิกสำเร็จ',
          'success'
        )
        this.getCourse();
      }
    }).catch(error =>{
      console.log(error);
    })
    } else if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.cancel
    ) {
     return;
    }
  })
}
EditCourseeiei(){
  console.log(this.state.path)
  const Swal = require('sweetalert2');
  //const id = localStorage.getItem("id");
  const data = {coursename:this.state.coursename,descriptions:this.state.descriptions,
    price:this.state.price,timecousre:this.state.timecousre,id:this.state.idcourse,edit:false,file:this.state.path};
  axios.post(Apiurl+'/EditCousre',data)
  .then(async ({data,status}) =>{
    if(this.state.files.length > 0){
      var formData = new FormData()
      this.state.files.map(item =>{
        formData.append("myImage",item)
      })
      formData.append("id",data)
      formData.append("edit",true)
      formData.append("file",this.state.path)
       await axios({
        method: 'post',
        url: Apiurl+"/upload",
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(res =>{
          Swal.fire({
            type: 'success',
            title: 'แก้ไขข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 5000
          })
          this.getCourse()
          this.setState({
            modal: false,files:[]
          })
        }).catch(err =>{
          console.log(err)
        })
    }else{
      this.getCourse()
      Swal.fire({
        type: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 5000
      })
      this.setState({
        modal: false,files:[]
      })
    }
  }).catch(error =>{
    console.log(error);
  })
  
}
  getCourse(){
    var id = localStorage.getItem("id");
    const data = {id:id}
    axios.post(Apiurl+'/totalcourse',data)
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
            <td>{item.descriptionCourse}</td>
            <td>{item.price}</td>
            <td>{item.time_course}ชม.</td>
            <td><img src={`${Apiurl}+item.img`}/></td>
            <td><img src={edit}  onClick={this.toggle} /></td>
            <td><img src={bin} onClick={this.handleShow} /></td>
      </tr>);
      console.log(this.state.data);
        }
        render() {
          let Mock = this.state.data.map((item,i) => {
            return (
              <tr>
              <th style={style2}>{i+1}</th>
                  <td>{item.course_name}</td>
                  <td>{item.descriptionCourse}</td>
                  <td>{item.price}</td>
                  <td>{item.time_course}ชม.</td>
                  <td><img src={`${Apiurl}${item.img}`} style={{width:'50px' , height:'50px'}}/></td>
                  <td><img src={edit} onClick={()=>this.toggle(item.idcourse,item.course_name,item.price,item.descriptionCourse,item.time_course,item.img)} /></td>
                  <td><img src={bin} onClick={() => this.handleShow(item.idcourse)} /></td>
            </tr>);
          });
    

      return (
        <div>
           {this.state.Loading ? <div>
            <Jumbotron className="bgColorjum">
            <h4>แก้ไขคอร์ส</h4>
          <Table responsive>
        <thead>
          <tr>
            <th style={style2}>No.</th>
            <th style={{width:'10%'}}>คอร์ส</th>
            <th>รายละเอียดคอร์ส</th>
            <th>ราคา</th>
            <th>เวลา</th>
            <th>รูปภาพ</th>
            <th>แก้ไข</th>
            <th>ลบ</th>
          </tr>
        </thead>
        <tbody>
           {this.state.data ? Mock : "" }  
        </tbody>
      </Table>
    
            </Jumbotron >
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>แก้ไขคอร์ส</ModalHeader>
          <ModalBody>
          <Row form>
          <Col md={12}>
            <FormGroup>
              <Label >ชื่อคอร์ส</Label>
              <Input type="text" name="coursename" id="coursename" value={this.state.coursename}   onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="descriptions">รายละเอียดเกี่ยวกับคอร์ส</Label>
              <Input type="textarea" name="descriptions" id="descriptions" value={this.state.descriptions} onChange={e => this.handle(e)}  style={{height:'8em'}}/>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="price">ราคา</Label>
              <Input type="number" name="price" id="price" value={this.state.price}  onChange={e => this.handle(e)} />
            </FormGroup>
          </Col>
          <Col md={12}>
          <FormGroup>
          <Label for="exampleFile">อัพโหลดรูปภาพ</Label>
          {
            <div>
              {
                this.state.img != '' ? 
                 <div>
                   <img src={`${Apiurl}${this.state.img}`} style={{width:'450px' , height:'300px',marginLeft:'5px'}} />
                   <button onClick={()=>this.setState({img:""})} style={{position:'absolute',right:'5px',borderRadius:'30px',top:'15px'}}>x</button>
                 </div> :
                  <FilePond ref={ref => this.pond = ref}
                        files={this.state.files}
                        allowMultiple={true}
                        server={{
                            // fake server to simulate loading a 'local' server file and processing a file
                            process: (fieldName, file, metadata, load) => {
                                // simulates uploading a file
                                setTimeout(() => {
                                    load(Date.now())
                                }, 1500);
                            },
                            load: (source, load) => {
                                // simulates loading a file from the server
                                fetch(source).then(res => res.blob()).then(load);
                            }
                        }}
                        onupdatefiles={fileItems => {
                            // Set currently active file objects to this.state
                            this.setState({
                                files: fileItems.map(fileItem => fileItem.file)
                            });
                        }}>
              </FilePond>
              }
            </div>
          }

            <FormText color="danger">
              *กรุณาเลือกรูปภาพเพื่ออัพโหลด
            </FormText>
        </FormGroup>
        </Col>
        <Col md={12}>
            <FormGroup>
              <Label for="timecousre">เวลาที่ใช้ทำ(ชั่วโมง)</Label>
              <Input type="number" name="timecousre" id="timecousre"  value={this.state.timecousre} onChange={e => this.handle(e)} />
            </FormGroup>
          </Col>
        </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={()=> this.EditCourseeiei()}>บันทึก</Button>{' '}
            <Button color="danger" onClick={this.toggle}>ยกเลิก</Button>
          </ModalFooter>
        </Modal>
         </div> : "กำลังโหลด"}
        </div>
    );
  }
}



const style1={
    marginleft:'300px'
}

const style2={
  width:'1%',
  right:'5%',
  left:'5%'
}
export default withRouter(Update)
