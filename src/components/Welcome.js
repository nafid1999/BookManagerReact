
import { Card } from "react-bootstrap";
import { Container,Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const Welcome = () => {
 
  const marginTop={
    marginTop:"20px"
  }
  return (
    <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <div className=" mt-4 p-5 bg-dark text-white rounded" >
              <h1>Book Manager</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat..</p>
            </div>

            </Col>
        </Row>
      </Container>
  );
};

export default Welcome;
