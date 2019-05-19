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


        <select name='unit' value={props.unit} onChange={props.handleChange}>
          <option value="Ounce">Ounce</option>
          <option value="Pound">Pound</option>
          <option value="Gram">Gram</option>
          <option value="Kilogram">Kilogram</option>
        </select>
        <button type='submit'>Calculate prices</button>
      </form>

      </div>


    )
}
