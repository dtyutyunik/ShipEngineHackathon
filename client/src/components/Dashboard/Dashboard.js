import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import './Dashboard.css';


export default function Dashboard() {

    return (
        <div>
            <WelcomeBanner />
            <h1>Dashboard</h1>
        </div>
    )
}
