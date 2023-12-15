import React from 'react';
import {Card, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const TaskPage = () => {
    return (
        <div>
            <Container className="mt-5">
                <Card style={{width: '20rem'}}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <p className="btn btn-success btn-sm">Status</p>
                        <div className="action justify-content-end d-flex gap-2">
                        <Button variant="primary btn-sm">Edit</Button>
                        <Button variant="danger btn-sm">Delete</Button>
                        <Button variant="dark btn-sm">Update</Button>

                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default TaskPage;