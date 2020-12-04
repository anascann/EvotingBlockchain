import React,{useState} from 'react'

import {Nav, Row} from "react-bootstrap"
import {Navbar,Button} from "react-bootstrap"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavBar.css"
export default function NavBar() {

  const [Clicked,setClicked]=useState(false);
  const [SignUpComponent,setSignUpComponent]=useState(false)
  const [LoginComponent,setLoginComponent]=useState(false);


  function launchLogin(){
   
setLoginComponent(!LoginComponent);
  }

  function LaunchSignUp(){
    setSignUpComponent(!SignUpComponent);
  }

    return (
        <div>
        
      <Navbar fixed="top" bg="light">
        <Navbar.Brand href="#home">
         <h5>EnigVote.</h5>
        </Navbar.Brand>
        <Nav className="mr-auto">
        <Nav.Link href="#">About Us</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
        <Nav.Link onClick={launchLogin} href="#">Host an Election</Nav.Link>
        </Nav>

        <Nav>
       <Button onClick={launchLogin}>Login</Button>
        <Button onClick={LaunchSignUp}>
        Sign Up</Button>
      </Nav>

    </Navbar>  

      {LoginComponent ? <Login setLoginComponent={setLoginComponent}/>: ''}
      {SignUpComponent ? <SignUp setSignUpComponent={setSignUpComponent}/> : ''}
    
        </div>
    )
}



