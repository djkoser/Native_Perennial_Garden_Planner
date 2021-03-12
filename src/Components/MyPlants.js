import React, { Component } from 'react';
import AddedPlant from './AddedPlant';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';


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
    axios.get('/api/lists/true/false')
    .then((res)=> {
      this.setState({
        myPlantsList:res
      })
    })
    .catch((err)=> {toast.error(err)})
  }
  removeFromMyPlants = (id) => {
    axios.delete('/api/lists/')
    .then((res)=> {})
    .catch((err)=> {})
    this.props.removeIDFromMyPlants(id);
  }

  toggleEdit = () => {
    axios.put('/api/lists/')
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