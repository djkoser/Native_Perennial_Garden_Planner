import React from 'react';
// plantList addToMyPlants
export default function PlantFigure (props) {
  
  const figs = props.plantList.map(el=> {
    const {plantList, addToMyPlants} = props;

    plantList.map(plt=>{
      return (
        <figure>
          <img onClick={event=>{addToMyPlants(event.target.attributes.key.value)}} key={plt.id} src={plt.src} />
          <figcaption>Common Name: {plt.common_name}</figcaption>
          <figcaption>Botanical Name: {plt.botanical_name}</figcaption>
          <figcaption>Moisture Req: {plt.moisture}</figcaption>
          <figcaption>Sun Req: {plt.sun}</figcaption>
          <figcaption>Height: {plt.height}in</figcaption>
          <figcaption>Bloom Time: {plt.bloom_time}</figcaption>
        </figure>
      )
    })
  });

  return (
    <div>
      {figs}
    </div>
  );
};