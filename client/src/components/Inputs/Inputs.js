import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


import ToAddress from '../ToAddress/ToAddress';
import FromAddress from '../FromAddress/FromAddress';


class Inputs extends Component {


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



    render() {
      const styles = theme => ({
            root: {
                width: 'auto',
                display: 'block', // Fix IE 11 issue.
                marginLeft: theme.spacing.unit * 3,
                marginRight: theme.spacing.unit * 3,
                [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                  width: 400,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                },

            },
            paper: {
                marginTop: theme.spacing.unit * 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
              },
      });


    const {name,phone,company_name,address_line1,city,state,zip}=this.state.shipToAddress;



    return (
        <div className={styles.root}>

            <h2>Add New Order</h2>
            <Paper className={styles.paper} elevation={1}>

                <form className={styles.form}>

                    <h3>Order Detail</h3>
                    <TextField
                      id="ordernum"
                      label="Order # / Name"
                      className={styles.textField}
                      value={this.state.ordernum}
                      margin="normal"
                    />
                    <TextField
                      id="plateform"
                      label="Selling Platform"
                      className={styles.textField}
                      value={this.state.platform}
                      margin="normal"
                    />
                     <TextField
                      id="value"
                      label="Value"
                      className={styles.textField}
                      value={this.state.value}
                      margin="normal"
                  />

                    <FormControl className={styles.formControl}>
                      <InputLabel htmlFor="age-simple">Unit</InputLabel>
                      <Select
                        value={this.state.unit}
                        onChange={this.handleChange}
                        inputProps={{
                          name: 'unit',
                          id: 'unit',
                        }}
                      >
                        <MenuItem value="Onuce">
                          <em>oz</em>
                        </MenuItem>
                        <MenuItem value="Pound">lb</MenuItem>
                        <MenuItem value="Gram">g</MenuItem>
                        <MenuItem value="Kilogram">kg</MenuItem>
                      </Select>
                    </FormControl> 
                     <TextField
                      id="producttype"
                      label="Product Type"
                      className={styles.textField}
                      value={this.state.producttype}
                      margin="normal"
                    />


            </form>


            <ToAddress
                name={name}
                phone={phone}
                company_name={company_name}
                address_line1={address_line1}
                city={city}
                state={state}
                zip={zip}
                handleChange={this.handleAddressTo}
                handleSubmit={this.toAddressSubmited}
            />


            <FromAddress
                name={name}
                phone={phone}
                company_name={company_name}
                address_line1={address_line1}
                city={city}
                state={state}
                zip={zip}
                handleChange={this.handleAddressTo}
                handleSubmit={this.toAddressSubmited}
            />



            </Paper>
        </div>
    )
    };
}


export default Inputs;
