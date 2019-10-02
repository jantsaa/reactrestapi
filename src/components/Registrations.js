import React,{Component} from 'react';
import {Table,ButtonToolbar,Button} from 'react-bootstrap';
import {AddRegistration} from './AddRegistration';
import {EditRegistration} from "./EditRegistration";


export class Registrations extends Component {

    constructor(props) {
        super(props);
        this.state={regs : [], addModalShow:false, editModalShow: false}
    }

    componentDidMount() {
        this.refreshList();
    }

    /*refreshList() {
        //tämä päivittää näytön myös
        this.setState({regs: [{id:1,first:'Matti', last:'Möttönen',age:44},
        {id:2,first:'Aku', last:'Ankka',age:54}]})
        //tähän fetch
    }*/

    refreshList() {
        fetch("http://localhost:5000/haku")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({regs:data})
        });
    }

    deleteReg(id) {
        if(window.confirm("Are you sure?")) {
            fetch(`http://localhost:5000/poisto/${id}`, {
                header: {
                    "Accept": "application/json", 
                    "Content-Type": "application/json"
                },
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.refreshList();
            })
            .catch(err => console.log(err));
        }

    }

    render() {
        const {regs, id, first, last, age} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow:false})
        return (
            <div>
              <ButtonToolbar>
              <Button
                variant='primary'
                onClick={()=>this.setState({addModalShow:true})}
                >Add Registration</Button>
                <AddRegistration
                show={this.state.addModalShow}
                onHide={addModalClose}
                />
            </ButtonToolbar>
               <Table>
                   <thead>
                    <tr>
                        <th>Id</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Age</th>
                        <th>Options</th>
                    </tr>
                   </thead>
                   <tbody>
                    
                    {regs.map(reg=>
                        <tr key={reg.id}>
                            <td>{reg.id}</td>
                            <td>{reg.first}</td>
                            <td>{reg.last}</td>
                            <td>{reg.Age}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info" 
                                    onClick= {() => this.setState({editModalShow:true, id:reg.id, first:reg.first, last:reg.last, age: reg.Age})} 
                                    >Edit</Button>

                                    <Button className="mr-2" onClick= { () => this.deleteReg(reg.id)} variant="danger">Delete</Button>

                                    <EditRegistration 
                                    show = {this.state.editModalShow}
                                    onHide= {editModalClose}
                                    id= {id}
                                    first= {first}
                                    last= {last}
                                    age= {age}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )
                    }
                       

                   </tbody>
               </Table> 
            </div>
        )
    }
}

export default Registrations