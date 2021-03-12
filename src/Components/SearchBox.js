import React, { Component } from 'react';
import PlantContainer from './PlantContainer';
import axios from 'axios';

//addIDToMyPlants myPlantsIDs
export default class SearchBox extends Component {
  constructor (props) {
    super(props); 
    this.state = {
      botanicalName:"", 
      commonName:"",
      sun:"",
      bloomTime:"",
      matureHeight:0,
      moisture:"",
      plantList:[],
      userAddedCount:0
    };
  };

  addNewPlant = () => {

  }

  filterPlants = () => {

  }

  render() {
    return (
      <PlantContainer
      addIDToMyPlants={this.props.addIDToMyPlants}
      myPlantsIDs={this.props.myPlantsIDs}
      plantList={this.state.plantList}/>
    );
  };
};