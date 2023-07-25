import React, { useState } from 'react';
import DisplayPlayerCard from './PlayerCard';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPlayers = DisplayPlayerCard.playerObj.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input type="text" placeholder="Search Players..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="player-list">
        {filteredPlayers.map((player) => (
          <DisplayPlayerCard playerObj={player} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
