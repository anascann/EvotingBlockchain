import React from 'react'
import {Carousel} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import anim from  "../Assets/EnigVote..gif"
import Citem2 from "../Assets/Carousel2.png"
import Citem3 from "../Assets/citem3.png"
import "./Body.css"
export default function Body() {
    return (
        <div className="mainbody">
        <Carousel>
        <Carousel.Item interval={2000} >
          <img
            className="d-block w-100"
            src={anim}
            height="650"
            width="400"

            alt="First slide"
          />
          <Carousel.Caption>
            <h3 style={{color:'ThreeDDarkShadow'}}>Welcome!!</h3>
    
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000} id="item">
          <img
          id="back"
            className="d-block w-100"
            src={Citem2}
            alt="Third slide"
            style={{backgroundColor:"black"}}
            height="650"
            width="400"

            
          />
      
          <Carousel.Caption interval={2000}>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={Citem3}
            alt="Third slide"
            height="650"
            width="400"
          />
      
          <Carousel.Caption>
         
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        </div>
    )
}
