import React,{useState,useContext} from 'react'
import Navcomponent from "./Components/Navcomponent"
import {UserContext} from "../Context/UserContext";
export default function Customer() {
  const context=useContext(UserContext);
  const Info=context.Details;
  return (
    <div>
    {console.log(context.Details.name)}
      <Navcomponent Information={Info}/>
    </div>
  )
}
