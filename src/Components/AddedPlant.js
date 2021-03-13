import React from 'react';

//Props = myPlantsList, removeFromMyPlants, toggleEdit, bloomTime

export default function AddedPlant (props) {
  const {myPlantsList, removeFromMyPlants, toggleEdit, bloomTime} = props

  let list
  
   list = myPlantsList.map(el=> {
    if (el.bloom_time===bloomTime) {
      return (
      <span>
      <li accessKey={el.id} onClick={ev=> removeFromMyPlants(ev.target.accessKey)}>Common Name:{el.common_name}, Botanical Name:{el.botanical_name}, Moisture:{el.moisture}, Sun:{el.sun}, Height:{el.height}, Bloom Time:{el.bloom_time}, Notes: {el.notes}</li>
      <button onClick={toggleEdit}>Add Notes</button>
      </span>
      )}
    })
  return (
    <ul>
      {list}
    </ul>
  );
}; 