import React from 'react';
// plantList addToMyPlants
export default function PlantFigure (props) {
    let figs = null; 
    const {plantList, addToMyPlants} = props;

    figs = plantList.map((plt) => {
      return (
        <figure>
          <img width='150px' onClick={event=>addToMyPlants(plantList[event.target.accessKey])} accessKey={plt.id} key={plt.id} src={plt.src} />
          <figcaption key={plt.id+"com"}>Common Name: {plt.common_name}</figcaption>
          <figcaption key={plt.id+"bot"}>Botanical Name: {plt.botanical_name}</figcaption>
          <figcaption key={plt.id+"moist"}>Moisture Req: {plt.moisture}</figcaption>
          <figcaption key={plt.id+"sun"}>Sun Req: {plt.sun}</figcaption>
          <figcaption key={plt.id+"height"}>Height: {plt.height}in</figcaption>
          <figcaption key={plt.id+"bloomT"}>Bloom Time: {plt.bloom_time}</figcaption>
        </figure>
      )
    });
  return (
    <div>
      {figs}
    </div>
  );
};