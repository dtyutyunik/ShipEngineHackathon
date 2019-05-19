import React, {Component} from 'react';
import './WelcomeBanner.css';


export default function WelcomeBanner() {

    return (
            <div className="logo-container">
                <img src={require('../../media/shimplelogo_text.png')} className="logo"/>
            </div>
    )
}
