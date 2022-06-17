import * as React from "react";
import {Button, Modal} from "react-bootstrap";

export default class NewVocabModal extends React.Component<{}, {show}> {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    // class fields to do the binding outside the constructor
    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true});
    }

    render() {
        const { show } = this.state;
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add
                </Button>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}