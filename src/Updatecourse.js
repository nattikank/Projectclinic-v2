import React from 'react';
import { Button,  FormGroup, Label, Input, FormText,CardText, Row, Col } from 'reactstrap';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Swal from 'sweetalert2';
import { Jumbotron } from 'reactstrap';
import {Apiurl} from './config'
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        files: [],
        couresname:'',
        descriptions:'',
        price:'',
      }
   
  }
  onChangeHandler=event=>{
    this.setState({
      file: event.target.files[0],
      loaded: 0,
    })
  }
    componentDidMount(){
        var status = localStorage.getItem("status");
        if(!status){
          this.props.history.push("/Login");
        }
      }
      handle(e){
        this.setState({[e.target.name]: e.target.value},()=>console.log(this.state));
      }
      UpdateCourse(){     
        const Swal = require('sweetalert2');
        const id = localStorage.getItem("id");
        const data = {coursename:this.state.coursename,descriptions:this.state.text,price:this.state.price,timecourse:this.state.timecourse,id:id};
        axios.post(Apiurl+'/updatecourses',data)
        .then(async ({data,status}) =>{
          var formData = new FormData()
          this.state.files.map(item =>{
            formData.append("myImage",item)
          })
          formData.append("id",data)
          formData.append("edit",false)
           await axios({
            method: 'post',
            url: Apiurl+"/upload",
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(res =>{
              console.log(res)
            }).catch(err =>{
              console.log(err)
            })

            console.log('success');
            Swal.fire({
              type: 'success',
              title: 'เพิ่มข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 5000
            })
          // axios.post(Apiurl+"/upload",formData)
          // .then(res =>{
          //   console.log(res)
          // }).catch(err =>{
          //   console.log(err)
          // })
          this.props.history.push("/Update");
        }).catch(error =>{
          console.log(error);
        })
        
      }

  render() {
    
    return (
        
        <div style={style1}>
        <Jumbotron className="bgColorjum">
        <CardText style={style2}tag="h3">เพิ่มคอร์ส</CardText>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="course">ชื่อคอร์ส</Label>
              <Input className="bg-input" type="text" name="coursename" id="coursename" onChange={e => this.handle(e)} />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="descriptions">รายละเอียดเกี่ยวกับคอร์ส</Label>
              <Input className="bg-input" type="textarea" name="text" id="descriptions"  style={{height:'8em'}} onChange={e => this.handle(e)}/>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="price">ราคา</Label>
              <Input className="bg-input" type="number" name="price" id="price" onChange={e => this.handle(e)} />
            </FormGroup>
          </Col>
          
          <Col md={12}>
          <FormGroup>
          <Label for="exampleFile">อัพโหลดรูปภาพ</Label>
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
            <FormText color="danger">
              *กรุณาเลือกรูปภาพเพื่ออัพโหลด
            </FormText>
        </FormGroup>
        </Col>
        <Col md={12}>
            <FormGroup>
              <Label for="price">เวลาที่ใช้ทำ</Label>
              <Input className="bg-input" type="number" name="timecourse" id="timecourse" placeholder="ชั่วโมง"  onChange={e => this.handle(e)} />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success" onClick={()=> this.UpdateCourse()}>
              เพิ่มคอร์ส
            </Button>
        </Jumbotron>
        </div>
     
    );
  }
}

const style1={
  }
const style2={
    margin: 'auto auto', 
    marginBottom: '0.7em',
    display: 'flex',
    aligncontent:'center',
}
const style3={
    position:'absolute',
    width:'150px',
    background :'green'
    
}
export default withRouter(UpdateCourse)