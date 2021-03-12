import React from 'react';
import PlantFigure from './PlantFigure';
import axios from 'axios';

//Props = addIDToMyPlants myPlantsIDs plantList
export default function PlantContainer (props) {

  const addToMyPlants = (id) => {

    this.props.addIDToMyPlants(id); 
  }

  return (
    <PlantFigure
    plantList={this.props.plantList}
    addToMyPlants={this.addToMyPlants}/>
  );
};