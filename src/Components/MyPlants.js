import React, { Component } from 'react';
import AddedPlant from './AddedPlant';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';

//Props from App.js - retrieveMyPlantsList removeFromMyPlants myPlantsList, numESpring, numLSpring, numSummer,numFall
export default class MyPlants extends Component {
  constructor (props) {
    super(props);
    this.state = {
      notesInput:"",
      editToggle:{
        toggle:false,
        id:0
      }
    };
  }

  componentDidMount() {
    this.props.retrieveMyPlantsList()
  }

  toggleEdit = (id) => {
    if (this.state.editToggle.toggle===false) {
      let existingPlantInfo = this.props.myPlantsList.filter(plt=> plt.id===Number.parseInt(id) ? true : false)
      this.setState({
        editToggle:{
          toggle:true,
          id:id,
          notesInput: existingPlantInfo.project_notes
        }
      })
    } 
    if (this.state.editToggle.toggle===true) {
      let body = {"notesInput":this.state.notesInput}
      axios.put(`/api/lists/${id}`, body)
      .then(()=> this.props.retrieveMyPlantsList())
      .catch(err=>toast.error(err));
      this.setState({
        notesInput:"",
        editToggle:{
          toggle:false,
          id:0
        }
      });
    };
  };

  handleChange = (value) => {
    this.setState({
      notesInput:value
    })
  }

  render() {

    const {removeFromMyPlants, myPlantsList, numESpring, numLSpring, numSummer,numFall} = this.props;
    const {notesInput,editToggle} = this.state;

    return (
      <aside>
        <ToastContainer/>
        <section>Early Spring-<strong>{numESpring}</strong> in List
          <AddedPlant 
          myPlantsList={myPlantsList}
          removeFromMyPlants={removeFromMyPlants}
          toggleEdit={this.toggleEdit}
          bloomTime={'Early Spring'}
          editToggle={editToggle}
          notesInput={notesInput}
          handleChange={this.handleChange}/>
          
        </section>
        <section>Late Spring-<strong>{numLSpring}</strong> in List
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Late Spring'}
            editToggle={this.state.editToggle}
            notesInput={notesInput}
            handleChange={this.handleChange}/>
        </section>
        <section>Summer-<strong>{numSummer}</strong> in List
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Summer'}
            editToggle={this.state.editToggle}
            notesInput={notesInput}
            handleChange={this.handleChange}/>
        </section>
        <section>Fall-<strong>{numFall}</strong> in List
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Fall'}
            editToggle={this.state.editToggle}
            notesInput={notesInput}
            handleChange={this.handleChange}/>
        </section>
      </aside>
    );
  };
} 