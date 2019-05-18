import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ToAddress from './components/ToAddress/ToAddress';
import FromAddress from './components/FromAddress/FromAddress';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Weight from './components/Weight/Weight';
import PackageOrder from './components/PackageOrder/PackageOrder';
import Fire from './firebase.js';
import axios from 'axios';

const SANDBOX_KEY = process.env.REACT_APP_SHIPENGINE_SANDBOX_API_KEY;
const URL= 'http://localhost:8000';


class App extends Component {

  constructor(props){
    super(props);
    this.state=({
      email: '',
      password:'',
      user: {},
      view: '',
      shipFromAddress:{
        name: '',
        phone: '',
        company_name: '',
        address_line1: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
      },
      shipToAddress:{
        name: '',
        phone: '',
        company_name: '',
        address_line1: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
      },
      weight:{
        amount: '',
        ounces: ''
      },
      package:[
        {
          shipToAdress: '',
          shipfromAddress: '',
          orderNum: '',
          weight: '',
          tags: '',
          carrierSelected: '',
          trackingNum:'',
          shippingMethod:''
        }
      ]


    })
  }

  // "name": "Mickey and Minnie Mouse",
  //    "phone": "714-781-4565",
  //    "company_name": "The Walt Disney Company",
  //    "address_line1": "500 South Buena Vista Street",
  //    "city_locality": "Burbank",
  //    "state_province": "CA",
  //    "postal_code": "91521",
  //    "country_code": "US"


  authListener=()=>{
      Fire.fire.auth().onAuthStateChanged((user)=>{
        if(user){
          this.setState({user});
          // console.log(user);
        }else{
          this.setState({user:null})
        }

      });
    }
    componentDidMount=()=>{
      this.authListener();
    }



  signOut=()=>{
    Fire.fire.auth().signOut();
    console.log('signed out')
  }

  handleSignUp=(e)=>{
    e.preventDefault();
    Fire.fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then({
              }).catch(function(error) {
                console.log(error)
              });

    console.log('signed up')
  }
  handleSignin=(e)=>{
    e.preventDefault();
    Fire.fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then({
              }).catch(function(error) {
                console.log(error)
              });
    console.log('logeed in')
  }


  handleAddressTo=(e)=>{
    const {name,value}=e.target;
    console.log(e)
    console.log('address ', name, ' ', value)
    this.setState(prevState=>({
        shipToAddress:{
          ...prevState.shipToAddress,
          [name]:value
        }
    }))
  }

  handleAddressFrom=(e, fromOrTo)=>{
    const {name,value}=e.target;
    this.setState(prevState=>({
          shipFromAddress:{
            ...prevState.shipFromAddress,
            [name]:value
          }
        }))

  }

  handleWeight=(e)=>{

  }

  handleChange=(e)=>{
    const {name,value}=e.target;
    this.setState({
      [name]:value
    })

  }

  checkAddress= async(e)=>{

    console.log('address clicked');
    console.log(this.state.address);
    let data={"name": "Mickey and Minnie Mouse",
    "phone": "714-781-4565",
    "company_name": "The Walt Disney Company",
    "address_line1": "500 South Buena Vista Street",
    "city_locality": "Burbank",
    "state_province": "CA",
    "postal_code": "91521",
    "country_code": "US"};
    // const {name,address,zipcode}= this.state;
    e.preventDefault();
    // axios.get(`${URL}/voting/${this.state.state}/${this.state.place}`);
    try{
      let r=await axios.post(`${URL}/api/v1/validateaddress/`,{address:
        data
      })
      console.log(r.data)
    }catch(e){
      console.log(e)
    }




  }

  handleSubmit=(e)=>{
    e.preventDefault();
    console.log('submitted')
  }
  handleView=(e)=>{
    this.setState({view: e})
  }

  toAddressSubmited=(e)=>{
    e.preventDefault();
    console.log('to address submited')
  }

  handleWeight=()=>{

  }

  processPackage=()=>{
    console.log(this.state.user.uid)
    console.log('pacakages clicked')

    const {uid}=this.state.user;
    if(!!uid){

        Fire.database.ref('PackageOrders/' + `${uid}`).push({
        shipToAdress: '',
        shipfromAddress: '',
        orderNum: '',
        weight: '',
        tags: '',
        carrierSelected: '',
        trackingNum:'',
        shippingMethod:''
      });
      console.log('created')
    }else{
      console.log('false')
    }
  }
  render(){
    const {email,password}=this.state;
    const {name,phone,company_name,address_line1,city,state,zip}=this.state.shipToAddress;
    // const {name,phone,company_name,address_line1,city,state,zip}=this.state.shipFromAddress;
    const{amount,ounces}=this.state.weight;

    const fromAddr = this.state.shipFromAddress;

    return (
      <div className="App">
      <a onClick={()=>this.handleView('signup')}>SignUp</a>
      <br/>
      <a onClick={()=>this.handleView('login')}>Log In</a>
      {this.state.view==='signup'?
      <SignUp
        email={email}
        password={password}
        handleChange={this.handleChange}
        handleSubmit={this.handleSignUp}
      />:
     <LogIn
        email={email}
        password={password}
        handleChange={this.handleChange}
        handleSubmit={this.handleSignin}
        />}

<button onClick={this.signOut}> signOut</button>


      <ToAddress
        name={name}
        phone={phone}
        company_name={company_name}
        address_line1={address_line1}
        city={city}
        state={state}
        zip={zip}
        handleChange={this.handleAddressTo}
        handleSubmit={this.toAddressSubmited}/>

        <FromAddress
          name={fromAddr.name}
          phone={fromAddr.phone}
          company_name={fromAddr.company_name}
          address_line1={fromAddr.address_line1}
          city={fromAddr.city}
          state={fromAddr.state}
          zip={fromAddr.zip}
          handleChange={this.handleAddressFrom}
          handleSubmit={this.toAddressSubmited}/>

        <Weight
        state={fromAddr.state}
        zip={fromAddr.zip}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        />
<button onClick={this.processPackage}>show packages</button>


      </div>
    );
  }
}

export default App;
