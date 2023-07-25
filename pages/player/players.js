import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import DisplayPlayerCard from '../../components/PlayerCard';
import { useAuth } from '../../utils/context/authContext';
import { getPlayers } from '../../api/playerData';

function PlayerHome() {
  // Sets a state for players
  const [players, setPlayers] = useState([]);

  // Get user ID be using useAuth hook
  const { user } = useAuth();

  // Function that makes API call to get all players
  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  // Function that makes the api call to get all players on component render (ERROR GOES AWAY WHEN REMOVING THIS BLOCK BUT NOTHING DISPLAYS)
  useEffect(() => {
    getAllThePlayers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/player/new" passHref>
        <Button>Add a Player</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <DisplayPlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>
    </div>
  );
}

export default PlayerHome;
