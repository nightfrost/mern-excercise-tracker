import React, { Component} from 'react';
/* DatePicker requires npm install react-datepicker. Last import is styling for said datepicker. */
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


export default class CreateExercises extends Component {
    constructor(props) {
        //Super has to be called when creating a constructor... TODO: wtf is this.
        super(props);
        
        //Bind the methods to the class and state
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        //Assign first default values, matching that of the Mongoose schema, so that we can change the state later.
        this.state = {
            username: '',
            discription: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    //On username change, set this state's username to target value.
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    //On description change, set this state's description to target value.
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    //On Duration change, set this state's duration to target value.
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    //On date change, set this state's date to target value.
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
    <div>
        <h3>Create New Exercise Log</h3>
        {/* Making the submit of the form go to onSubmit method. */}
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          {/* In this form we set the value of username to whatever the state's first username is (which is blank, set in the constructor)
            When  the user inputs something, and leaves the row, it will call onChangeUsername, which sets the states username to whatever is
            in the box.
          */}
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                  /*This works for some reason... TODO: read. */
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        {/* The description is set to blank in constructor, so it will be blank by default. On change calls onChange Description
            which will set the state of description to whatever is in the field

            The same is done for the other fields.

            Date picker uses the newly created Date from constructor as well, but uses a fancy smancy datepicker!
        */}
        <div className="form-group"> 
          <label>Description: </label>
          <input  
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
            required
              type="number" 
              className="form-control"
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
}