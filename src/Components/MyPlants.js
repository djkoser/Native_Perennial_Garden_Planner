import React, { Component } from 'react';
import AddedPlant from './AddedPlant';
import axios from 'axios';

//Props: removeIDFromMyPlants
export default class MyPlants extends Component {
  constructor (props) {
    super(props);
    this.state = {
      notesInput:"",
      myPlantsList:"",
      editToggle:false
    };
  }

  retrieveMyPlantsList = () => {

  }
  removeFromMyPlants = (id) => {
    
    this.props.removeIDFromMyPlants(id);
  }

  toggleEdit = () => {

  }

  render() {
    return (
      <div>
        <div>
          <AddedPlant 
          myPlantsIDs={this.state.myPLantsList}
          removeFromMyPlants={this.removeFromMyPlants}
          toggleEdit={this.toggleEdit}
          bloomTime={'Early Spring'}/>
        </div>
        <div>
            <AddedPlant 
            myPlantsIDs={this.state.myPLantsList}
            removeFromMyPlants={this.removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Late Spring'}/>
        </div>
        <div>
            <AddedPlant 
            myPlantsIDs={this.state.myPLantsList}
            removeFromMyPlants={this.removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Summer'}/>
        </div>
        <div>
            <AddedPlant 
            myPlantsIDs={this.state.myPLantsList}
            removeFromMyPlants={this.removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Fall'}/>
        </div>
      </div>
    );
  };
} 