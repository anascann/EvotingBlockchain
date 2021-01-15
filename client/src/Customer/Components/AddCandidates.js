import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from "../../Context/UserContext";
import { Button,Row, Col,option, InputGroup, InputGroupAddon, InputGroupText, Input, Form,FormGroup,Label } from 'reactstrap';
import axios from "axios";
import Web3 from "web3";
import ElectionAbi from "../../contracts/Election.json";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css"
export default function AddCandidates() {


    const context=useContext(UserContext);

    const [ElectionData, setElectionData]=useState([]);



    const [ElectionId, setElectionId]=useState(' ');
    const [Name, setName]=useState(' ');
    const [Email,setEmail]=useState(' ');
    const [CandidateID, setCandidateID]=useState(' ');

    const [ElectionContract, setElectionContract]=useState();
    const [Account, setAccount]=useState();


    const fetchElection=async()=>{
        console.log(context.Details.email);
     await axios({
            method: "post",
            url: 'http://localhost:5000/get_election_data',
            data: {
                hostedby: context.Details.email,
            },
            
        }) 
        .then(function(response){
            console.log(response);
            //console.log(response.data);
            setElectionData(response.data);
            console.log(ElectionData);
        })
            .catch(function(response){
                console.log(response);
            })
    }

    const handleElectionNameChange=(e)=>{
        console.log(e.target.value);
        console.log(ElectionData);

        ElectionData.map(key=>{
            if(key.name === e.target.value){
                setElectionId(key. _id);
            }
        })
    }

    const loadWeb3=async()=>{
        if(window.ethereum){
            window.web3=new Web3(window.ethereum);
            await window.ethereum.enable();
            console.log('i am here tooo')
        }else if(window.web3){
            window.web3=new Web3(window.web3.currentProvider);
            console.log('I am here');
        }else{
            window.alert('Non ethereum browser detected!!');
        }
    }

    const loadBlockchainData=async()=>{
        const web3= window.web3;

        const accounts=await web3.eth.getAccounts();
        console.log(accounts);
        const account=accounts[0];
      
        setAccount(account);

        const networkId= await web3.eth.net.getId();
        console.log(networkId);

        const networkData= ElectionAbi.networks[networkId];
        



        if(networkData){
            console.log(networkData.address)
            const election= new web3.eth.Contract(ElectionAbi.abi, networkData.address);
            console.log(election);
            setElectionContract(election);
        }else{
            alert('Smart contract is not yet deployed on your system');
        }

    }
    
    useEffect(()=>{
        fetchElection();
        loadWeb3();
        loadBlockchainData();
        


    },[])

    const SendCandidateData=async()=>{
console.log(CandidateID);
console.log(Name);
console.log(Email);
console.log(ElectionId);
        console.log('going to run transactions');
       let id= (Math.floor(Math.random() * 100) + 1);
       console.log(id, 'ID is here')
      ElectionContract.methods
        .addCandidates(id, Name, Email, ElectionId)
        .send({from : Account })
        .on('transactionhash',()=>{
            console.log('Transaction sent successfully');
            toast.success('Candidate Added!!!');
        })


    }

    const handleAddCandidateSubmit=async(e)=>{
        e.preventDefault();
    

        
        
       setTimeout(() => {
           console.log('Launch Metamask')
        SendCandidateData();
       }, 2000);

    
        
        
    }

    const handleNameChange=(e)=>{
        setName(e.target.value);
      
       
    }


    return (
        <div>
            <h1>Please  add your Candidates</h1>

            
            <Form onSubmit={handleAddCandidateSubmit}>

            <Row>
            <Col>
            <FormGroup>
      <Label for="exampleSelect">Select the Election</Label>
      <Input onChange={handleElectionNameChange} defaultValue=" Please Select Election " type="select" name="select" id="exampleSelect">
        <option disabled> Please Select Election </option>  
      { ElectionData.length > 0  ? ElectionData.map(key=>{
            return(
            <option>{key.name}</option>
            )
        }) : <option>Loading.......</option>} 
      </Input>

    </FormGroup>
</Col>
            </Row>
            
                <Row>
                <Col xs="6">
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input type="text" name="Name" id="exampleEmail" onChange={handleNameChange} placeholder="Enter the candidates name" />
            </FormGroup>
            </Col>
            </Row>

            <Row>
            <Col xs="6">
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" onChange={(e)=>setEmail(e.target.value)} placeholder="enter the candidates email" />
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col xs={3}>
            <Button type="submit">Add Candidate</Button>
            </Col>
            </Row>
            </Form>
            <ToastContainer/>
        </div>
    )
}
