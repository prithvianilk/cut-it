import React from 'react';
import {Route,Router,Switch} from 'react-router-dom';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react'
import history from './history';
import Login from './Components/Login';
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import theme from './themes';
import store from './Store/store';
import Profile from './Components/Profile';
function App() {
  return (
      <ChakraProvider theme={theme}>
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
