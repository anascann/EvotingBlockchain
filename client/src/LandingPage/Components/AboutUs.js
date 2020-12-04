import React from 'react'
import {Row,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutUs() {
    return (
        <div>
            <Row>
            <Col xs={6} md lg={12}>
            <h1 style={{color:'gray',  textAlign:'center'}}>About Us</h1>
            </Col>
            </Row>
        </div>
    )
}
