import React from 'react';
import logo from './logo.svg';
import {Route,Router,Switch} from 'react-router-dom';
import './App.css';
import {ChakraProvider, ThemeProvider} from '@chakra-ui/react'
import history from './history';
import Login from './Components/Login';
import Profile from './Components/Profile';

function App() {
  return (
      <ChakraProvider>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/profile" exact component={Profile}/>
          </Switch>
        </Router>
      </ChakraProvider>
  );
}

export default App;
