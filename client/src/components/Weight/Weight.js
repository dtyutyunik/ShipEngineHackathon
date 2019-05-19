import React, {Component} from 'react';
// import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

class Weight extends React.Component {
  constructor(props) {
    super(props)
    const {classes} = props
    this.classes = classes;
    this.state = {
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    };
  }
 

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this;

    return (
      <div className={classes.root}>
        <TextField
        onSubmit={this.props.handleSubmit}
          
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Value"
          value ={this.props.value}
          onChange={this.props.handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">Value</InputAdornment>,
          }}
        />  

        <TextField
          id="outlined-adornment-weight"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Ounces"
          value={this.props.unit}
          onChange={this.props.handleChange}
          helperText="Weight"
          InputProps={{
            endAdornment: <InputAdornment position="end">unit</InputAdornment>,
          }}
        />
        <Button type='submit'>Calculate prices</Button>
        

      </div>
    );
  }
}

Weight.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Weight);


