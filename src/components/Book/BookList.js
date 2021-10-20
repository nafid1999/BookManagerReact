import React,{useState,useEffect} from 'react'
import { ButtonGroup, Card,Table,Button,Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faList,faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
const BookList = () => {
 
    const [books, setbooks] = useState([]);

    useEffect(() => {
        axios.get("/books/")
        .then(res=>{setbooks([...res.data])})
        .catch(err=>console.log("eroor"))
    },[])

    return (
        <Card className="bg-dark text-white mt-5 border border-dark">
            <Card.Header>
                <FontAwesomeIcon icon={faList}/>&nbsp;
                 Book List
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN Number</th>
                            <th>Price</th>
                            <th>Langage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                            {
                                books.length>0
                                ?
                                 books.map((book,id)=>
                                 <tr>
                                     <td >
                                         <Image src={book.coverPhotoURL} roundedCircle width="30" height="30"/>&nbsp;
                                         {book.title}
                                    </td>
                                     <td >{book.author}</td>
                                     <td >{book.isbnNumber}</td>
                                     <td >{book.price}</td>
                                     <td >{book.language}</td>
                                     <td>
                                         <ButtonGroup>
                                            <Button size="sm" variant="outline-primary">
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                            <Button size="sm" variant="outline-danger">
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                         </ButtonGroup>
                                     </td>
                                   
                                 </tr>
                                 
                                 )
                                :
                                <tr>
                                     <td align="center" colSpan="6">No Book Available.</td>
                                </tr>
                                
                            }
                       
                    </tbody>
                </Table>
            </Card.Body>

    </Card>
    )
}

export default BookList
