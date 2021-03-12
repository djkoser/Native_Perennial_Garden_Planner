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
    let newList = this.state.myPlantsIDs.forEach((el,ind,arr) => id===el ? arr.splice(ind,1) : null); 
    this.setState({
      myPlantsIDs:newList
    })
  }; 

  addIDToMyPlants = (id) => {
    let newList = [...this.state.myPlantsIDs,id]; 
    this.setState({
      myPlantsIDs:newList
    })
  };

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



