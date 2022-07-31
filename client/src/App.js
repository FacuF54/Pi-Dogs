import './App.css';
import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from './component/landig/landing';
import Home from './component/home/home';
import Detail from './component/cardDetail/detail';
import Created from './component/form/create';
import Error from './component/error/error';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home/:id" component={Detail}/>
        <Route path="/home" component={Home}/>
        <Route path="/create" component={Created}/>
        <Route path="*" component={Error}/>
      </Switch>
    </div>
  );
}

export default App;
