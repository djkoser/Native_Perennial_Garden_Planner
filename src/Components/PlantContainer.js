import React from 'react';
import PlantFigure from './PlantFigure';
import axios from 'axios';

//Props = addIDToMyPlants myPlantsIDs plantList
export default function PlantContainer (props) {

  const {addIDToMyPlants, myPlantsIDs, plantList} = props;

  const addToMyPlants = (id) => {
    axios.post('/api/lists', )
    .then((res)=> {})
    .catch((err)=> {})
    addIDToMyPlants(id); 
  }; 

  return (
    <PlantFigure
    plantList={this.props.plantList}
    addToMyPlants={this.addToMyPlants}/>
  );
};