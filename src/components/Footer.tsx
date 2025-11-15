import {Container, Row, Col, Stack} from "react-bootstrap"

export default function Footer(){
    return(
        <footer>
            <Container fluid >
                <Row className="bg-secondary text-white p-20" >
                    <Col className="mx-2 ">
                       <Stack>
                           <p>
                               Bootcamp: <cite title="Source Title">Front End Software Developer-- Final Project </cite>
                            </p>
                            <p className="bg-primary text-white p-1">
                                <em><small>
                                Using an online API of your choice, create a React project.
                                Project must meet the following criteria:<br></br>
                                1. Use React Router and have at least 3 pages using React Bootstrap or an alternative styling library.<br></br>
                                2. Contain at least 10 custom components.<br></br> 
                                3. Allow for all CRUD operations via one or more APIs
                                </small></em>
                            </p>
                            
                       </Stack>
                    </Col>

                </Row>
                
            </Container>
        </footer>
    )
}