import React, { Component } from 'react';

import NavBar from './NavBar';
import SignIn from './Sign';

class App extends Component {

    render() {
        return(
            <div className="my-container">
                <NavBar />
                <SignIn />
            </div>
        )
    }
}

export default App;
