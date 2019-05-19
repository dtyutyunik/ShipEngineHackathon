import React, {Component} from 'react';
import './RenderCarriers.css';

export default function RenderCarriers(props){

  return(
    <div className='carriers'>

    <h1>Shipment Options</h1>

    {props.carriers.map((i,index)=>{
      return(<div key={index} className='carrierList'>
      {i.carrier_friendly_name==='Stamps.com'?
      <img src={require('../../media/usps.png')} alt={i.carrier_friendly_name}/>:
      <img src={require('../../media/fedex.png')} alt={i.carrier_friendly_name}/>
      }
        <p>Dev Days: {i.carrier_delivery_days}</p>
        <p>Dev Date: {i.estimated_delivery_date.split('T')[0]}</p>


        <p>package_type: {i.package_type}</p>
        <p>service_type: {i.service_type}</p>
          <p>Cost: {i.shipping_amount!==null?i.shipping_amount.amount:null}</p>
        <button onClick={()=>props.buyThis(i)}>Buy This</button>
        </div>)
    })}



    </div>
  )
}
