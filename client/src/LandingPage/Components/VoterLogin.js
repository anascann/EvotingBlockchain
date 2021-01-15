import React,{useState,useEffect} from 'react'
import {} from "react-bootstrap"
import {Navbar,Button, Nav, Row, Modal, Col, InputGroup, Form, FormControl} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import Login from "./Login/Login"
import SignUp from "./SignUp/SignUp"
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NavBar.css"

 function VoterLogin({setLoginVoterComponent}) {

  function handleSignUp(){
    console.log('yes working');
    setLaunchSignUp(true);
      }


    const [show, setShow] = useState(false);
    const [test,setTest]=useState(false);
  //const handleClose = () => setShow(false);
  const [launchSignUp,setLaunchSignUp]=useState(false);

  const [Email, setEmail]=useState(' ');
  const [Password,setPassword]=useState(' ');
  const [ElectionId,setElectionId]=useState(' ');

  const [ElectionData,setElectionData]=useState([]);
  const [LoggedIn, setLoggedIn]=useState(false);
  const handleClose=()=>{
    setShow(false);
    setLoginVoterComponent(false);
  }
  const handleShow = () => setShow(true);

  const FetchElections=async()=>{
    await Axios({
      method:'GET',
      url: 'http://localhost:5000/fetch_elections',    
    }).then(function(response){
        console.log(response);
        setElectionData(response.data);
    }).catch(function(response){
      console.log(response);
    })
  }

  const handleChangeElection=(e)=>{
    console.log(e.target.value);

      ElectionData.map(key=>{
          if(key.name===e.target.value){
            console.log(key. _id);
            setElectionId(key. _id);
          }
      })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await Axios({
      method:'post',
      url: 'http://localhost:5000/voter_login',
      data:{
        "electionId": ElectionId,
        "email": Email,
        "password": Password
      }
    }).then(function(response){
      console.log(response);
      console.log(response.config);
      console.log(response.data.data);
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("eid", response.data.data.id);
  
     setLoggedIn(true);
    }).catch(function(response){
      console.log(response);
    })
  }



  useEffect(()=>{
      handleShow();
      FetchElections();
  },[])

  if(LoggedIn){
    return(
      <Redirect to="/voter" />
    )
  }

    return (
        <div>
        <ToastContainer/>

       
    
          <Modal show={show} onhide={handleClose}  animation={true}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit} >
            <Modal.Body>

            <Row>
            <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select your election</Form.Label>
            <Form.Control onChange={handleChangeElection} as="select">
              
            {ElectionData.map(key=>{
              return(
                <option value={key.name}>{key.name}</option>
              )
            })}
            </Form.Control>
          </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col xs={6} md lg={12}>
            <div>
            <h6>Email: </h6>
            
            
            </div>
           
            <InputGroup className="mb-3">
            <FormControl 
            placeholder="Email"
            aria-label="Username"
            aria-describedby="basic-addon1"
              onChange={(e)=>setEmail(e.target.value)}
              />
            </InputGroup>
            </Col>
            </Row>
            <Row>
            <Col xs={6} md lg={12}>
            <div>
            <h6> Password: </h6>
            
            </div>
            <InputGroup className="mb-3">
            <FormControl 
            placeholder="Enter your password"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e)=>setPassword(e.target.value)}
            />
            </InputGroup>
            </Col>
            </Row>
            <Row>
            <Col>
           <a style={{textAlign:'center', textDecoration:'underline', color:'red', fontWeight:'bold'}} onClick={handleSignUp}> Not a User? Create an account</a>
            </Col>
            </Row>
            
            
            
            
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Login 
              </Button>
            </Modal.Footer>
            </Form>
          </Modal>
    
          {launchSignUp ? <SignUp/> : ' '}
    
            </div>
        
    
        
    )
}

export default VoterLogin;
