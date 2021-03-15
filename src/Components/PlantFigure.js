// @ts-nocheck
import React from 'react';
// plantList addToMyPlants
export default function PlantFigure (props) {
    let figs = null; 
    const {plantList, addToMyPlants} = props;

    figs = plantList.map((plt) => {
      return (
        <figure key={`mainList${plt.id}`}>
          <img className={"figs"} width='150px' onClick={()=>addToMyPlants(true, plt)} id={plt.id} src={plt.src} alt={`${plt.botanical_name}, commonly known as ${plt.common_name}.`}/>
          <figcaption><strong>Common Name:</strong> 
          <br/>
          {plt.common_name}</figcaption>
          <figcaption><strong>Botanical Name: </strong> 
          <br/>
          {plt.botanical_name}
          </figcaption>
          <figcaption><strong>Moisture Req: </strong> 
          {plt.moisture}
          </figcaption>
          <figcaption><strong>Sun: </strong>
          {plt.sun}
          </figcaption>
          <figcaption><strong>Height: </strong>
          {plt.height}in
          </figcaption>
          <figcaption><strong>Bloom Time: </strong>{plt.bloom_time}
          </figcaption>
        </figure>
      )
    });
  return (
    <div className ='figureBox'>
      {figs}
    </div>
  );
};