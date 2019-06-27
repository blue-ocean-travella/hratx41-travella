import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const getOpen = (bool) => {
    let open = ''

    if (bool === true) {
        open = 'Currently Open'
    } else {
        open = 'Currently Closed';
    }
    return open;
}

const TimeModal = (props) => {
    // console.log('TimeModal props: ', props)
    return (
        <Modal show={props.show} onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="modalTitle">{props.activity.location.name}
                    <div className="time-modal-hours">Hours of Operation:</div>
                    <div className="time-modal-open">{getOpen(props.activity.location.open)}</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={4}>Sunday:</Col>
                        <Col className="modal-time">12:00 PM - 5:00 PM</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>Monday:</Col>
                        <Col className="modal-time">8:00 AM - 9:00 PM</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>Tuesday:</Col>
                        <Col className="modal-time">8:00 AM - 9:00 PM</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>Wednesday:</Col>
                        <Col className="modal-time">8:00 AM - 10:00 PM</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>Thursday:</Col>
                        <Col className="modal-time">8:00 AM - 10:00 PM</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>Friday</Col>
                        <Col className="modal-time">8:00 AM - 12:00 AM</Col>
                    </Row>
                    <Row>
                        <Col xs={4}>Saturday:</Col>
                        <Col className="modal-time">8:00 AM - 12:00 AM</Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default TimeModal;