import React, {Component} from 'react';

export default function FromAddress(props){

    return(
      <div>
      <h1>From address</h1>
      <form onSubmit={props.handleSubmit}>
        <input type='text'
        placeholder='name'
        name='name'
        value={props.name}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='phone'
        name='phone'
        value={props.phone}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='company_name'
        name='company_name'
        value={props.company_name}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='address_line1'
        name='address_line1'
        value={props.address_line1}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='city'
        name='city'
        value={props.city}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='state'
        name='state'
        value={props.state}
        onChange={props.handleChange}
        />
        <input type='text'
        placeholder='zip'
        name='zip'
        value={props.zip}
        onChange={props.handleChange}
        />


  
      </form>

      </div>


    )
}
