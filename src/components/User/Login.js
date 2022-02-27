import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignInAlt,faEnvelope,faLock,faUndo } from '@fortawesome/free-solid-svg-icons'
import {Card, Col, Form, InputGroup, Row,FormControl,Button} from 'react-bootstrap'
import { Alert } from 'bootstrap'
import { connect, useSelector,useDispatch } from 'react-redux'
import {authenticateUser}  from "../../services/User/auth/actions"
import { connectAdvanced } from 'react-redux'

const Login = (props)=> {

    const {isLoggedin}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
   

    let validate=()=>{
      dispatch(authenticateUser("test","test"))
    }
    
    return (
        <Row className="justify-content-md-center mt-5">
          {isLoggedin && <div className="alert alert-danger">{"connectAdvanced"}</div>}
        <Col xs={5}>
        
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      size="sm"
                      required
                      autoComplete="off"
                      type="text"
                      name="email"
                      className={"bg-dark text-white"}
                      placeholder="Enter Email Address"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row className="mt-3">
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      size="sm"
                      required
                      autoComplete="off"
                      type="password"
                      name="password"
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button
                size="sm"
                type="button"
                variant="success"
                onClick={()=>validate()}
                 >
                

                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="info"
              
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
     
    )
}

// const mapStateToProps=(state)=>{
//   console.log("map prcrops")
//   console.log(state)
//     return{
//         login:state.auth
//     }
// }

// const mapDispatchToProps=(dispatch)=>{
//   return {
//      doauthenticateUser: ()=> dispatch(authenticateUser("test","test")),
//   }
// }

export default Login
