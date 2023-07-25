import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';

export default function DisplayPlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.title}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card border="light" style={{ width: '18rem', margin: '10px', backgroundColor: '#6eaeee' }}>
      <Card.Img variant="top" src={playerObj.image} alt={playerObj.title} style={{ height: '300px' }} />
      <h2>{playerObj.first_name} {playerObj.last_name}</h2>
      <h5>{playerObj.position}</h5>
      <Button variant="danger" onClick={deleteThisPlayer} className="m-2">DELETE
      </Button>
      <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
        <Button className="m-2">EDIT</Button>
      </Link>
    </Card>
  );
}

DisplayPlayerCard.propTypes = {
  playerObj: ({
    first_name: PropTypes.string,
    image: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
