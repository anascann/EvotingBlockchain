import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from "../../Context/UserContext";
import {Table, Button,Row, Col,option, InputGroup, InputGroupAddon, InputGroupText, Input, Form,FormGroup,Label } from 'reactstrap';
import axios from "axios";
import Web3 from "web3";
import ElectionAbi from "../../contracts/Election.json";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css"



export default function ResultsMonitor() {

    const context=useContext(UserContext);

    const [ElectionData, setElectionData]=useState([]);
    const [ElectionId, setElectionId]=useState(' ');

    const [ElectionContract, setElectionContract]=useState();
    const [Account, setAccount]=useState();

    const [CandidateName, setCandidateName]=useState();
    const [CandidateId, setCandidateId]=useState();
    const [CandidateEmail, setCandidateEmail]=useState();
    const [CandidateVote, setCandidateVote]=useState();

    const[DataFetched, setDataFetched]=useState(false);


    

    
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

    const handleElectionNameChange=(e)=>{
        console.log(e.target.value);
        console.log(ElectionData);

        ElectionData.map(key=>{
            if(key.name === e.target.value){
                setElectionId(key. _id);
            }
        })
    }

  

    const handleFetchCandidates=async(e)=>{
        e.preventDefault();

        console.log(ElectionId);
        console.log('initiaing launch');

        console.log(ElectionId,'ElectionID is')
        const result= await ElectionContract.methods
        .getCandidate(ElectionId)
        .call();
        console.log(result);

        setCandidateId(result[0]);
        setCandidateName(result[1]);
        setCandidateEmail(result[2]);
        setCandidateVote(result[3]);

     

        setDataFetched(true);
    }

    const DeclareVictory=async()=>{

        

        var arr= new Array(CandidateVote.length);

        CandidateVote.map((key,index)=>{
            arr[index]=parseInt(key);
        });

        console.log(arr);

        var maxnum= Math.max(...arr);
        console.log(maxnum);
        var ele= arr.findIndex(item=> item ===maxnum);
        console.log(ele);

        var winner = CandidateName[ele];
        var winneremail =CandidateEmail[ele];

        console.log(winner);
        console.log(winneremail);

        var losers=[];

        losers=await CandidateEmail.filter(key=> !key.includes(winneremail));
        console.log(losers);

        

        await axios({
            url:'http://localhost:5000/election_result',
            method:'post',
            data:{
                "winner" : winneremail,
                "losers": losers,
                "votes": maxnum
            }
        }).then(async(response)=>{
            console.log(response);
            toast.success(` Yuhhuuuu !! ${winner} won the election.`)
        }).catch(err=>console.log(err));
    

    }

    return (
        <div>
            <h1>Results</h1>


            <Form onSubmit={handleFetchCandidates} >

            <Row>
            <Col>
            <FormGroup>
      <Label for="exampleSelect">Select the Election</Label>
      <Input defaultValue=" Please Select an Election " onChange={handleElectionNameChange} type="select" name="select" id="exampleSelect">
        <option disabled > Please Select an Election </option>
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
            <Col xs="3">
            <Button type="submit">Fetch Election Data</Button>
            </Col>
            </Row>
            </Form>

            <Row>
            <Col xs="6">
            <Table striped>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Email</th>
                <th>Total Vote Count</th>
              </tr>
            </thead>
            <tbody>
              
                
              { DataFetched ? CandidateName.map((key,index)=>{

                return(
                  <tr>
                  <td>{key}</td>
                  <td>{CandidateEmail[index]}</td>
                  <td>{CandidateVote[index]}</td>
                  </tr>
                )
            }) :''  }
               
              
          
            </tbody>
          </Table>
            </Col>
            </Row>
            <ToastContainer/>
            <Button onClick={DeclareVictory} > Declare Victory </Button>
          
            




        </div>
    )
}
