import React, {Component} from 'react';

export default function SignUp(props){

    return(
      <div>
      <form onSubmit={props.handleSubmit}>
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
      <button type='submit'>SignUp</button>
      </form>

      </div>


    )
}
