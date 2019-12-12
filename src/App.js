import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExercisesList from './components/ExercisesList';
import EditExercise from './components/EditExerecise';
import CreateExercises from './components/CreateExercises';
import CreateUser from './components/CreateUser';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className='container'>
        <Route path='/' exact component={ExercisesList} />
        <Route path='/edit/:id' exact component={EditExercise} />
        <Route path='/create' exact component={CreateExercises} />
        <Route path='/user' exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
