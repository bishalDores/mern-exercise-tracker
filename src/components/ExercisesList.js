import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const ExercisesList = () => {
  const[exercise,setExercise] = useState([]);

  const deleteExercise = (id) => {
    axios.delete('http://localhost:5000/exercises/' + id)
    .then(res =>{
      let tempExercise = exercise;
      tempExercise = tempExercise.filter(el => el._id !== id);
       setExercise(tempExercise);
    })
    .catch(err => console.log(err));
    
  }
  useEffect(()=>{
    axios.get('http://localhost:5000/exercises')
      .then(res => {
        setExercise(res.data);
      })
      .catch(err => console.log(err))
  },[]);
  const ExercisesList = () =>{
      return (
        exercise.map(currentExercises => {
          return <Exercise exercise={currentExercises} deleteExercise={deleteExercise} key={currentExercises._id}/>
        })
      )
  }
  return (
    <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ExercisesList()}
          </tbody>
        </table>
      </div>
  );
};

export default ExercisesList;
