import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
//import NewsItem from './components/NewsItem';
//import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
     <div>
      <Router>
    <NavBar/>
    {/* key is used to remount the link as react thinks that by default there is no need to remount link*/}
    <Switch>
      <Route exact path="/"><News key="general" pageSize={6} country="in" category="general" name="General"/></Route>
      <Route exact path="/business"><News key="business" pageSize={6} country="in" category="business" name="Business"/></Route>
      <Route exact path="/entertainment"><News key="entertainment" pageSize={6} country="in" category="entertainment" name="Entertainment"/></Route>
      <Route exact path="/general"><News key ="general" pageSize={6} country="in" category="general" name="General"/></Route>
      <Route exact path="/health"><News key="health" pageSize={6} country="in" category="health" name="Health"/></Route>
      <Route exact path="/science"><News key="science" pageSize={6} country="in" category="science" name="Science"/></Route>
      <Route exact path="/sports"><News key="sports" pageSize={6} country="in" category="sports" name="Sports"/></Route>
      <Route exact path="/technology"><News key="technology" pageSize={6} country="in" category="technology" name="Technology"/></Route>
    </Switch>
    </Router>
    </div>
    )
  }
}



//if we use function based components than make all functions const and do not use this.
// and instead of componentDidMount use useEffect() function
//whereever this.setState is used ,replace it with setState hook and update the props