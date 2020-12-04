import React,{useState, useEffect, useContext} from 'react'
import { Button,Row, Col,option, InputGroup, InputGroupAddon, InputGroupText, Input, Form,FormGroup,Label } from 'reactstrap';
import {UserContext} from "../../Context/UserContext";
import axios from "axios";
import "./Styles.css"
export default function AddVoters() {
const context=useContext(UserContext);
const [ElectionData,setElectionData]=useState([]);
const [ElectionID,setElectionID]=useState(' ');
const [Items,setItems]=useState([]);
const [Value,setValue]=useState(' ');
const [Error,setError]=useState(null);


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

useEffect(()=>{
    fetchElection();
},[])

    const handleKeyDown = evt => {
        if (["Enter", "Tab", ","].includes(evt.key)) {
          evt.preventDefault();
    
          var value = Value.trim();
    
          if (value && isValid(value)) {
            // this.setState({
            //   items: [...this.state.items, this.state.value],
            //   value: ""
            // });

            // setItems({
            //     ...Items,
            //     Value
            // });

            setItems([...Items, value]);
            setValue(" ");
          }
        }
      };

      const handleChange = evt => {
        // this.setState({
        //   value: evt.target.value,
        //   error: null
        // });

        setValue(evt.target.value);
        setError(null);
      };

     const handleDelete = item => {
        // this.setState({
        //   items: this.state.items.filter(i => i !== item)
        // });

        setItems(Items.filter(i=>i!=item));
      };

      const  handlePaste = evt => {
        evt.preventDefault();
    
        var paste = evt.clipboardData.getData("text");
        var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
    
        if (emails) {
          var toBeAdded = emails.filter(email => !isInList(email));
    
        //   this.setState({
        //     items: [...this.state.items, ...toBeAdded]
        //   });

         // setItems(...Items, ...toBeAdded );
        setItems([
            ...Items,
            ...toBeAdded
        ])
        }
      };

     function isValid(email) {
        let error = null;
    
        if (isInList(email)) {
          error = `${email} has already been added.`;
        }
    
        if (!isEmail(email)) {
          error = `${email} is not a valid email address.`;
        }
    
        if (error) {
        //  this.setState({ error });
          setError(error)
    
          return false;
        }
    
        return true;
      }
    
      function isInList(email) {
        return Items.includes(email);
      }
    
     function isEmail(email) {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
      }

     const handleElectionNameChange=(e)=>{
         console.log(e.target.value);

         ElectionData.map(key=> {
             if(key.name===e.target.value){
                setElectionID(key._id);
                console.log(key. _id);
             }

             console.log(ElectionID);
         })
     }

    return (
        <div>
            <h1>I add Voters</h1>
            <br/>
            <Form>
            <Row>
            <Col>
            
        
      <FormGroup>
      <Label for="exampleSelect">Select the Election</Label>
      <Input onChange={handleElectionNameChange} type="select" name="select" id="exampleSelect">
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
            <Col xs={3}>
            <Label>Enter The EmailID's of Voters </Label>
            
            {Items.map(item => (
                <div className="tag-item" key={item}>
                  {item}
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleDelete(item)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <FormGroup>
              
              <Input
          className={"input " + (Error && " has-error")}
          value={Value}
          placeholder="Type or paste email addresses and press `Enter`..."
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={handlePaste}
        />
       
        </FormGroup>

        {Error && <p className="error">{Error}</p>}
            </Col>
            </Row>
            <Row>
            <Col xs={3}>
            <Button type="submit">Add Voters</Button>
            </Col>
            </Row>
            

            
            </Form>
        </div>
    )
}
