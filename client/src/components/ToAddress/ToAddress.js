import React, {Component} from 'react';

export default function ToAddress(props){

    return(
      <div>
      <form onSubmit={props.submit}>
        <input type='text'
        placeholder='name'
        name='name'
        value={props.name}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='address'
        name='address'
        value={props.address}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='zipcode'
        name='zipcode'
        value={props.zipcode}
        onChange={props.handleChange}
        />


      <button type='submit'>Submit</button>
      </form>

      </div>


    )
}
