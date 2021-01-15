import React,{useState,useEffect,useContext} from 'react'
import {Modal,Button,Row,Col,InputGroup,FormControl,Form} from "react-bootstrap"
import {toast,ToastContainer} from "react-toastify"
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios"
import {Redirect} from "react-router-dom"
import {UserContext} from "../../../Context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "../SignUp/SignUp"

export default function Login({setLoginComponent}) {

  const {Details,setDetails}=useContext(UserContext);
  const [LoggedIn,setLoggedIn]=useState(false);

    const [show, setShow] = useState(false);
    const [test,setTest]=useState(false);
  //const handleClose = () => setShow(false);
  const [launchSignUp,setLaunchSignUp]=useState(false);

  const handleClose=()=>{
    setShow(false);
    setLoginComponent(false);
  }
  const handleShow = () => setShow(true);

  useEffect(()=>{
      handleShow();
  },[])

  //variable for user login.
  const [Email,setEmail]=useState('');
  const [Password,setPassword]=useState('');

  const handleSubmit=async e=>{
    e.preventDefault();
    
    const formData={
      email:Email,
      password: Password
    }
    
    Axios({
      method:"POST",
      url: "http://localhost:5000/login",
      data: formData
    })  
    .then(function(response){
      
      console.log(response);
     
      console.log(response.data.data);
      localStorage.setItem('token',response.data.data.token);
     // setDetails.name(response.data.data.name);
      //setDetails.email(response.data.data.email)
      setDetails({
        ...Details,
        name:response.data.data.name,
        email:response.data.data.email
      });

      

      toast.success('Login Successfull');

        setTimeout(() => {
          setLoggedIn(true);
          handleClose();    
        }, 1500);
      


  
      
      
    
    })
      .catch(function(response){
        console.log(response);
        toast.warn('Email or password is incorrect');
      })
  }

  function handleSignUp(){
console.log('yes working');
setLaunchSignUp(true);
  }
    
    return (
        <div>
        
       { /* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
    </Button> */}
    
    <ToastContainer/>

    {LoggedIn ? <Redirect to ="/customer"/> :''}

      <Modal show={show} onhide={handleClose}  animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
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
