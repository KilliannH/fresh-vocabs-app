import * as React from "react";
import {Container, Button, Table} from "react-bootstrap";
import NewVocabModal from "./NewVocabModal";
import { partOfSpeechItems } from "../constants";

const stylingObject = {
    div: {
        color: "white"
    }
}

const sampleData = [
    {id: 1, word: "yes", translation: "oui", partOfSpeech: 1},
    {id: 2, word: "Hello", translation: "Salut", partOfSpeech: 8},
]

export default class DashboardPage extends React.Component<{currentUser}> {

    constructor(props) {
        super(props);
    }

    displayTable = (items) => {
        return items.map((item) => {
            return(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.word}</td>
                    <td>{item.translation}</td>
                    <td>{partOfSpeechItems[item.partOfSpeech - 1]}</td>
                </tr>
            );
        });
    }

    render() {
        const {currentUser} = this.props;
        return (
            <>
                {/* Jumbotron */}
                <div className={"bg-secondary p-5"} style={stylingObject.div}>
                    <h1>Hello, {currentUser.username}</h1>
                    <p className="lead">Get started by adding a new vocab</p>
                    <NewVocabModal />
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
                            {this.displayTable(sampleData)}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </>
        );
    }
}