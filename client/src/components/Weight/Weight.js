import React, {Component} from 'react';

export default function Weight(props){

    return(
      <div>
      <h1>Weignt</h1>
      <form onSubmit={props.handleSubmit}>
        <input type='text'
        placeholder='value'
        name='value'
        value={props.value}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='ounces'
        name='unit'
        value={props.unit}
        onChange={props.handleChange}
        />
        <button type='submit'>Calculate prices</button>
      </form>

      </div>


    )
}
