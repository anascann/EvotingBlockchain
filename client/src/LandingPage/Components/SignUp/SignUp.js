import React,{useState,useEffect} from 'react'
import {Modal,Button,Row,Col, InputGroup,FormControl,Form} from "react-bootstrap"
import Axios from "axios"
import {toast, ToastContainer} from "react-toastify"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
export default function SignUp({setSignUpComponent}) {


  //states for signUp

    const [Name,setName]=useState('');
    const [Age,setAge]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [RetypePassword,setReTypePassword]=useState('');
    const [Address,setAddress]=useState('');
    const [City,setCity]=useState('');
    const [Country,setCountry]=useState('');
    const [Phone,setPhone]=useState('');

    const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
  
    const handleClose=()=>{
      setShow(false);
      
    }
    const handleShow = () => setShow(true);
  
    useEffect(()=>{
        handleShow();
    },[])


    const handleSubmit=async e=>{
      e.preventDefault();
      const formData={
        name:Name,
        age:Age,
        email: Email,
        password:Password,
        address: Address,
        city:City,
        country:Country,
        phone: Phone
      }
      console.log(formData)

      Axios({
        method:"POST",
        url:'http://localhost:5000/register',
        data:formData
      })
      .then(function(response){
        console.log(response);
        console.log('Sign up created');
       
        toast.success('User Sign up Succesful');
        toast.success('Please login with your Email ID')
        handleClose();
      })
        .catch(function(response){
          console.log(response);
          console.log('Sign up failed');
          toast.warning('Sign up failed! User exists')
        })

    }



    return (
        <div>
        <ToastContainer/>
        <Modal show={show} onhide={handleClose}  animation={true}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Create your account</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} >
        <Modal.Body>
        <Row>
        <Col xs={6} md lg={6}>
        <h6>
        Name:
        </h6>
        
        <InputGroup>
        <FormControl placeholder="text" onChange={(e)=>setName(e.target.value)}/>
        </InputGroup>
        </Col>

        <Col xs={6} md lg={6}>
        <h6>
        Age:
        </h6>
        <InputGroup>
        <FormControl placeholder="enter your age" onChange={(e)=>setAge(e.target.value)} />
        </InputGroup>
        </Col>
        </Row>

        <Row>
        <Col xs={6} md lg={4}>
        <h6>Email:</h6>
        <InputGroup>
        <FormControl placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        </InputGroup>
        </Col>
        <Col xs={6} md lg={4}>
        <h6>Password:</h6>
        <InputGroup>
        <FormControl placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </InputGroup>
        </Col>
        <Col xs={6} md lg={4}>
        <h6>Retype Password:</h6>
        <InputGroup>
        <FormControl placeholder="Retype Password" onChange={(e)=>setReTypePassword(e.target.value)} />
        </InputGroup>
        </Col>
        </Row>
        <Row>
        <Col xs={6} md lg={4}>
        <h6>Address: </h6>
        <InputGroup>
        <FormControl placeholder="Address" onChange={(e)=>setAddress(e.target.value)} />
        </InputGroup>
        </Col>
        <Col xs={6} md lg={4}>
        <h6>City: </h6>
        <InputGroup>
        <FormControl placeholder="City" onChange={(e)=>setCity(e.target.value)} />
        </InputGroup>
        </Col>
        <Col xs={6} md lg={4}>
        <h6>Country: </h6>
        <InputGroup>
        <FormControl placeholder="Country" onChange={(e)=>setCountry(e.target.value)} />
        </InputGroup>
        </Col>
        </Row>
        <Row>
        <Col xs={6} md lg={6}>
       <h6>Phone:</h6>
       <InputGroup>
       <FormControl placeholder="Phone number" onChange={(e)=>setPhone(e.target.value)} />
       </InputGroup> 
        </Col>
        </Row>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    
        </div>
    )
}
