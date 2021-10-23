import React, { useState, useEffect } from 'react'
import { ButtonGroup, Card, Table, Button, Image, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faEdit, faFastBackward, faFastForward, faForward, faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from '../Toast'
import { Link } from 'react-router-dom'
var StyleInput={
    width:"45px",
    border:"1px solid #17A2B8",
    color:"#17A2B8",
    fontWeight:"bold",
    textAlign:"center"

}
const BookList = () => {
    const booksPerPage = 2
    const [books, setbooks] = useState([]);
    const [show, setshow] = useState(false)
    const [page, setPage] = useState({
        currentPage: 1,
        totalPages: 0,
        totalElements: 0,

    })
    
    const findAllBooks=(currentPage)=>{
        axios.get(`/books?page=${currentPage}&size=${booksPerPage}`)
        .then(res => {
            setbooks([...res.data.content])
            
        })
        .catch(err => console.log("eroor"))
    }

    useEffect(() => {
        axios.get(`/books?page=${page.currentPage - 1}&size=${booksPerPage}`)
        .then(res => {
            setbooks([...res.data.content])
            setPage({
                currentPage: res.data.number+1,
                totalPages: res.data.totalPages,
                totalElements: res.data.totalElements
            })
        })
        .catch(err => console.log("eroor"))
    }, [])


    /**
     * events handler
     */

    const deleteBook = (id) => {
        let bookList = books.filter((book) => book.id !== id)
        if (window.confirm("Are you sure You wana delete this item")) {
            axios.delete("/books/delete/" + id)
                .then(res => {
                    if (res.data != null) {
                        setbooks([...bookList])
                        setshow(true)
                    }
                }).catch(err => console.log("Error"))
        }

    }
    const lastPage=()=>{
        let condition=Math.ceil(page.totalElements/booksPerPage)
        if(page.currentPage<condition){
            setPage({...page,currentPage:condition})
            findAllBooks(condition-1)
        }
    }

    const nextPage=()=>{
        let condition=Math.ceil(page.totalElements/booksPerPage)
        if(page.currentPage<=condition){
            setPage({...page,currentPage:page.currentPage+1})
            findAllBooks(page.currentPage)
        }
    }
    const First=()=>{
        setPage({...page,currentPage:1})
        findAllBooks(0)
    } 
    const prevPage=()=>{
        setPage({...page,currentPage:page.currentPage-1})
        findAllBooks(page.currentPage-2)
    }

    const changePage=(e)=>{
        setPage({...page,[e.target.name]:parseInt( e.target.value)})
        findAllBooks(parseInt(e.target.value-1))
    }
    return (

        <>
            <div style={{ "display": show ? "block" : "none" }} >
                <MyToast message={"Book deleted Successfully."} />
            </div>
            <Card className="bg-dark text-white mt-5 border border-dark">
                <Card.Header>
                    <FontAwesomeIcon icon={faList} />&nbsp;
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
                                books.length > 0
                                    ?
                                    books.map((book, id) =>
                                        <tr key={book.id} >
                                            <td >
                                                <Image src={book.coverPhotoURL} roundedCircle width="30" height="30" />&nbsp;
                                                {book.title}
                                            </td>
                                            <td >{book.author}</td>
                                            <td >{book.isbnNumber}</td>
                                            <td >{book.price}</td>
                                            <td >{book.language}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={`/edit-book/${book.id}`} className="btn btn-sm btn-outline-primary" >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                    <Button size="sm" variant="outline-danger">
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteBook(book.id)} />
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
                 {books.length>0 &&
                <Card.Footer>
                    
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
                    </div>
                </Card.Footer>
               }
            </Card>
        </>
    )
}

export default BookList
