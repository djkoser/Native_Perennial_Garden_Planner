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
      minHeight:0,
      maxHeight:0,
      moisture:"",
      plantList:[],
      userAddedCount:0
    };
  };

  addNewPlant = () => {
    axios.post('/api/lists')
    .then((res)=> {})
    .catch((err)=> {});
  }

  filterPlants = () => {
    axios.get('/api/lists/false/true')
    .then((res)=> {})
    .catch((err)=> {})
  }

  handleChange = (value,key) => {
    this.setState({
      [key]:value
    })
  }

  render() {
    const {botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture, plantList, userAddedCount} = this.state
    return (
      <div>
        <label>Botanical Name</label>
        <input onChange={event=>this.handleChange(event.target.value,"botanicalName")} value={botanicalName}></input>
        <label>Common Name</label>
        <input onChange={event=>this.handleChange(event.target.value,"commonName")} value={commonName}></input>
        <label>Sun</label>
        <select onChange={event=>this.handleChange(event.target.value,"botanicalName")} value={sun}>
          <option value={"Full"}>Full</option>
          <option value={"Full, Partial"}>Full, Partial</option>
          <option value={"Partial"}>Partial</option>
          <option value={"Partial, Full Shade"}>Partial, Full Shade</option>
          <option value={"Full Shade"}>Full Shade</option>
          <option value={"Full, Partial, Full Shade"}>Full, Partial, Full Shade</option>
        </select>
        <label>Bloom Time</label>
        <select onChange={event=>this.handleChange(event.target.value,"bloomTime")} value={bloomTime}>
          <option value={"Early Spring"}>Early Spring</option>
          <option value={"Late Spring"}>Late Spring</option>
          <option value={"Summer"}>Summer</option>
          <option value={"Fall"}>Fall</option>
        </select>
        <label>Min/Max Height</label>
        <input onChange={event=>this.handleChange(event.target.value,"minHeight")} value={minHeight}placeholder={"Min"}></input>
        <input onChange={event=>this.handleChange(event.target.value,"maxHeight")} value={maxHeight} placeholder={"Max"}></input>
        <label>Moisture</label>
        <select onChange={event=>this.handleChange(event.target.value,"minHeight")} value={moisture}>
          <option value={"Dry"}>Dry</option>
          <option value={"Dry, Mesic"}>Dry Mesic</option>
          <option value={"Mesic"}>Mesic</option>
          <option value={"Mesic, Wet"}>Mesic,</option>
          <option value={"Wet"}>Wet</option>
          <option value={"Wet, Emergent"}>Wet, Emergent</option>
          <option value={"Emergent"}>Emergent</option>
        </select>
        <PlantContainer
        addIDToMyPlants={this.props.addIDToMyPlants}
        myPlantsIDs={this.props.myPlantsIDs}
        plantList={plantList}
        />
      </div>
    );
  };
};