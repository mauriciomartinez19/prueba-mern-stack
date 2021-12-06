import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';

class App extends Component {

    constructor() {
        super(); // con esto heredo todas las funcionalidades del componente
        this.state = {
            title: '',
            description:'',
            tasks: [],
            observations: '',
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
            if(this.state._id) {
                fetch(`/api/tasks/${this.state._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Updated'})
                    this.setState({title:'', description: '', observations: '', _id: ''})
                    this.fetchTasks();
                });
            } else {
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.state),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        M.toast({html: 'Task Saved'})//Mensaje en pantalla
                        this.setState({title: '' , description: '', observations:''})
                        this.fetchTasks();
                    })
                    .catch(err => console.log(err));
            }
        e.preventDefault(); //esto es para que no se refresque la pagina
    }

    componentDidMount() {
        this.fetchTasks();
    }


    fetchTasks() {              // con esto obtengo los datos desde el servidor
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data})
            console.log(this.state.tasks);
        });
    }

    deleteTask(id){
        if (confirm("Are you sure you want to delete it?")) {
            fetch (`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => 
                console.log(data),
                M.toast({html:'Task Deleted'}),
                this.fetchTasks()
                )
        }
}

    editTask(id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json ())
        .then(data => 
            this.setState({
                title: data.title,
                description: data.description,
                observations: data.observations,
                _id: data._id
            }),
            )
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render () {
        return (
            <div> 
                {/*NAVIGATION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack V2</a>
                    </div>
                </nav>
                <div className= "container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>                
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task Description"
                                                className="materialize-textarea" value={this.state.description}></textarea>                
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea name="observations" onChange={this.handleChange} placeholder="Task Observations"
                                                className="materialize-textarea" value={this.state.observations}></textarea>                
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th> Title</th>
                                        <th>Description</th>
                                        <th>Observations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>{task.observations}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" style={{margin: "4px"}} 
                                                        onClick= {() => this.deleteTask (task._id)}>
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                        <button onClick= {() => this.editTask (task._id)} className="btn light-blue darken-4" style={{margin: "4px"}}>
                                                        <i className='material-icons'>edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p>
                            <div>
                            <button className="btn light-blue darken-4" style={{marginTop: '20px'}}>
                            <i className='material-icons'>image</i>
                            </button>
                            </div>
                            </p>
                        </div>

                    </div>
                </div>
                

            </div>
        )
    }
}

export default App;