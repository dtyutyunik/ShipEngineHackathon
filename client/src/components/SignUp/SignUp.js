import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Fire from '../../firebase';
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';


const styles = theme => ({
  main: {
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props)
    const {classes} = props;
    this.classes = classes;
    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      }
    }

  }
  handleSignUp=(e)=>{
    e.preventDefault();
    Fire.fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then({
              }).catch(function(error) {
                console.log(error)
              });

    console.log('signed up')
  }

handleSubmit=(e)=>{
  e.preventDefault();
  console.log('submitted')
}


render() {
const {classes} = this;
    return (
    <main className={classes.main}>
        <WelcomeBanner />
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={this.props.handleSubmit}  >
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">username</InputLabel>
            <Input id="username" username="username" autoComplete="username" autoFocus />
          </FormControl>  
          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus 
            value={this.props.email}
            onChange={this.props.handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" 
             value={this.props.password}
            onChange={this.props.handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </main>
  );
}

}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
