import React, { Component } from 'react';
import PlantFigure from './PlantFigure';
import axios from 'axios';
import { toast, ToastContainer} from 'react-toastify';


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
      src:"",
      plantList:[],
      userAddedCount:0
    };
  };

  componentDidMount() {
    console.log("searchBox remounted")
    this.filterPlants();
  }

  addNewPlant = (userAddedCount, commonName, botanical_name, moisture,sun,minHeight,maxHeight,bloom_time,src) => {
    console.log('addNewPlant Fired')
    let newPlant = {
      id: userAddedCount+"userAdded", 
      common_name: commonName,
      botanical_name:botanical_name,
      moisture:moisture,
      sun:sun,
      height:(Number.parseInt(minHeight)+Number.parseInt(maxHeight))/2,
      bloom_time:bloom_time,
      src:src,
      project_notes: ""
    }
    this.setState({userAddedCount:this.state.userAddedCount+1});
    this.props.addToMyPlants(true, newPlant)
  }

  filterPlants = (botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture) => {
    console.log("filterPlants Fired")
    if (!botanicalName && !commonName && !sun && !bloomTime && !minHeight && !maxHeight && !moisture) {
      console.log('get full list')
      axios.get('/api/lists/false/true')
      .then((res)=> {this.setState({plantList:res.data})})
      .catch((err)=> {toast.error(err)})
    } else if (botanicalName ||commonName ||sun ||bloomTime ||minHeight ||maxHeight ||moisture) {
      console.log('queryList')
      let query = '/api/lists/false/true?'; 
      if (botanicalName) {
        query+="botName="+encodeURI(botanicalName);
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
        console.log('filterplants second')
        axios.get(query)
        .then((res)=> {
          this.setState({plantList:res.data})})
        .catch((err)=> {toast.error(err)})
    };
  };

  clearSearch = () => {
    console.log('clear Search fired')
    this.setState({
      botanicalName:"", 
      commonName:"",
      sun:"",
      bloomTime:"",
      minHeight:"",
      maxHeight:"",
      moisture:"",
      plantList:[]
      });
  }
    
  handleChange = (value, key) => {
    console.log("handleChange fired")
    this.setState({
      [key]: value
    })
  }


  render() {

    const {botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture, src, plantList, userAddedCount} = this.state

    return (
      <div>
        <ToastContainer/>
        <form>
          <label htmlFor='botNameInput'>Botanical Name</label>
          <input id='botNameInput' type='text' onChange={event=>this.handleChange(event.target.value,"botanicalName")} value={botanicalName} placeholder={"Botanical Name"}></input>
          <label htmlFor='comNameInput'>Common Name</label>
          <input id='comNameInput' type='text'onChange={event=>this.handleChange(event.target.value,"commonName")} value={commonName} placeholder={"Common Name"}></input>
          <label htmlFor='sunDropdown'>Sun</label>
          <select id='sunDropdown' onChange={event=>this.handleChange(event.target.value,"sun")} value={sun}>
            <option value={""}></option>
            <option value={"Full"}>Full</option>
            <option value={"Full, Partial"}>Full, Partial</option>
            <option value={"Partial"}>Partial</option>
            <option value={"Partial, Full Shade"}>Partial, Full Shade</option>
            <option value={"Full Shade"}>Full Shade</option>
            <option value={"Full, Partial, Full Shade"}>Full, Partial, Full Shade</option>
          </select>
          <label htmlFor='blmTmDropdown'>Bloom Time</label>
          <select id = 'blmTmDropdown' onChange={event=>this.handleChange(event.target.value,"bloomTime")} value={bloomTime}>
            <option value={""}></option>
            <option value={"Early Spring"}>Early Spring</option>
            <option value={"Late Spring"}>Late Spring</option>
            <option value={"Summer"}>Summer</option>
            <option value={"Fall"}>Fall</option>
          </select>
          <label htmlFor='minHt'>Height: Min</label>
          <input id='minHt'type='text' onChange={event=>{this.handleChange(event.target.value,"minHeight")}} value={minHeight} placeholder={"Min"}></input>
          <label htmlFor='maxHt'>Max</label>
          <input id='maxHt' type='text' onChange={event=>this.handleChange(event.target.value,"maxHeight")} value={maxHeight} placeholder={"Max"}></input>
          <label htmlFor='moistLvl'>Moisture</label>
          <select id ='moistLvl' onChange={event=>this.handleChange(event.target.value,"moisture")} value={moisture}>
            <option value={""}></option>
            <option value={"Dry"}>Dry</option>
            <option value={"Dry, Mesic"}>Dry Mesic</option>
            <option value={"Mesic"}>Mesic</option>
            <option value={"Mesic, Wet"}>Mesic,</option>
            <option value={"Wet"}>Wet</option>
            <option value={"Wet, Emergent"}>Wet, Emergent</option>
            <option value={"Emergent"}>Emergent</option>
          </select>
          <button onClick={event=>{
            event.preventDefault();
            this.filterPlants(botanicalName, commonName, sun, bloomTime, minHeight, maxHeight, moisture)}}>Search</button>
          <button onClick={this.clearSearch}>Clear Search</button>
          <label htmlFor='srcInput'>Custom Plant Picture URL</label>
          <input id='srcInput' type='text' onChange={event=>this.handleChange(event.target.value,"src")} value={src} placeholder={"(Optional)"}></input>
          <button onClick={(event) => {
            event.preventDefault();
            this.addNewPlant(userAddedCount, commonName, botanicalName, moisture,sun,minHeight,maxHeight,bloomTime,src)}}>Add Custom Plant</button>
        </form>
        <PlantFigure
        plantList={plantList}
        addToMyPlants={this.props.addToMyPlants}/>
      </div>
    );
  };
};