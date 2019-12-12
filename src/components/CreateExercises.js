import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { browserHistory } from 'react-router';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const CreateExercises = props => {
  const [exerciseList, setExerciseList] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  });

  useEffect(() => {
    axios.get('http://localhost:5000/users/').then(res => {
      console.log(res);
      if (res.data.length > 0) {
        setExerciseList({
          ...exerciseList,
          users: res.data.map(user => user.username),
          username: res.data[0].username
        });
      }
    });
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
    console.log(exercise);
    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => {
        setExerciseList({
          ...exerciseList,
          username: '',
          description: '',
          duration: 0,
          date: ''
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));

    // props.history.push('/');
  };

  const { username, description, duration, date, users } = exerciseList;

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onsubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            name='username'
            required
            className='form-control'
            value={username}
            onChange={onChangeHandler}>
            {users.map(function(user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
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
            value='Create Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercises;
