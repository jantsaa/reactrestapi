import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";

export class AddRegistration extends Component {

    constructor(props) {
        super(props);

        this.state = {snackbaropen: false, snackbarmsg: ""}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) => {
        this.setState({snackbaropen: false});
    };

    handleSubmit(event)
    {
        event.preventDefault();
        fetch("http://localhost:5000/lisays",{
        method: "POST",
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            id: event.target.id.value, // ID TÄHÄN
            first: event.target.first.value, // NIMI TÄHÄN
            last: event.target.last.value, // Sukunimi tähän
            age: event.target.age.value // Ikä tähän
        })
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({snackbaropen:true, snackbarmsg: result.message})
        })
        .catch(error => {
            console.log("Error " + error.message);
            this.setState({snackbaropen:true, snackbarmsg: 'Failed'})
        });
        /*(error) => {
            console.log("Error " + error);
            this.setState({snackbaropen:true, snackbarmsg: 'Failed'})
        }
        )*/
    }

    render() {
        return (
            <div className="container">
    
            <Snackbar 
            anchorOrigin = {{vertical:"top", horizontal:"center"}}
            open = {this.state.snackbaropen}
            autoHideDuration = {3000}
            onClose = {this.snackbarClose}
            message = {<span id="message-id"> {this.state.snackbarmsg} </span>}
            action={[
                <IconButton key="close" arial-label="Close" color="inherit" onClick={this.snackbarClose}>
                    X
                </IconButton>
            ]}
            />

            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add registration
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <Row>
                <Col sm={8}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                            type="text"
                            id="id"
                            name="id"
                            required
                            placeholder="id"
                            />
            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First</Form.Label>
                            <Form.Control
                            type="text"
                            id="first"
                            name="first"
                            required
                            placeholder="first"
                            />
            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last</Form.Label>
                            <Form.Control
                            type="text"
                            id="last"
                            name="last"
                            required
                            placeholder="last"
                            />
            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                            type="text"
                            id="age"
                            name="age"
                            required
                            placeholder="age"
                            />
            
                        </Form.Group>
                        <Form.Group>
                            <Button variant='primary' type='submit'>Add reg</Button>
                        
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}

export default AddRegistration