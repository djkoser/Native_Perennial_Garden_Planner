import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import SearchBox from './Components/SearchBox';
import MyPlants from './Components/MyPlants'

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      myPlantsIDs:[]
    };
  }

  removeIDFromMyPlants = (id) => {

  }; 

  addIDToMyPlants = (id) => {

  }

  render() {

    return (
      <div className="App">
        <Header/>
        <SearchBox addIDToMyPlants={this.addIDToMyPlants} myPlantsIDs={this.state.myPlantsIDs}/>
        <MyPlants removeIDFromMyPlants={this.removeIDFromMyPlants}/>
      </div>
    );
  }
}; 



