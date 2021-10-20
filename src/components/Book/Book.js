import React,{useState} from 'react'
import { Card,Form,Button,Col,Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faSave,faUndo } from '@fortawesome/free-solid-svg-icons'

const Book = () => {
    const initialInputs={   title:"", author:"", price:"",photo:"",language:"",isbnNumber:""}
    //states
    const [bookInputs, setbookInputs] = useState(initialInputs)

    /**
     * events handler
     */

    const handleChange=(e)=>{
        setbookInputs({bookInputs,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const Book={...bookInputs}
        axios.post("/books/create",Book)
        .then(res=>{
            if(res.status===201 && res.data!=null){
                console.log("success")
            }
        })
        .catch(err=>console.log("erooor"))

    }
    return (
        <Card className="bg-dark text-white mt-5 border border-dark">
            <Card.Header> 
                <FontAwesomeIcon icon={faPlusSquare} className={"ml-5"}/>&nbsp;
                Add Book

            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
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
                            name="photo"
                            value={bookInputs.photo}
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
                            <Form.Control type="text" placeholder="Enter Language" className="bg-dark text-white " 
                            name="language"
                            value={bookInputs.language}
                            onChange={handleChange}
                            required
                            />
                        </Form.Group>
                    </Row>
                    

                    <Card.Footer style={{textAlign: "right"}}>
                   
                        <Button size="sm" variant="success" type="submit" className="">
                            <FontAwesomeIcon icon={faSave} />
                            &nbsp;  Submit
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
    )
}

export default Book
