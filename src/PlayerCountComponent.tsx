import React, { useState } from 'react';
import { Player } from './types';
import { v4 as uuidv4 } from 'uuid';

interface PlayerCountComponentProps {
  onPlayersReady: (players: Player[]) => void;
}

const PlayerCountComponent: React.FC<PlayerCountComponentProps> = ({ onPlayersReady }) => {
  // --- State for player list and form fields ---
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerGender, setPlayerGender] = useState<'male' | 'female'>('male');
  const [error, setError] = useState('');

  // --- Add a player to the list ---
  const addPlayer = () => {
    if (playerName.trim()) {
      const newPlayer: Player = {
        id: uuidv4(),
        name: playerName.trim(),
        gender: playerGender,
        isAlive: true,
        isBitch: false,
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
      setError('');
    }
  };

  // --- Remove a player from the list ---
  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  // --- Start the game if enough players ---
  const startGame = () => {
    if (players.length >= 2) {
      onPlayersReady(players);
    } else {
      setError('At least 2 players are required to start the game');
    }
  };

  return (
    <div className="entry-screen-bg">
      <div className="entry-card">
        <h2>Enter Players</h2>
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          placeholder="Player Name"
          onKeyDown={e => e.key === 'Enter' && addPlayer()}
        />
        <select
          value={playerGender}
          onChange={e => setPlayerGender(e.target.value as 'male' | 'female')}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button onClick={addPlayer} disabled={!playerName.trim()}>
          Add Player
        </button>

        {/* Player list */}
        <div className="player-list">
          {players.map(player => (
            <div key={player.id} className="player-item">
              <span>
                {player.name} <span style={{ opacity: 0.7 }}>({player.gender})</span>
              </span>
              <button
                onClick={() => removePlayer(player.id)}
                style={{ padding: '0.3em 0.8em' }}
                aria-label={`Remove ${player.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && <div style={{ color: '#ff4444', margin: '1em 0' }}>{error}</div>}

        <button
          onClick={startGame}
          style={{ marginTop: '1em' }}
          disabled={players.length < 2}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default PlayerCountComponent;
