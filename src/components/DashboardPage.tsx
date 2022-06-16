import * as React from "react";
import {Container, Button, Table} from "react-bootstrap";

const stylingObject = {
    div: {
        color: "white"
    }
}

export default class DashboardPage extends React.Component<{currentUser}> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {/* Jumbotron */}
                <div className={"bg-secondary p-5"} style={stylingObject.div}>
                    <h1>Hello, currentUser.username</h1>
                    <p className="lead">Get started by adding a new vocab</p>
                    <Button>Add</Button>
                </div>
                {/* List */}
                <Container>
                    <div id={"vocab-list"}>
                        <h3>Vocab List :</h3>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>World</th>
                                <th>Translation</th>
                                <th>Part Of Speech</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Yes</td>
                                <td>Oui</td>
                                <td>noun</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Hello</td>
                                <td>Salut</td>
                                <td>Interjection</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </>
        );
    }
}