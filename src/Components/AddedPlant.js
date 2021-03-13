import React from 'react';

//Props = myPlantsList, removeFromMyPlants, toggleEdit, bloomTime

export default function AddedPlant (props) {
  const {myPlantsList, removeFromMyPlants, toggleEdit, bloomTime} = props

  let list
  
   list = myPlantsList.map(el=> {
    if (el.bloom_time===bloomTime) {
      return (
      <li key={'myPlant'+el.id}>
      <img id={el.id} onClick={ev=> removeFromMyPlants(ev.target.id)} alt={`${el.botanical_name}, commonly known as ${el.common_name}.`} src={el.src} width='80px'/>
      <span id={el.id} onClick={ev=> removeFromMyPlants(ev.target.id)}>Common Name:{el.common_name}, Botanical Name:{el.botanical_name}, Moisture:{el.moisture}, Sun:{el.sun}, Height:{el.height}, Bloom Time:{el.bloom_time}, Notes: {el.notes}</span>
      <button onClick={toggleEdit}>Add Notes</button>
      </li>
      )} else {return null}
    })
  return (
    <ul>
      {list}
    </ul>
  );
}; 