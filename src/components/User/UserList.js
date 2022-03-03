import { faEdit, faFastForward, faForward, faList, faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState,useMemo } from 'react'
import { Button, ButtonGroup, Card,  Image, Table,Spinner, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyToast from '../Toast';
import {  useDispatch } from 'react-redux'
import { FETCH_USERS,DELETE_USER } from '../../services/User/user/types'
import { fetchUsers ,deleteUser} from '../../services/User/user/actions'
import { Query,useQuery,Mutation } from '@redux-requests/react';
import { getQuery,getQuerySelector,getMuta } from '@redux-requests/core';

const RequestError = () => (
    <tr className='alert alert-info'>There was some error during fetching. Please try again.</tr>
  );

let coverPhotoURL = "https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg"
const UserList = () => {

   // const [listUsers, setUsers] = useState([]);
    // const listUsers=useSelector((state)=>state.user.listUsers)
     //const success=useSelector((state)=>state)
    

    //const { data, error, loading, pristine }  = useQuery({ type: FETCH_USERS })
    
    // const   state=useSelector((state)=>state)
    //  const query = getQuery(success, {
    //     type: FETCH_USERS,
    //   });
      //const newstate=useSelector(getQuerySelector({ type: 'FETCH_BOOKS' }))

      /**
       * states
       */
       const usersQuery = useQuery({
        type: FETCH_USERS,
        action: fetchUsers,
      });
      const [loading, setloading] = useState(false)
      const [success, setsuccess] = useState(false)
      const dispatch=useDispatch();
      const users = useMemo(
            () => (usersQuery.data ? usersQuery.data.personList.map(v => v) : []),
            [usersQuery.data],
        );

      /**
       * side effects
       */
        useEffect(() => {
            console.log(usersQuery)
            dispatch(fetchUsers())
        },[])

    /**
     * services function 
     */
    const handleDelete = (idUser) => {
        // let updatedList = listUsers.filter((user, index) => user.id !== idUser)
        setloading(true)
        if (window.confirm("Are you sure You wanna delete this item")) 
           dispatch(deleteUser(idUser)).then(({ status})=>{
            if(status<300 && status>=200){
                setTimeout(()=>{
                    setloading(false)
                    setsuccess(true)
                },600)
                setTimeout(()=>setsuccess(false),3000)
            }
        })
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
                <Card.Body className='d-flex justify-content-center'>
                    {loading ? <div className=''> <Spinner className='justify-content-center' animation="grow" variant="primary" /> </div>
                         :
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
          
                                  
                                { users.length >0 ?
                                
                                    users.map(user=><tr key={user.id} >
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

                                                <Mutation type={DELETE_USER} requestKey={String(user.id)}>
                                                    {({ loading }) => (
                                                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(user.id)}>
                                                        {
                                                            loading? "..." : <FontAwesomeIcon icon={faTrash}  />
                                                        }
                                                       
                                                    </Button>
                                                    )}
                                                 </Mutation>
                                               
                                            </ButtonGroup>
                                        </td>

                                    </tr> 

                                    )
                                    : 
                                    <tr>
                                        <td align="center" colSpan="6">No User Available.</td>
                                    </tr>

                                }
                              
                        </tbody>
                    </Table>
                    }
                    
                 
                    
                </Card.Body>
                <Card.Footer>
{/*                     
                    <div style={{ float: "left" }}>
                        Showing {page.currentPage} Of {page.totalPages}
                    </div>
                    <div style={{ float: "right" }}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button size="sm" variant="outline-info" disabled={page.currentPage === 1 ? true : false}
                                  onClick={First}
                                >
                                    <FontAwesomeIcon icon={faFastBackward} />  First
                                </Button>
                            </InputGroup.Prepend>
                            <InputGroup.Prepend>
                                <Button size="sm" variant="outline-info" disabled={page.currentPage === 1 ? true : false}
                                  onClick={prevPage}
                                >
                                    <FontAwesomeIcon icon={faBackward} />  Prev
                                </Button>
                            </InputGroup.Prepend>

                            <FormControl className="bg-dark" name="currentPage" value={page.currentPage} 
                               onChange={changePage}
                               style={StyleInput} type="number" min="1" 
                               disabled={page.currentPage===Math.ceil(page.totalElements/booksPerPage)?true:false}
                            />

                            <InputGroup.Append>
                                <Button size="sm" variant="outline-info" disabled={page.currentPage === page.totalPages ? true : false}
                                  onClick={nextPage}
                                >
                                    <FontAwesomeIcon icon={faForward} />  Next
                                </Button>
                            </InputGroup.Append>
                            <InputGroup.Append>
                                <Button size="sm" variant="outline-info" disabled={page.currentPage === page.totalPages ? true : false}
                                  onClick={lastPage}
                                >
                                    <FontAwesomeIcon icon={faFastForward} />  Last
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div> */}
                </Card.Footer>
            </Card>

        </div>
    )
}

export default UserList