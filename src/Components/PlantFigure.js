import React from 'react';
// plantList addToMyPlants
export default function PlantFigure (props) {
  
  const figs = props.plantList.map(el=> {
    return (
      <figure>
        <img/>
        <figcaption></figcaption>
    </figure>
    );
  });

  return (
    <div>
      {figs}
    </div>
  );
};