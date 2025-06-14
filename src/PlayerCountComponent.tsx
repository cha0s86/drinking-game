import React, { useState } from 'react';
import { Player } from './types';
import { v4 as uuidv4 } from 'uuid';

interface PlayerCountComponentProps {
  onPlayersReady: (players: Player[]) => void;
}

const PlayerCountComponent: React.FC<PlayerCountComponentProps> = ({ onPlayersReady }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerGender, setPlayerGender] = useState<'male' | 'female'>('male');

  const addPlayer = () => {
    if (playerName.trim()) {
      const newPlayer: Player = {
        id: uuidv4(),
        name: playerName,
        gender: playerGender,
        isAlive: true
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
    }
  };

  const startGame = () => {
    if (players.length >= 2) {
      onPlayersReady(players);
    } else {
      alert('At least 2 players are required to start the game');
    }
  };

  return (
    <div className="player-setup">
      <div className="game-container">
        <input 
          type="text" 
          value={playerName} 
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player Name"
        />
        <select 
          value={playerGender} 
          onChange={(e) => setPlayerGender(e.target.value as 'male' | 'female')}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button onClick={addPlayer}>Add Player</button>

        <div className="player-list">
          {players.map(player => (
            <div key={player.id} className={`player ${player.isAlive ? 'alive' : 'eliminated'}`}>
              {player.name} - {player.gender}
            </div>
          ))}
        </div>

        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default PlayerCountComponent;