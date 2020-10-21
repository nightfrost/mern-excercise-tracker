import React, { Component} from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        //Super has to be called when creating a constructor... TODO: wtf is this.
        super(props);
        
        //Bind the methods to the class and state
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        //Assign first default values, matching that of the Mongoose schema, so that we can change the state later.
        this.state = {
            username: ''
        }
    }

    //If user changes username, set the states username to that value.
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    //onSubmit 
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user)

        /* Requires npm install Axios - This is the call to the backend, supplied with a user object. */
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
        <div>
          <h3>Create New User</h3>
           <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            </div>
            <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
            
        )
    }
}