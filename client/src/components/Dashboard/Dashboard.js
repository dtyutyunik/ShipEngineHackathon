import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {  Switch, BrowserRouter as Router, Route, NavLink } from "react-router-dom";


import Orders from '../Orders/Orders';
import Shipments from '../Shipments/Shipments';
import Inputs from '../Inputs/Inputs';


import './Dashboard.css';


export default function Dashboard({ match }) {
    const styles = {
      nav: {
        flexGrow: 1,
      },
    };



    return (
        <div>
            <div className={styles.nav}>
              <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                    Dashboard
                </Typography>
                <Typography variant="h6" color="inherit">
                    <NavLink to={`${match.path}/orders`}>Orders</NavLink>
                </Typography>
                <Typography variant="h6" color="inherit">
                    <NavLink to={`${match.path}/shipments`}>Shipments</NavLink>
                </Typography>
                <Typography variant="h6" color="inherit">
                    <NavLink to={`${match.path}/inputs`}>Input Orders</NavLink>
                </Typography>
                <Typography variant="h6" color="inherit">
                    Accounts Info
                </Typography>
                </Toolbar>
              </AppBar>
          </div>
          <Route path={`${match.path}/orders`} component={Orders} />
          <Route path={`${match.path}/shipments`} component={Shipments} />
          <Route path={`${match.path}/inputs`} component={Inputs} />
        </div>
    )
}
