import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from "react-router-dom"
import { Button, Card, Col, Form, Row,Alert } from 'react-bootstrap'
import { faEdit, faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import MyToast from '../Toast'
import { useForm } from "react-hook-form";
import {  useSelector,useDispatch } from 'react-redux'
import { createUser,fetchUser,updateUser } from '../../services/User/user/actions'

const registerOptions = {
  
    firstName: {
      required: "firstName is required",
      minLength: {
        value: 3,
        message: "firstName must have at least 3 characters"
      },
      maxLength: {
        value: 20,
        message: "firstName must have at last 20 characters"
      }
      
    },
    lastName: {
        required: "lastName is required",
        minLength: {
          value: 3,
          message: "lastName must have at least 3 characters"
        },
        maxLength: {
            value: 20,
            message: "lastName must have at last 20 characters"
          }

      }
}
const User = () => {
  

    /**
     * for Redux Store
     */
    //const success=useSelector((state)=>state.user.success)
    const dispatch=useDispatch();
     const [success, setsuccess] = useState(false)
    const { id } = useParams();
    /**
     * use Form validation
     */
    const { register, handleSubmit,formState:{ errors }, setValue } = useForm();
    const onErrors = errors => console.error(errors);
    /**
     * side effect events
     */

    useEffect(() => {
        console.log(id)
        if(id!==undefined){
            dispatch(fetchUser(id)).then(({data})=>{
            setValue("firstName",data.firstName )
            setValue("lastName",data.lastName )
           })     
        }
    }, [id])
    

    /**
     * services methods
     */

    const handlehSubmit = (data) => {
        console.log("toto", data);
         if(id!==undefined){
          // dispatch(updateUser({...data,id},id))
          dispatch(updateUser(id,{...data,id})).then(({ status})=>{
            if(status<300 && status>=200){
                setsuccess(true)
                setTimeout(()=>setsuccess(false),3000)
            }
        })
         }else
           dispatch(createUser(data))
           .then(({ status})=>{
               if(status<300 && status>=200){
                   setsuccess(true)
                   setTimeout(()=>setsuccess(false),3000)
               }
           })

    }

    return (
        <>
            <div style={{ "display": success ? "block" : "none" }}>
                <MyToast variant="danger"  message={id ? "User Updated Successfully." : "User Added successfully."} />
            </div>
            <Card className="bg-dark text-white mt-5 border border-dark">
                <Card.Header>
                    {
                        id ? <><FontAwesomeIcon icon={faEdit} className={"ml-5"} />&nbsp; Edit User Details</>
                            :
                            <> <FontAwesomeIcon icon={faPlusSquare} className={"ml-5"} />&nbsp; Add New User </>
                    }
                </Card.Header>
                <Card.Body>
                     {false && <Alert variant="danger">Fields are not valid</Alert>}

                    <Form onSubmit={handleSubmit(handlehSubmit,onErrors)} className="needs-validation"  >
                        <Row>
                            <Form.Group className="mb-3" controlId="fjr" as={Col}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your First Name" className={"bg-dark text-white"+(errors.firstName?" is-invalid":"")}
                                    name="firstName"
                                    {...register('firstName',registerOptions.firstName)}
                                    
                                />
                                <span className='text-danger'>{errors?.firstName && errors.firstName.message}</span>                                 
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fr" as={Col}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Last Name" className={"bg-dark text-white"+(errors.lastName?" is-invalid":"")} 
                                    name="lastName"
                                    {...register('lastName',registerOptions.lastName)}
                                    
                                />
                              
                                <span className='text-danger'>{errors?.lastName && errors.lastName.message}</span>

                            </Form.Group>
                        </Row>

                        <Card.Footer style={{ textAlign: "right" }}>

                            <Button size="sm" variant="success" type="submit" className="">
                                <FontAwesomeIcon icon={faSave} />
                                &nbsp; {id ? "Update" : "Save"}
                            </Button>
                            &nbsp;
                            <Button size="sm" variant="secondary" type="reset" >
                                <FontAwesomeIcon icon={faUndo} />
                                &nbsp;  Reset
                            </Button>
                        </Card.Footer>
                    </Form>

                </Card.Body>
            </Card>
        </>

    )
}

export default User
