import React, {Component} from 'react';
import './RenderCarriers.css';

export default function RenderCarriers(props){

  return(
    <div className='carriers'>
    <h1>ShipMent Options</h1>
    {props.carriers.map((i)=>{
      return(<div className='carrierList'>
        <p>Dev Days: {i.carrier_delivery_days}</p>
        <p>Dev Date: {i.estimated_delivery_date}</p>
        <p>Cost: {i.shipping_amount.amount}</p>
        <p>Carrier: {i.carrier_friendly_name}</p>
        <p>package_type: {i.package_type}</p>
        <p>service_type: {i.service_type}</p>

        </div>)
    })}

    </div>
  )
}
