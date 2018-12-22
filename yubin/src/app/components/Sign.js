import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.validateUser = this.validateUser.bind(this);
    }

    componentDidMount() {
        //M.AutoInit();
        var elem = document.querySelector('.tabs');
        //var instance = M.Tabs.getInstance(elem);

        var options = {swipeable: true}

        var instance = M.Tabs.init(elem, options);
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    validateUser(e) {
        //obtener usuario introducido con state
        //obtener de BD los usuarios
        //ver si existe el email
        //Si existe, comparamos contraseña
        console.log(this.state);
        if (this.state.firstName != "") {
            this.SignUp();
        }
        else {
            this.SignIn();
        }
        e.preventDefault();
    }

    SignUp() {
        fetch('/users/signup', {
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
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            });
        })
        .catch(err => console.error(err))
    }

    SignIn() {
        console.log("Sign In");
        fetch('/users/signin', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: data.status});
            // this.setState({
            //     firstName: '',
            //     lastName: '',
            //     email: '',
            //     password: ''
            // });
        })
        .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="my-container my-background-color-3 valign-wrapper">
                <div className="row">
                    <div className="card large">
                        <div className="card-content center-align"><h4>Welcome to Yubin</h4></div>
                        <div className="card-tabs center-align">
                            <ul className="tabs">
                                <li className="tab"><a className="active" href="#signin">Sign In</a></li>
                                <li className="tab"><a href="#signup">Sign Up</a></li>
                            </ul>
                        </div>
                        <div className="card-content center-align">
                            <div id="signin">
                                <form onSubmit={this.validateUser}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                type="email"
                                                id="signinEmail"
                                                name="email"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="signinEmail">Email</label>
                                            <span class="helper-text" data-error="You must type an email here"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                type="password"
                                                id="signinPassword"
                                                name="password"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="signinPassword">Password</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">
                                        Sign in
                                    </button>
                                </form>
                            </div>
                            <div id="signup">
                                <form onSubmit={this.validateUser}>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="firstName">First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="lastName">Last Name</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="email"
                                                id="signupEmail"
                                                name="email"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="signupEmail">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                id="signupPassword"
                                                name="password"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="signupPassword">Password</label>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;