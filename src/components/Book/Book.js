import React, { useState,useEffect } from 'react'
import { Card, Form, Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import MyToast from '../Toast'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import  {createBook, fetchBook, updateBook} from "../../services/Book/actions"


const Book = ({saveBook,savedBook,fetchingBook,fetchedBook,updateBook,updatedBook}) => {
    const initialInputs = { id:"",title: "", author: "", price: "", coverPhotoURL: "", language: "", isbnNumber: "",genre:"" }
    //states
    const [bookInputs, setbookInputs] = useState(fetchedBook)
    const [genres, setgenres] = useState(["History","science"])
    const [languages, setlanguages] = useState(["english","freansh"])
    const [show, setshow] = useState(false)
    const {id}=useParams()
    

    /**
     * life cycle methods
     */
      useEffect(() => {
            axios.get("/books/languages")
            .then(res=>{
                setlanguages(res.data)
            })
            axios.get("/books/genres")
            .then(res=>{
                setgenres(res.data)
            })
            console.log(bookInputs)
            if(id){
               findBookById(id)
            }
      },[])

      useEffect(() => {
          console.log("fetched book")
          setbookInputs({...fetchedBook})
          console.log(fetchedBook)
      
     },[fetchedBook])
      
      const findBookById=(id)=>{
        fetchingBook(id)
                let book=fetchedBook
                if(book!=null){
                    setbookInputs({...fetchedBook})
                    console.log("actual state")
                    console.log(bookInputs)  
                }
      }


    /**
     * events handler
     */

    const handleChange = (e) => {
        setbookInputs({ ...bookInputs, [e.target.name]: e.target.value })
    }
    const handleReset = (e) => {
        setbookInputs({ ...initialInputs })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const Book = { ...bookInputs}
        saveBook(Book)
        if(savedBook!=null){
            setshow(true)
            setTimeout(() => setshow(false),3000)
        }else{
            console.log("erooor")
        }
        setbookInputs({ ...initialInputs })
    }

    const handleUpdate=(e)=>{
        e.preventDefault()
        const Book = { ...bookInputs }
        // axios.put("/books/update/"+id, Book)
        //     .then(res => {
        //         if (res.status === 200 && res.data != null) {
        //             setshow(true)
        //             console.log("hill")
        //         }
        //     })
        //     .catch(err => console.log("erooor"))
         updateBook(id,Book)
         if(updateBook!=null){
             setshow(true)
         }
            setTimeout(() => setshow(false),3000)

    }
    return (
        <>
            <div style={{ "display": show ? "block" : "none" }}>
                <MyToast message={id?"Book Updated Successfully.":"Book Added successfully."} />
            </div>
            <Card className="bg-dark text-white mt-5 border border-dark">
                <Card.Header>
                    {
                        id ? <><FontAwesomeIcon icon={faEdit} className={"ml-5"} />&nbsp; Edit Book Details</>
                        :
                        <> <FontAwesomeIcon icon={faPlusSquare} className={"ml-5"} />&nbsp; Add New Book </>   
                    }  
                    {
                        fetchedBook.title
                    } 
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={id?handleUpdate:handleSubmit} onReset={handleReset}>
                        <Row>
                            <Form.Group className="mb-3" controlId="fjr" as={Col}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" className="bg-dark text-white "
                                    name="title"
                                    value={bookInputs.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fr" as={Col}>
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" placeholder="Enter The Author" className="bg-dark text-white "
                                    name="author"
                                    value={bookInputs.author}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="fjr" as={Col}>
                                <Form.Label>Cover Photo URI</Form.Label>
                                <Form.Control type="text" placeholder="Cover Photo" className="bg-dark text-white "
                                    name="coverPhotoURL"
                                    value={bookInputs.coverPhotoURL}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fr" as={Col}>
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control type="text" placeholder="ISBN Number" className="bg-dark text-white "
                                    name="isbnNumber"
                                    value={bookInputs.isbnNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="fjr" as={Col}>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter price" className="bg-dark text-white "
                                    name="price"
                                    value={bookInputs.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fr" as={Col}>
                                <Form.Label>Language</Form.Label>
                                <select value={bookInputs.language} className="form-control bg-dark text-white"  onChange={handleChange} name="language" >
                                        <option className="bg-dark">Select Language</option>

                                     {
                                        languages.map((language,id)=>
                                        <option key={id} value={language} className="bg-dark">{language}</option>
                                        )
                                     }   
                                 </select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="fr" as={Col}>
                                <Form.Label>Genre</Form.Label>
                                 <select value={bookInputs.genre} className="form-control bg-dark text-white"  onChange={handleChange} name="genre" >
                                        <option className="bg-dark">Select Genre</option>

                                     {
                                        genres.map((genre,id)=>
                                        <option key={id} value={genre} className="bg-dark">{genre}</option>
                                        )
                                     }
                                    
                                 </select>
                            </Form.Group>
                        </Row>

                        <Card.Footer style={{ textAlign: "right" }}>

                            <Button size="sm" variant="success" type="submit" className="">
                                <FontAwesomeIcon icon={faSave} />
                                &nbsp; {id?"Update":"Save"}
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
const mapStateToProps=(state)=>{
    console.log("map props")
    console.log(state.book)
      return{
          savedBook:state.book,
          updatedBook:state.book,
          fetchedBook:state.book
      }
}

const mapDispatchToProps=(dispatch)=>{
    return {
       saveBook: book=> dispatch(createBook(book)),
       updateBook:(Id,book)=>dispatch(updateBook(Id,book)),
       fetchingBook:(bookId)=>dispatch(fetchBook(bookId))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Book) 
