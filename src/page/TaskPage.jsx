import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {listTaskRequest} from "../apiRequest/apiRequest.js";

const TaskPage = () => {
    let [data, setData] = useState([]);
    let [change, setChange] = useState(0);

    useEffect(() => {
        (async () => {
            let res = await listTaskRequest();
            setData(res);
        })()
    }, [change]);

    // const onDelete = async (id) => {
    //     let res = await deleteTaskRequest(id);
    //     if (res) {
    //         toast.success("Delete completed");
    //         setChange(new Date().getTime())
    //     } else {
    //         toast.error("Delete fail")
    //     }
    // }

    return (
        <div>
            <Container className="mt-5">
                {data.map((task) => (
                    <Card key={task.id} style={{width: '20rem'}} className="mb-3">
                        <Card.Body>
                            <Card.Title>{task.workTitle}</Card.Title>
                            <Card.Text>{task.taskDetails}</Card.Text>
                            <div className="d-flex align-items-center gap-2">
                                <p className={`btn btn-${task.workStatus === 'Done' ? 'success' : 'warning'} btn-sm`}>
                                    {task.workStatus}
                                </p>
                                <p className="text-muted sm-text">Last Updated: {task.lastUpdated}</p>
                            </div>

                            <div className="action justify-content-end d-flex gap-2">
                                <Button variant="primary btn-sm">Edit</Button>
                                <Button variant="danger btn-sm" onClick={() => onDelete(task.id)}>
                                    Delete
                                </Button>
                                <Button variant="dark btn-sm">Update</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default TaskPage;