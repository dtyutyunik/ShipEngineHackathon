import React, {Component} from 'react';


export default class PackageOrder extends Component{
constructor(props){
  super(props);

}

createFakePackages=()=>{
  console.log(this.state.props.uid)
  console.log('fake packages')




  // if(!!uid){
  //
  //     //Merchants is the name of the table, with everything after + is further into the table
  //     Fire.database.ref('Clients/' + `${uid}`).push({
  //     name: this.state.name,
  //     notes: this.state.notes,
  //     country: this.state.country,
  //     email: this.state.email,
  //     phoneNumber: this.state.phoneNumber,
  //     otherTime: this.state.otherTime
  //   });
  //   // console.log('created')
  // }else{
  //   // console.log('false')
  // }
}

componentDidMount=()=>{
  this.createFakePackages();
}




  render(){
    return(
      <div>
      Packagein


      </div>
    )
  }
}
