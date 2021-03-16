// @ts-nocheck
import React from 'react';

//Props = myPlantsList removeFromMyPlants toggleEdit bloomTime editToggle notesInput handleChange

export default function AddedPlant (props) {
  const {myPlantsList, removeFromMyPlants, toggleEdit, bloomTime, editToggle, notesInput, handleChange} = props
  let list
  
   list = myPlantsList.map(el=> {
    if (el.bloom_time===bloomTime) {
      return (
      <li key={`myPlant${el.id}`}>
      <img className={el.id} onClick={ev=> removeFromMyPlants(ev.target.className,bloomTime)} alt={`${el.botanical_name}, commonly known as ${el.common_name}.`} src={el.src|| "./placeholderFlower.png"} width='50px'/>
      <span>Common Name:{el.common_name}, Botanical Name:{el.botanical_name}, Moisture:{el.moisture}, Sun:{el.sun}, Height:{el.height}, Bloom Time:{el.bloom_time} <button className={el.id} onClick={ev=>toggleEdit(ev.target.className)}>Add Notes</button>{el.project_notes ? (<span>Notes: </span>) : null}{editToggle.toggle && editToggle.id ===el.id.toString() ? (<textarea onChange={ev=> handleChange(ev.target.value)} value={notesInput}></textarea>) : el.project_notes} 
      </span>
      <br/>
      </li>
      )} else {return null}
    })
  return (
    <ul>
      {list}
    </ul>
  );
}; 