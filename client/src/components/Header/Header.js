import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, NavDropdown, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from "./Logo";
import { connect } from 'react-redux';

class Header extends React.Component {
    render() {
        return (
            <Navbar expand="md"  bg='white' className='desktop-hover sticky-top' >
                <Logo />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto float-right ">
                        <Nav.Link ><Link className='desktop-hover ' to='/'>Home</Link></Nav.Link>
                        <Nav.Link ><Link className='desktop-hover' to='/shop'>Book</Link></Nav.Link>
                        <Nav.Link ><Link className='desktop-hover' to='/cart'>
                            Wishlist{" "}
                            </Link>
                        </Nav.Link>
                        <NavDropdown  title="Account" id="basic-nav-dropdown" className='desktop-hover text-black'>
                            <NavDropdown.Item ><Link className='desktop-hover'
                             to='/login'>Login</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to='/register' className='desktop-hover'>Register</Link></NavDropdown.Item>

                            {this.props.auth.isAuthenticated === true ? (
                                <NavDropdown.Item >

                                        <Link to='/dashboard' className='desktop-hover'>
                                            Dashboard
                                        </Link>

                                </NavDropdown.Item>
                            ) : null}
                            <NavDropdown.Item ><Link to="/contact_us" className='desktop-hover'>Contact Us</Link></NavDropdown.Item>
                            <NavDropdown.Item ><Link to='/faq' className='desktop-hover'>Faq Page</Link></NavDropdown.Item>
                        </NavDropdown>

                    </Nav>



                </Navbar.Collapse>
            </Navbar>
        )
    }
}
const mapStateToProps = state => (
  {
    auth: state.loginUser
  }
);

export default connect(mapStateToProps)(Header);
