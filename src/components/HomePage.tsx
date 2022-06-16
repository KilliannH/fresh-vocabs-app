import * as React from "react";
import {Container} from "react-bootstrap";
import {withRouter} from "./with-router";

class HomePage extends React.Component<{}> {
    render() {
        return (
            <Container>
                WILCOMEN
            </Container>
        );
    }
}

export default withRouter(HomePage);