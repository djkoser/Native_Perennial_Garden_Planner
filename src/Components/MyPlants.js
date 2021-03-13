import React, { Component } from 'react';
import AddedPlant from './AddedPlant';
import axios from 'axios';

//Props from App.js - retrieveMyPlantsList removeFromMyPlants myPlantsList
export default class MyPlants extends Component {
  constructor (props) {
    super(props);
    this.state = {
      notesInput:"",
      editToggle:false
    };
  }


  toggleEdit = () => {
    if (this.state.editToggle === false ){
      this.setState({
        editToggle:true
      })
    }
    axios.put('/api/lists/')
  }

  render() {

    const {_,removeFromMyPlants, myPlantsList} = this.props

    return (
      <div>
        <div>
          <AddedPlant 
          myPlantsList={myPlantsList}
          removeFromMyPlants={removeFromMyPlants}
          toggleEdit={this.toggleEdit}
          bloomTime={'Early Spring'}/>
          
        </div>
        <div>
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Late Spring'}/>
        </div>
        <div>
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Summer'}/>
        </div>
        <div>
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Fall'}/>
        </div>
      </div>
    );
  };
} 