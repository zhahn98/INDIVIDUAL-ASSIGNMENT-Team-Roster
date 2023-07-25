import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSinglePlayer } from '../api/playerData';

function DisplayPlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.title}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <h1>{playerObj.first_name}</h1>
      <h2>{playerObj.last_name}</h2>
      <p>{playerObj.position}</p>
      <Button variant="danger" onClick={deleteThisPlayer} className="m-2">DELETE
      </Button>
      <br />
      <Button variant="info" className="m-2">EDIT</Button>
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
