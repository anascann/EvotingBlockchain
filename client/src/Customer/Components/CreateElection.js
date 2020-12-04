import React,{useState,useContext} from 'react';
import {useForm } from "react-hook-form";
import {Input} from "reactstrap";
import axios from "axios";
import {UserContext} from "../../Context/UserContext";

export default function CreateElection() {
    const context=useContext(UserContext);

    const { register, errors, handleSubmit } = useForm();

    const[ElectionName, setElectionName]=useState(' ');
    const [VotersNum,setVotersNum]=useState(0);
    const [userEmail,setUserEmail]=useState(context.Details.email);

    const onSubmit=async ()=>{
        //e.preventDefault();
        console.log('submit was clicked')

        const formdata={
            name: ElectionName,
            totalvoters: VotersNum,
            hostedby: userEmail
        }

        console.log(formdata);
        axios({
            method:"post",
            url:'http://localhost:5000/create_election',
            data: formdata
        })
        .then(function(response){
            console.log(response)
            console.log('election created')
        })
            .catch(function(response){
                console.log(response);
                console.log('election creation failed');
            })

 
    }

    function handleElectionNameChange (e){
        console.log(e.target.value);
        setElectionName(e.target.value);
    }

    function handleVotersnumChange(e){
        console.log(e.target.value);
        setVotersNum(e.target.value);
    }
    return (
        <div>
           <header><h1>Create An Election: </h1></header> 
           <form onSubmit={handleSubmit(onSubmit)}>
           <Input  onChange={handleElectionNameChange} name="election" placeholder="Enter your Election Name" type="text" ref={register({ required: true })} />
           {errors.firstName && "Election name is required"}
           <Input onChange={handleVotersnumChange} name="totalvoters" type="number" ref={register({ required: true })} />
           {errors.lastName && "No. of Voters is required is required"}
           <input type="submit" />
         </form>
           
        </div>
    )
}
