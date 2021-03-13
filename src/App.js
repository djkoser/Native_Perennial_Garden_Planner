import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import SearchBox from './Components/SearchBox';
import MyPlants from './Components/MyPlants';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      myPlantsList:[]
    };
  }

  retrieveMyPlantsList = () => {
    axios.get('/api/lists/true/false')
    .then((res)=> {
      this.setState({
        myPlantsList:res.data
      })
    })
    .catch((err)=> {window.alert(err)})
  }

  addToMyPlants = (obj) => {
    axios.post('/api/lists',obj)
      .then((res) => {this.setState({myPlantsList:res.data})})
      .catch((err) => {toast.error(err)})
  };

  removeFromMyPlants = (id) => {
    axios.delete('/api/lists/'+id)
    .then((res)=> {
      this.setState({
        myPlantsList:res.data
      })
    })
    .catch((err)=> {window.alert(err)})
  }

  render() {
    const {myPlantsList} = this.state
    return (
      <div className="App">
        <Header/>
        <SearchBox 
        myPlantsList={myPlantsList}
        addToMyPlants={this.addToMyPlants}
        />

        <MyPlants  
        retrieveMyPlantsList={this.retrieveMyPlantsList} 
        removeFromMyPlants={this.removeFromMyPlants}
        myPlantsList={myPlantsList}/>
      </div>
    );
  }
}; 



