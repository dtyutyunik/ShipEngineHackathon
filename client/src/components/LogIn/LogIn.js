import React, {Component} from 'react';

export default function LogIn(props){

    return(
      <div>
      <form onSubmit={props.handleLogin}>
        <input type='text'
        placeholder='email'
        name='email'
        value={props.email}
        onChange={props.handleChange}
        />
        <input type='password'
        placeholder='password'
        name='password'
        value={props.password}
        onChange={props.handleChange}
        />
      <button type='submit'>Login</button>
      </form>

      </div>


    )
}
