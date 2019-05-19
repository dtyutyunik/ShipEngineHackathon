import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

export default function ToAddress (props) {

    return(
      <div>

      <h3>Ship To</h3>
        <TextField type='text'
        label='Name'
        name='name'
        value={props.name}
        onChange={props.handleChange}
        />
        <TextField type='text'
        label='Phone'
        name='phone'
        value={props.phone}
        onChange={props.handleChange}
        />
        <TextField type='text'
        label='Company Name'
        name='company_name'
        value={props.company_name}
        onChange={props.handleChange}
        />
        <TextField type='text'
        label='Address Line'
        name='address_line1'
        value={props.address_line1}
        onChange={props.handleChange}
        />
        <TextField type='text'
        label='City'
        name='city'
        value={props.city}
        onChange={props.handleChange}
        />
        <TextField type='text'
        label='State'
        name='state'
        value={props.state}
        onChange={props.handleChange}
        />
        <TextField type='text'
        label='Postal Code'
        name='zip'
        value={props.zip}
        onChange={props.handleChange}
        />


      </div>


    )
}
