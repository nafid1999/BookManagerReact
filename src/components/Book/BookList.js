import React from 'react'
import { Card,Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
const BookList = () => {
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
                        <tr>
                        
                            <td align="center" colSpan="6">No Book Available.</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>

    </Card>
    )
}

export default BookList
