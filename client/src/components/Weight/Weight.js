import React, {Component} from 'react';

export default function Weight(props){

    return(
      <div>
      <h1>Weignt</h1>
      <form onSubmit={props.handleSubmit}>
        <input type='text'
        placeholder='amount'
        name='amount'
        value={props.amount}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='ounces'
        name='ounces'
        value={props.ounces}
        onChange={props.handleChange}
        />
      </form>

      </div>


    )
}
