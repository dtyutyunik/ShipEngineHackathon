import React, {Component} from 'react';

export default function SignUp(props){

    return(
      <div>
      <form onSubmit={props.handleSubmit}>
        <input type='text'
        placeholder='value'
        name='value'
        value={props.value}
        onChange={props.handleChange}
        />
        <input type='type'
        placeholder='unit'
        name='unit'
        value={props.unit}
        onChange={props.unit}
        />
      <button type='submit'>SignUp</button>
      </form>

      </div>


    )
}
