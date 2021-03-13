import React, { Component } from 'react';
import PlantFigure from './PlantFigure';
import axios from 'axios';


//Props from app.js -myPlantsList addToMyPlants
export default class SearchBox extends Component {
  constructor (props) {
    super(props); 
    this.state = {
      botanicalName:"", 
      commonName:"",
      sun:"",
      bloomTime:"",
      minHeight:"",
      maxHeight:"",
      moisture:"",
      plantList:[],
      userAddedCount:0
    };
  };
  componentDidMount() {
    this.filterPlants();
  }
  
  addNewPlant = (userAddedCount, commonName, botanical_name, moisture,sun,minHeight,maxHeight,bloom_time) => {
    let newPlant = {
      id: userAddedCount+"userAdded", 
      common_name: commonName,
      botanical_name:botanical_name,
      moisture:moisture,
      sun:sun,
      height:(Number.parseInt(minHeight)+Number.parseInt(maxHeight))/2,
      bloom_time:bloom_time,
      project_notes: ""
    }
    this.setState({userAddedCount:this.state.userAddedCount+1});
    this.props.addToMyPlants(newPlant)
  }

  filterPlants = (botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture) => {
    if (!botanicalName && !commonName && !sun && !bloomTime && !minHeight && !maxHeight && !moisture) {
      axios.get('/api/lists/false/true')
      .then((res)=> {this.setState({plantList:res.data})})
      .catch((err)=> {window.alert(err)})
    } else if (botanicalName ||commonName ||sun ||bloomTime ||minHeight ||maxHeight ||moisture) {
      let query = '/api/lists/false/true?'; 
      if (botanicalName) {
        query+="botName="+botanicalName;
      }
      if (commonName) {
        if (botanicalName) {query+="&"};
        query+="comName="+encodeURI(commonName);
      }
      if (sun) {
        if (commonName) {query+="&"};
        query+="sun="+encodeURI(sun);
      }
      if (bloomTime) {
        if (sun) {query+="&"};
        query+="blmTime="+encodeURI(bloomTime);
      }
      if (minHeight) {
        if (bloomTime) {query+="&"};
        query+="minHeight="+encodeURI(minHeight);
      }
      if (maxHeight) {
        if (minHeight) {query+="&"};
        query+="maxHeight="+encodeURI(maxHeight);
      }
      if (moisture) {
        if (maxHeight) {query+="&"};
        query+="moisture="+encodeURI(moisture);
      }
        axios.get(query)
        .then((res)=> {
          this.setState({plantList:res.data})})
        .catch((err)=> {window.alert(err)})
    };
  };

  clearSearch = () => {
    this.setState({
      botanicalName:"", 
      commonName:"",
      sun:"",
      bloomTime:"",
      minHeight:"",
      maxHeight:"",
      moisture:"",
      plantList:[],
      userAddedCount:0
      });
  }
    
  handleChange = (value, key) => {
    const {botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture} = this.state
    this.setState({
      [key]: value
    })
  }


  render() {

    const {botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture, plantList, userAddedCount} = this.state

    return (
      <div>
        <label>Botanical Name</label>
        <input onChange={event=>this.handleChange(event.target.value,"botanicalName")} value={botanicalName} placeholder={"Botanical Name"}></input>
        <label>Common Name</label>
        <input onChange={event=>this.handleChange(event.target.value,"commonName")} value={commonName} placeholder={"Common Name"}></input>
        <label>Sun</label>
        <select onChange={event=>this.handleChange(event.target.value,"sun")} value={sun}>
          <option value={""}></option>
          <option value={"Full"}>Full</option>
          <option value={"Full, Partial"}>Full, Partial</option>
          <option value={"Partial"}>Partial</option>
          <option value={"Partial, Full Shade"}>Partial, Full Shade</option>
          <option value={"Full Shade"}>Full Shade</option>
          <option value={"Full, Partial, Full Shade"}>Full, Partial, Full Shade</option>
        </select>
        <label>Bloom Time</label>
        <select onChange={event=>this.handleChange(event.target.value,"bloomTime")} value={bloomTime}>
          <option value={""}></option>
          <option value={"Early Spring"}>Early Spring</option>
          <option value={"Late Spring"}>Late Spring</option>
          <option value={"Summer"}>Summer</option>
          <option value={"Fall"}>Fall</option>
        </select>
        <label>Min/Max Height</label>
        <input onChange={event=>this.handleChange(event.target.value,"minHeight")} value={minHeight} placeholder={"Min"}></input>
        <input onChange={event=>this.handleChange(event.target.value,"maxHeight")} value={maxHeight} placeholder={"Max"}></input>
        <label>Moisture</label>
        <select onChange={event=>this.handleChange(event.target.value,"moisture")} value={moisture}>
          <option value={""}></option>
          <option value={"Dry"}>Dry</option>
          <option value={"Dry, Mesic"}>Dry Mesic</option>
          <option value={"Mesic"}>Mesic</option>
          <option value={"Mesic, Wet"}>Mesic,</option>
          <option value={"Wet"}>Wet</option>
          <option value={"Wet, Emergent"}>Wet, Emergent</option>
          <option value={"Emergent"}>Emergent</option>
        </select>
        <button onClick={()=>this.filterPlants(botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture)}>Search</button>
        <button onClick={this.clearSearch}>Clear Search</button>
        <button onClick={(userAddedCount, commonName, botanicalName, moisture,sun,minHeight,maxHeight,bloomTime) => this.addNewPlant(userAddedCount, commonName, botanicalName, moisture,sun,minHeight,maxHeight,bloomTime)}>Add New Plant</button>
        
        <PlantFigure
        plantList={plantList}
        addToMyPlants={this.props.addToMyPlants}/>
      </div>
    );
  };
};