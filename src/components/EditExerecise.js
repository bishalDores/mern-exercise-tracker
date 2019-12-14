import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { browserHistory } from 'react-router';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercises = props => {
  const [exerciseList, setExerciseList] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  });

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/' + props.match.params.id)
    .then(res =>{
      setExerciseList({
        ...exerciseList,
        username: res.data.username,
        duration:res.data.duration,
        description:res.data.description,
        date: new Date(res.data.date)
      })
    })
    
    .catch(err => console.log(err))
  }, []);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setExerciseList({
      ...exerciseList,
      [name]: value
    });
  };

  const onDateChange = date => {
    setExerciseList({
      ...exerciseList,
      date: date
    });
  };

  const onsubmit = e => {
    e.preventDefault();

    const exercise = {
      username: exerciseList.username,
      description: exerciseList.description,
      duration: exerciseList.duration,
      date: exerciseList.date
    };
    axios
      .post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
      .then(res => {
        setExerciseList({
          ...exerciseList,
          username: '',
          description: '',
          duration: 0,
          date: ''
        });
      })
      .catch(err => console.log(err));
  };

  const { username, description, duration, date, users } = exerciseList;

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onsubmit}>
      <div className='form-group'>
          <label>Username: </label>
          <input
            type='text'
            name='description'
            required
            className='form-control'
            value={username}
            onChange={onChangeHandler}
            disabled
          />
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            name='description'
            required
            className='form-control'
            value={description}
            onChange={onChangeHandler}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='text'
            className='form-control'
            name='duration'
            value={duration}
            onChange={onChangeHandler}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onDateChange} />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Edit Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercises;
