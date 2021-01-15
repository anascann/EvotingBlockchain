import React, {useState, useEffect } from 'react'
import { Button,Row, Col,option, InputGroup, InputGroupAddon, InputGroupText, Input, Form,FormGroup,Label } from 'reactstrap';
import axios from "axios";
import Web3 from "web3";
import {Redirect} from "react-router-dom"
import ElectionAbi from "../contracts/Election.json";

export default function Voter() {

    const [ElectionId, setElectionId]=useState();
    const [VoterEmail, setVoterEmail]=useState(' ');
    const [LogOut,setLogOut]=useState(false);

    const [ElectionContract, setElectionContract]=useState();
    const [Account, setAccount]=useState();

    const [CandidateData, setCandidateData]=useState([]);
    const [CandidateID , setCandidateID]=useState([]);
    const [CandidateName, setCandidateName]=useState([]);

    const [MyVote, setMyVote]=useState();
    






    const loadWeb3=async()=>{
        if(window.ethereum){
            window.web3=new Web3(window.ethereum);
            await window.ethereum.enable();
            console.log('i am here tooo')
        }else if(window.web3){
            window.web3=new Web3(window.web3.currentProvider);
            await window.ethereum.enable();
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


    // async function getvoters(){
    //     console.log(ElectionId);
    //     return  ElectionContract.methods.getfromarray(ElectionId).call(); 
    // }
    // const fetchcandidates=async()=>{

    //     // getvoters().then(response=>{
    //     //     console.log(response);
    //     // }).catch(err=>console.log(err));

    //     return await  

    // }
    



    
    useEffect(()=>{
        setVoterEmail(localStorage.getItem('email'));
        setElectionId(localStorage.getItem('eid'));

        loadWeb3();
        loadBlockchainData();

           
    },[])

    const handlefetchClick=async()=>{
        console.log(ElectionId,'ElectionID is')
       const result= await ElectionContract.methods
       .getCandidate(ElectionId)
       .call({from :Account});
console.log(result);
       setCandidateData(result);

       setCandidateID(result[0]);
       setCandidateName(result[1]);


    //  ElectionContract.events.getcandidates().on('data',function(event){
    //        console.log(event);
    //    })
    
}
       



    const handleVoteSubmission=(e)=>{
        e.preventDefault();
    
        ElectionContract.methods
        .vote( MyVote)
        .send({from : Account })
        .on('transactionhash',()=>{
            console.log('Transaction sent successfully');

           
        })

        setTimeout(() => {
            alert('Your vote Submitted!! Loging you out!!')
    setLogOut(true);
        }, 10000);

        
       
        

    }

    const handleSelect=async(e)=>{
        console.log(e.target.value);

        setMyVote(e.target.value);
    }

    if(LogOut){
        return(
            <Redirect to="/"/>
        )
    }



    

    return (
        <div>
        <Row>
            <Col xs="3"></Col>
            <Col xs="6">  <h1>Welcome to the Voter Page</h1></Col>
        </Row>
          
        <br/>
        
        <Row>
        <Col xs="3"></Col>
        <Col><Button onClick={handlefetchClick}>Load Candidate</Button></Col>
        </Row>
        <Row>
            <Col xs="3">   </Col>
            <Col xs="6"> 
            
            <Form onSubmit={handleVoteSubmission}>
            <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" defaultValue=" Choose your Candidate " onChange={handleSelect} name="select" id="exampleSelect">
            <option disabled > Choose your Candidate </option> 
            {CandidateName.map((key,index)=>{
                  return(
                      <option value={CandidateID[index]}>{key}</option>
                  )
              })}
            </Input>
            <br/>
            <Button type="submit" color="primary">Press the Button To Vote</Button>
            </FormGroup>

    
            </Form>
            </Col>
        </Row>


        

           

            

            
            





        </div>
    )
}
