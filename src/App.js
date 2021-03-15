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
      numFall:0,
    };
  }

  listCounter = (arr,countString) => {
    return arr.reduce((acc,plt) =>plt.bloom_time===countString ? acc+=1 : acc, 0)
  };


  addToMyPlants = (obj) => {
    if (this.state.myPlantsList.findIndex(plt => plt.id === obj.id) === -1 && obj.bloom_time) {
      axios.post('/api/lists', obj)
        .then((res) => {
          this.setState({
            myPlantsList: res.data
          })
          let {
            myPlantsList,
          } = this.state;
          switch (obj.bloom_time) {
            case 'Early Spring':
              axios.put('/api/numESpring', {
                  "count": this.listCounter(myPlantsList,"Early Spring")
                })
                .then(res => this.setState({
                  numESpring: res.data
                }))
                .catch(err => toast.error(err));
              break;
            case 'Late Spring':
              axios.put('/api/numLSpring', {
                  "count": this.listCounter(myPlantsList,"Late Spring")
                })
                .then(res => this.setState({
                  numLSpring: res.data
                }))
                .catch(err => toast.error(err));
              break;
            case 'Summer':
              axios.put('/api/numSummer', {
                  "count": this.listCounter(myPlantsList,"Summer")
                })
                .then(res => this.setState({
                  numSummer: res.data
                }))
                .catch(err => toast.error(err));
              break;
            case 'Fall':
              axios.put('/api/numFall', {
                  "count": this.listCounter(myPlantsList,"Fall")
                })
                .then(res => this.setState({
                  numFall: res.data
                }))
                .catch(err => toast.error(err));
              break;
            default:
              console.log("No Case Satisfied, Check Data")
              break;
          }
        }).catch((err) => {
          toast.error(err)
        })
    } else if ((this.state.myPlantsList.findIndex(plt => plt.id === obj.id) > -1)) {
      toast.warn(`You have already added ${obj.common_name} to your list, add project notes to indicate project quantities.`)
    } else(toast.warn('Please specify at least bloom time when adding a new plant.'))
  };

  retrieveMyPlantsList = (add, obj) => {
    axios.get('/api/lists/true/false/false')
      .then((res) => {
        this.setState({
          myPlantsList: res.data
        });
        if (add) {
          this.addToMyPlants(obj);
        };
      }).catch((err) => {
        toast.error(err)
      });
  };

  setParentMyPlantsList = (arr) => {
    this.setState({
      myPlantsList:arr
    })
  }

  removeFromMyPlants = (id, bloom_time) => {
    axios.delete(`/api/lists/${id}`)
      .then((res) => {
        this.setState({
          myPlantsList: res.data
        })
        let {
          myPlantsList,
        } = this.state;
        switch (bloom_time) {
          case 'Early Spring':
            axios.put('/api/numESpring', {
                "count": this.listCounter(myPlantsList,"Early Spring")
              })
              .then(res => this.setState({
                numESpring: res.data
              }))
              .catch(err => toast.error(err));
            break;
          case 'Late Spring':
            axios.put('/api/numLSpring', {
                "count": this.listCounter(myPlantsList,"Late Spring")
              })
              .then(res => this.setState({
                numLSpring: res.data
              }))
              .catch(err => toast.error(err));
            break;
          case 'Summer':
            axios.put('/api/numSummer', {
                "count": this.listCounter(myPlantsList,"Summer")
              })
              .then(res => this.setState({
                numSummer: res.data
              }))
              .catch(err => toast.error(err));
            break;
          case 'Fall':
            axios.put('/api/numFall', {
                "count": this.listCounter(myPlantsList,"Fall")
              })
              .then(res => this.setState({
                numFall: res.data
              }))
              .catch(err => toast.error(err));
            break;
          default:
            console.log("No Case Satisfied, Check Data")
            break;
        }
      }).catch((err) => {
        toast.error(err)
      })
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
        setParentMyPlantsList={this.setParentMyPlantsList}
        />
      </main>
      </div>
    );
  }
}; 



