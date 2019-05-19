import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
// import Dashboard from './components/Dashboard'
// import Cards from './components/Cards'
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
// import ScrollToTop from './components/ScrollTop';

export default props => (
    <HashRouter>
      {/* <ScrollToTop> */}
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/login' component={ LogIn } />
          <Route exact path='/signup' component={ SignUp } />
          {/* <Route exact path='/cards' component={ Cards } /> */}
        </Switch>
      {/* </ScrollToTop> */}
    </HashRouter>
  )