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
      myPlantsList:[],
      numESpring:0,
      numLSpring:0,
      numSummer:0,
      numFall: 0 
    };
  }

  addToMyPlants = (obj) => {
    if (this.state.myPlantsList.findIndex(plt=> plt.id===obj.id)===-1 && obj.bloom_time){
    axios.post('/api/lists',obj)
      .then((res) => {this.setState({myPlantsList:res.data})})
      .catch((err) => {toast.error(err)})
    } else if ((this.state.myPlantsList.findIndex(plt=> plt.id===obj.id)> -1)){
      toast.warn(`You have already added ${obj.common_name} to your list, add project notes to indicate project quantities.`)
    } else(toast.warn('Please specify at least bloom time when adding a new plant.'))
  };

  retrieveMyPlantsList = (add, obj) => {
    axios.get('/api/lists/true/false')
      .then((res) => {
        this.setState({
          myPlantsList: res.data
        });
        if (add) {
          this.addToMyPlants(obj);
          let {
            numESpring,
            numLSpring,
            numSummer,
            numFall
          } = this.state;
          switch (obj.bloom_time) {
            case 'Early Spring':
              this.setState({
                numESpring: numESpring+=1,
              });
              break;
            case 'Late Spring':
              this.setState({
                numLSpring: numLSpring+=1,
              });
              console.log(this.state.numLSpring)
              break;
            case 'Summer':
              this.setState({
                numSummer: numSummer+=1,
              });
              break;
            case 'Fall':
              this.setState({
                numFall: numFall+=1,
              });
              break;
            default: 
              console.log("No Case Satisfied, Check Data")
          }
        }
      }).catch((err) => {
        toast.error(err)
      });
  };

  removeFromMyPlants = (id, bloom_time) => {
    axios.delete('/api/lists/'+id)
    .then((res)=> {
      this.setState({
        myPlantsList:res.data
      })
    })
    .catch((err)=> {toast.error(err)})
    let {numESpring, numLSpring, numSummer, numFall} = this.state; 
    switch (bloom_time) {
      case 'Early Spring':
        this.setState({
          numESpring:numESpring-=1,
        });
        break;
      case 'Late Spring':
        this.setState({
          numLSpring:numLSpring-=1,
        });
          break;
      case 'Summer':
        this.setState({
          numSummer:numSummer-=1,
        });
        break;
      case 'Fall':
        this.setState({
          numFall:numFall-=1,
        });
        break;
      default:
        console.log('No Case Satisfied, Check Data')
    }
  }

  render() {
    const {myPlantsList, numESpring, numLSpring, numSummer,numFall} = this.state
    return (
      <div className="App">
        <ToastContainer/> 
        <Header/>
      <main>
        <SearchBox 
        myPlantsList={myPlantsList}
        addToMyPlants={this.retrieveMyPlantsList}
        />
        <MyPlants  
        retrieveMyPlantsList={this.retrieveMyPlantsList} 
        removeFromMyPlants={this.removeFromMyPlants}
        myPlantsList={myPlantsList}
        numESpring={numESpring}
        numLSpring={numLSpring}
        numSummer={numSummer}
        numFall={numFall}
        />
      </main>
      </div>
    );
  }
}; 



