import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './App'
import Home from './components/Home/Home'
import Character from './components/Character/Character'

const Routes = () =>  (
  <Switch>
    <Route exact path='/' component={App}/>
    <Route path='/home' component={Home}/>
    <Route path='/character' component={Character}/>
  </Switch>
)

export default Routes