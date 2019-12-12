import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = props => {
  const [username, setUserName] = useState('');
  const onChangeUsername = e => {
    const { name, value } = e.target;
    setUserName(value);
  };
  const onSubmit = e => {
    e.preventDefault();
    const user = {
      username: username
    };
    console.log(user);

    axios
      .post('http://localhost:5000/users/add', user)
      .then(res => {
        setUserName('');
        console.log(res.data);
      })
      .catch(err => console.log(err));
    // props.history.push('/');
  };
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            type='text'
            name='username'
            required
            className='form-control'
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
