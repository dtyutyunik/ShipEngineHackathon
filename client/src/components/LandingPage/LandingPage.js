import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import './LandingPage.css';


export default function LandingPage() {

    return (
        <div>
            <WelcomeBanner />
            <div className="landing-btn-container">
              <Button
                  color="primary"
                variant="contained"
              >
                <NavLink to="/login">Log In</NavLink>
              </Button>
              <Button
                  color="primary"
                variant="contained"

              >
                <NavLink to="/signup">Sign Up</NavLink>
              </Button>
            </div>
        </div>
    )
}
