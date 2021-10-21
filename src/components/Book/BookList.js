import React,{useState,useEffect} from 'react'
import { ButtonGroup, Card,Table,Button,Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faList,faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from '../Toast'
import { Link } from 'react-router-dom'
const BookList = () => {
 
    const [books, setbooks] = useState([]);
    const [show, setshow] = useState(false)


    useEffect(() => {
        axios.get("/books/")
        .then(res=>{setbooks([...res.data])})
        .catch(err=>console.log("eroor"))
    },[])


    /**
     * events handler
     */

    const deleteBook=(id)=>{
        let bookList=books.filter((book)=>book.id!==id)
        if(window.confirm("Are you sure You wana delete this item")){
             axios.delete("/books/delete/"+id)
             .then(res=>{
                 if(res.data!=null){
                     setbooks([...bookList])
                     setshow(true)
                 }
             }).catch(err=>console.log("Error"))
        }

    }
    return (

        <>
        <div style={{ "display": show ? "block" : "none" }} >
            <MyToast message={"Book deleted Successfully."} />
        </div>
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
                                 <tr key={book.id} >
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
                                            <Link to={`/edit-book/${book.id}`} className="btn btn-sm btn-outline-primary" >
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Link>
                                            <Button size="sm" variant="outline-danger">
                                                <FontAwesomeIcon icon={faTrash} onClick={()=>deleteBook(book.id)}/>
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
    </>
    )
}

export default BookList
