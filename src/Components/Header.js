import React from 'react';

export default function Header () {

  let printMyPlants = () => {
    window.print()
  }

  return (
    <header>
      <h1>Native Perennial Garden Planner</h1>
      <button id={"printButton"} onClick={()=> printMyPlants()}>Print</button>
    </header>
  );
};
