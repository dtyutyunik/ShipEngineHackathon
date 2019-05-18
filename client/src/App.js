import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ToAddress from './components/ToAddress/ToAddress';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Fire from './firebase.js';
import axios from 'axios';

const SANDBOX_KEY = process.env.REACT_APP_SHIPENGINE_SANDBOX_API_KEY;
const URL= 'http://localhost:8000';


class App extends Component {

  constructor(props){
    super(props);
    this.state=({
      name:'',
      address:'',
      zipcode:'',
      email: '',
      password:'',
      user: {},
      view: ''
    })
  }

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
  }

  handleSignUp=(e)=>{
    e.preventDefault();
    Fire.fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then({
              }).catch(function(error) {
                console.log(error)
              });
  }
  handleSignin=(e)=>{
    e.preventDefault();
    Fire.fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then({
              }).catch(function(error) {
                console.log(error)
              });
  }

  handleChange=(e)=>{
    const {name,value}=e.target;
    this.setState({
      [name]:value
    })

  }

  checkAddress= async(e)=>{

    console.log('address clicked')
    // const {name,address,zipcode}= this.state;
    e.preventDefault();
    // axios.get(`${URL}/voting/${this.state.state}/${this.state.place}`);
    try{
      let r=await axios.post(`${URL}/api/v1/validateaddress/`,{address:
        this.state.address
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
  render(){
    const {name,address,zipcode,email,password}=this.state;


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
        address={address}
        zipcode={zipcode}
        handleChange={this.handleChange}
        handleSubmit={this.checkAddress}/>
      </div>
    );
  }
}

export default App;
