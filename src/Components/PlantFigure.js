// @ts-nocheck
import React from 'react';
// plantList addToMyPlants
export default function PlantFigure (props) {
    let figs = null; 
    const {plantList, addToMyPlants} = props;

    figs = plantList.map((plt) => {
      return (
        <figure key={'mainList'+plt.id}>
          <img width='150px' onClick={event=>addToMyPlants(true, plantList[event.target.id])} id={plt.id} src={plt.src} alt={`${plt.botanical_name}, commonly known as ${plt.common_name}.`}/>
          <figcaption>Common Name: {plt.common_name}</figcaption>
          <figcaption>Botanical Name: {plt.botanical_name}</figcaption>
          <figcaption>Moisture Req: {plt.moisture}</figcaption>
          <figcaption >Sun Req: {plt.sun}</figcaption>
          <figcaption>Height: {plt.height}in</figcaption>
          <figcaption>Bloom Time: {plt.bloom_time}</figcaption>
        </figure>
      )
    });
  return (
    <div>
      {figs}
    </div>
  );
};