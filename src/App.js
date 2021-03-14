import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import SearchBox from './Components/SearchBox';
import MyPlants from './Components/MyPlants';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      myPlantsList:[]
    };
  }

  addToMyPlants = (obj) => {
    if (this.state.myPlantsList.findIndex(plt=> plt.id===obj.id)===-1){
    axios.post('/api/lists',obj)
      .then((res) => {this.setState({myPlantsList:res.data})})
      .catch((err) => {toast.error(err)})
    } else {
      toast.warn(`You have already added ${obj.common_name} to your list, add project notes to indicate project quantities.`)};
  };

  retrieveMyPlantsList = (add,obj) => {
    axios.get('/api/lists/true/false')
    .then((res)=> {
      this.setState({
        myPlantsList:res.data
      }); 
      if (add) { console.log('passed') 
      this.addToMyPlants(obj)} ;
    })
    .catch((err)=> {toast.error(err)});
  };

  removeFromMyPlants = (id) => {
    axios.delete('/api/lists/'+id)
    .then((res)=> {
      this.setState({
        myPlantsList:res.data
      })
    })
    .catch((err)=> {toast.error(err)})
  }

  render() {
    const {myPlantsList} = this.state
    return (
      <body className="App">
        <ToastContainer/> 
        <Header/>
        <SearchBox 
        myPlantsList={myPlantsList}
        addToMyPlants={this.retrieveMyPlantsList}
        />

        <MyPlants  
        retrieveMyPlantsList={this.retrieveMyPlantsList} 
        removeFromMyPlants={this.removeFromMyPlants}
        myPlantsList={myPlantsList}/>
      </body>
    );
  }
}; 



