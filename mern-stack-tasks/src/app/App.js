import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();

        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        };

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tasks: data
                });
            })
    }

    addTask(e) {
        // Edit
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.status);
                M.toast({html: data.status});
                this.setState({
                    _id: '',
                    title: '',
                    description: ''
                });
                this.fetchTasks();
                
            })
        } else { // Add
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: data.status});
                this.setState({
                    title: '',
                    description: ''
                });
                this.fetchTasks();
            })
            .catch(err => console.error(err))
        }
        
        e.preventDefault();
    }

    deleteTask(id) {
        if (confirm('¿Estás seguro de querer eliminar la tarea?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: data.status});
                this.fetchTasks();
            })
            .catch(err => console.error(err)) 
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                _id: data._id,
                title: data.title,
                description: data.description
            });
        })
        .catch(err => console.error(err))
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card ">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    name="title" 
                                                    onChange={this.handleChange} 
                                                    type="text" 
                                                    placeholder="Task title"
                                                    value={this.state.title} 
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea 
                                                    name="description" 
                                                    onChange={this.handleChange} 
                                                    placeholder="Task Description" 
                                                    className="materialize-textarea"
                                                    value={this.state.description}
                                                >
                                                </textarea>
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
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button 
                                                            className="btn light-blue darken-4"
                                                            onClick={() => this.deleteTask(task._id)}
                                                        >
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button 
                                                            className="btn light-blue darken-4" 
                                                            style={{margin: '4px'}}
                                                            onClick={() => this.editTask(task._id)}
                                                        >
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;