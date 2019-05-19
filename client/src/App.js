import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, HashRouter, Route, NavLink } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Routes from './Routes';
// import Home from './components/Home/Home';
import ToAddress from './components/ToAddress/ToAddress';
import FromAddress from './components/FromAddress/FromAddress';
import SignUp from './components/SignUp/SignUp';
import TestLandPage from './components/TestLandPage/TestLandPage';

import LogIn from './components/LogIn/LogIn';
import Weight from './components/Weight/Weight';
import Button from '@material-ui/core/Button';
import RenderCarriers from './components/RenderCarriers/RenderCarriers';

import Fire from './firebase.js';
import axios from 'axios';
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';


const SANDBOX_KEY = process.env.REACT_APP_SHIPENGINE_SANDBOX_API_KEY;
// const URL= 'http://localhost:8000';
const URL= 'https://openerp2019.appspot.com/api/v1';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      email: '',
      password:'',
      user: {},
      view: '',
      navView: '',
      shipFromAddress: {
        name: '',
        phone: '',
        company_name: '',
        address_line1: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
      },
      shipToAddress: {
        name: '',
        phone: '',
        company_name: '',
        address_line1: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
      },

      weight: {
        value: '',
        unit: 'Ounce'
      },

      package: [
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
      ],
      carriers: [],

    })
  }

  authListener = () => {
    Fire.fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
        console.log(user);
      } else {
        this.setState({user:null})
      }
    });
  }


  componentDidMount = () => {
    this.authListener();
  }



  signOut = () => {
    Fire.fire.auth().signOut();
    console.log('signed out')
  }

  handleSignin = (e) => {
    e.preventDefault();
    Fire.fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then()
      .catch(function(error) {
        console.log(error)
      });
    console.log('logeed in')
  }


  handleAddressTo = (e) => {
    const {name, value} = e.target;

    this.setState(prevState => ({
        shipToAddress: {
          ...prevState.shipToAddress,
          [name]: value
        }
    }))
  }

  handleAddressFrom = (e, fromOrTo) => {
    const {name, value} = e.target;
    this.setState(prevState => ({
          shipFromAddress:{
            ...prevState.shipFromAddress,
            [name]: value
          }
        }))

  }

  handleWeight = (e) => {
    const {name,value}=e.target;
    this.setState(prevState=>({
          weight:{
            ...prevState.weight,
            [name]:value
          }
        }))
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
      let r=await axios.post(`${URL}/validateaddress/`,{address:
        data
      })
      console.log(r.data)
    }catch(e){
      console.log(e)
    }

  }

  // handleSubmit=(e)=>{
  //   e.preventDefault();
  //   console.log('submitted')
  // }

  handleView=(e)=>{
    this.setState({view: e})
  }

  toAddressSubmited=(e)=>{
    e.preventDefault();
    console.log('to address submited')
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

  viewChange=(view)=>{
    this.setState({
      navView: view
    })
    console.log(view)
  }

  calculatePackages=async(e)=>{
    e.preventDefault();
    console.log('packages');

    try{

      let r=await axios.post(`${URL}/getRates/`,{toAddr:
        this.state.shipToAddress, fromAddr: this.state.shipFromAddress, weight: this.state.weight
      })
      this.setState({
        carriers:r.data.status
      })
      console.log(r)
    }catch(e){
      console.log(e)
    }

  }

  buyThis=(e)=>{
    console.log(e)
    console.log('vuy this clicked')
  }
  render(){
    const {email,password,navView}=this.state;
    const {name,phone,company_name,address_line1,city,state,zip}=this.state.shipToAddress;
    // const {name,phone,company_name,address_line1,city,state,zip}=this.state.shipFromAddress;
    const{amount,ounces}=this.state.weight;

    const fromAddr = this.state.shipFromAddress;

    let navigationView='';
    switch (navView) {
      case 'inputOrder':
        navigationView = (
              <div>
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
                handleChange={this.handleWeight}
                handleSubmit={this.calculatePackages}
                />
              </div>
          );
          break;
      case 'shipments':
        navigationView = (<RenderCarriers
          carriers={this.state.carriers}
          buyThis={this.buyThis}/>);
        break;

    }


    return (
      <div className="App">
          {/* <Routes /> */}

    <HashRouter>
    <Switch>
    {/* <Route exact path='/' component={ Home } /> */}
    <Routes />
      <TestLandPage />
    </Switch>
    </HashRouter>

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

      this.state.view === "login" ? 
    <LogIn
        email={email}
        password={password}
        handleChange={this.handleChange}
        handleSubmit={this.handleSignin}
        />:
        ""
        }
        
<Button onClick={this.signOut}> signOut</Button>

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
        handleChange={this.handleWeight}
        handleSubmit={this.calculatePackages}
        />
         

<button onClick={this.signOut}> SignOut</button>


<nav className='internalNav'>
<a onClick={()=>this.viewChange('inputOrder')}>Input Order</a>
<a onClick={()=>this.viewChange('shipments')}>shipments</a>
</nav>

<div className="navigationView">
{navigationView}
</div>

<button onClick={this.processPackage}>show packages</button>

      </div>

  

    );
    
  }
}

export default App;
