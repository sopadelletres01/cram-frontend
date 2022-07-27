import React from 'react';
import Card from './Card';

function ListCard({ list }) {
  return (
    <div className="listCard">
      <br />
      {list.map(element => {
        return <Card element={element} />;
      })}
    </div>
  );
}

export default ListCard;
