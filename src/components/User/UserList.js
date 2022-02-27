import { faEdit, faList, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, FormControl, Image, InputGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyToast from '../Toast';
import {  useSelector,useDispatch } from 'react-redux'
import { fetchUsers,deleteUser } from '../../services/User/user/actions'

let coverPhotoURL = "https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg"
const UserList = () => {

   // const [listUsers, setUsers] = useState([]);
    const listUsers=useSelector((state)=>state.user.listUsers)
    const success=useSelector((state)=>state.user.success)

    const dispatch=useDispatch();

    useEffect(() => {
        axios.get("/person/")
            .then((res) => dispatch(fetchUsers()))
            .catch((err) => console.log(err))
    },[])

    /**
     * services function 
     */
    const handleDelete = (idUser) => {
        let updatedList = listUsers.filter((user, index) => user.id !== idUser)
        if (window.confirm("Are you sure You wanna delete this item")) {
           dispatch(deleteUser(idUser,updatedList))
        }
    }

    return (
        <div>
            <div style={{ "display": success ? "block" : "none" }}>
                <MyToast message={"User deleted successfully."} />
            </div>

            <Card className="bg-dark text-white mt-5 border border-dark">
                <Card.Header>
                    <div style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faList} />&nbsp;
                        user List
                    </div>
                    {/* <div className="float-end">
                       <InputGroup>
                         <FormControl size="sm"
                          placeholder="search" 
                          value={search} name="search" 
                          className="bg-dark text-white info-border"
                          onChange={(e)=>setsearch(e.target.value)}
                          
                          />&nbsp;
                          <InputGroup.Append>
                             <Button size="sm" variant="outline-info" onClick={()=>searchuser(page.currentPage-1)}>
                                 <FontAwesomeIcon icon={faSearch} />
                             </Button>
                             <Button size="sm" variant="outline-danger" onClick={()=>{resetSearch() }} >
                                  <FontAwesomeIcon icon={faTimes} />
                             </Button>
                          </InputGroup.Append>
                       </InputGroup>
                    </div> */}
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr style={{ cursor: "pointer" }}>
                                <th >User</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                listUsers.length > 0
                                    ?
                                    listUsers.map((user, id) =>
                                        <tr key={id} >
                                            <td >
                                                <Image src={coverPhotoURL} roundedCircle width="30" height="30" />&nbsp;

                                            </td>
                                            <td >{user.firstName}</td>
                                            <td >{user.lastName}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={`/edit-user/${user.id}`} className="btn btn-sm btn-outline-primary" >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                    <Button size="sm" variant="outline-danger">
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>

                                        </tr>

                                    )
                                    :
                                    <tr>
                                        <td align="center" colSpan="6">No user Available.</td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </div>
    )
}

export default UserList