import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Promotions() {
  const { user } = useContext();
  console.log(user);

  return <div>Promotions</div>;
}
