import React from 'react';
//Import BrowserRouter from React-router-dom npm install. Helps route our URLS.
import { BrowserRouter as Router, Route} from "react-router-dom"
//Import Bootstrap for the good loks ;)
import "bootstrap/dist/css/bootstrap.min.css"

//Import components from component folder.
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//create routes for the individual components, using BrowserRouter.
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
