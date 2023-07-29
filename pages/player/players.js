import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlayers } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';
import DisplayPlayerCard from '../../components/PlayerCard';
import SearchBar from '../../components/Search';

function PlayerHome() {
  // Sets a state for players
  const [players, setPlayers] = useState([]);

  // Get user ID by using useAuth hook
  const { user } = useAuth();

  // Function that makes API call to get all players
  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  // Function that makes the api call to get all players on component render
  useEffect(() => {
    getAllThePlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterResult = (query) => {
    if (query === '') {
      getAllThePlayers();
    } else {
      const filter = players.filter((player) => player.first_name.toLowerCase().includes(query) || player.last_name.toLowerCase().includes(query));
      setPlayers(filter);
    }
    console.warn(query);
  };

  return (
    <div className="text-center my-4">
      <SearchBar onKeyUp={(query) => filterResult(query)} />
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
