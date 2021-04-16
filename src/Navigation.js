import React from 'react'
import { withRouter, BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Image from 'react-bootstrap/Image';
class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            Redirect: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    Logout() {
        const Swal = require('sweetalert2');
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("status");
        localStorage.removeItem("mail");
        localStorage.removeItem("lname");
        localStorage.removeItem("sex");
        localStorage.removeItem("address");
        localStorage.removeItem("tel");
        this.props.history.push("/");
        Swal.fire({
            type: 'success',
            title: 'ออกจากระบบ',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(this.props.history.push("/"), 2000);
    }
    LoadNav() {
        var name = localStorage.getItem("name");
        var status =  localStorage.getItem("status");
        if (!name) {
            return (
                <Navbar color="light" light expand="md" >
                <NavbarBrand href="/">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/photo-9b645.appspot.com/o/resizelogo.png?alt=media&token=52415b5c-9d25-47c2-8114-b3ba9e328526" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/" className="nav-link">หน้าหลัก</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                คอร์ส
                        </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                    <Link to="/Course_total" className="nav-link">โปรแกรมการรักษา</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course1" className="nav-link">Omega Light</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course2" className="nav-link">Bright Booster</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course3" className="nav-link">Acne+EIectron</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <Link to="/Contact" className="nav-link">ติดต่อ</Link>
                        </NavItem>
                        {/* <NavItem>
                            <Link to="/Tablenew" className="nav-link">test</Link>
                        </NavItem> */}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                เข้าสู่ระบบ
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/Login" className="nav-link">เข้าสู่ระบบ</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Register" className="nav-link">สมัครสมาชิก</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            );
        } else {
            if(status === "user"){
                return (  <Navbar color="light" light expand="md" >
                <NavbarBrand href="/">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/photo-9b645.appspot.com/o/resizelogo.png?alt=media&token=52415b5c-9d25-47c2-8114-b3ba9e328526" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/" className="nav-link">หน้าหลัก</Link>
                        </NavItem>
                    
                        <NavItem>
                            <Link to="/Booking" className="nav-link">จองคอร์ส</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                คอร์ส
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/Course_total" className="nav-link">โปรแกรมการรักษา</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course1" className="nav-link">Omega Light</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course2" className="nav-link">Bright Booster</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course3" className="nav-link">Acne+EIectron</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <Link to="/Contact" className="nav-link">ติดต่อ</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {name}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/Myaccount" className="nav-link">ข้อมูลส่วนตัว</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Bookinginformation" className="nav-link">ข้อมูลการจองคิว </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/" className="nav-link" onClick={this.Logout.bind(this)}>ออกจากระบบ</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>);
            }else{
                return (  <Navbar color="light" light expand="md" >
                <NavbarBrand href="/">
                    <Image src="https://firebasestorage.googleapis.com/v0/b/photo-9b645.appspot.com/o/resizelogo.png?alt=media&token=52415b5c-9d25-47c2-8114-b3ba9e328526" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/" className="nav-link">หน้าหลัก</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/BookingAdmin" className="nav-link">ตารางการจองคิว</Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                คอร์ส
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/Course_total" className="nav-link">โปรแกรมการรักษา</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course1" className="nav-link">Omega Light</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course2" className="nav-link">Bright Booster</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/Course3" className="nav-link">Acne+EIectron</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                admin
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                        <Link to="/Update" className="nav-link">แก้ไขคอร์ส</Link>
                                </DropdownItem>
                                <DropdownItem>
                                        <Link to="/Updatecourse" className="nav-link">เพิ่มคอร์ส</Link>
                                </DropdownItem>
                                <DropdownItem>
                                        <Link to="/CfBooking" className="nav-link">ยืนยันการจอง</Link>
                                </DropdownItem>
                                <DropdownItem>
                                        <Link to="/ContactMsg" className="nav-link">ข้อความ</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/" className="nav-link" onClick={this.Logout.bind(this)}>ออกจากระบบ</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>);
            }
            

        }

    }

    render() {
        return (
           <div>{this.LoadNav()}</div>
        );
    }
} 

export default withRouter(Navigation)