import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"

class Home extends Component {
    constructor(){
        super()
        this.state={
            isDisplay: false
        }
    }

    componentDidMount(){
        setTimeout(() => {this.setState({isDisplay: true})}, 1)
    }

    render(){
        if (this.props.isSignedIn === false) {
            return <Redirect to="/" />
        }
        return(
            <div className="home-display" style={this.state.isDisplay ? {"opacity": "1",} : {"opacity": "0",}}>
                {/* <h1 class="font-weight-bold peach-gradient pb-2" >Welcome {this.props.userLoginInfo.user.first_name}</h1> */}
        
            </div>
            
            
        )
    }
}

export default Home