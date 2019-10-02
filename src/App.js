import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import AddRegistration from './components/AddRegistration';
import EditRegistration from './components/EditRegistration';
import Home from './components/Home';
import Registrations from './components/Registrations';
import {Navigation} from './components/Navigation';

class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/editregistration" component={EditRegistration}/>
        <Route path="/registrations" component={Registrations}/>
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
