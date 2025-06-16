import React, { useState } from 'react';
import PlayerCountComponent from './PlayerCountComponent';
import { Player, GameState } from './types';
import { TASKS } from './tasks';
import './App.css';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    round: 0
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [bitchKing, setBitchKing] = useState<Player | null>(null);

  const initializePlayers = (players: Player[]) => {
    // Pick the first alive, non-bitch player as the starter
    const firstPlayer = players.find(player => player.isAlive !== false && !player.isBitch) || players[0];
    const firstTask = selectTask();
    setGameState({
      players: players.map(player => ({ ...player })),
      round: 1,
      currentPlayer: firstPlayer,
      currentTask: firstTask
    });
    setGameStarted(true);
  };

  const selectTask = () => {
    // Include all tasks, including jail
    return TASKS[Math.floor(Math.random() * TASKS.length)];
  };

  const getNextPlayer = (players: Player[], currentPlayer: Player) => {
    // Always refresh the alive, non-bitch list
    const alivePlayers = players.filter(p => p.isAlive && !p.isBitch);
    if (alivePlayers.length === 0) return null;
    const currentIdx = alivePlayers.findIndex(p => p.id === currentPlayer.id);
    // If only one player left, return them
    if (alivePlayers.length === 1) return alivePlayers[0];
    return alivePlayers[(currentIdx + 1) % alivePlayers.length];
  };

  const handleTaskCompletion = () => {
    if (!gameState.currentPlayer) return;

    // No need to update isAlive on completion, only on jail/fail
    const updatedPlayers = [...gameState.players];

    // Find next player
    const nextPlayer = getNextPlayer(updatedPlayers, gameState.currentPlayer);
    const nextTask = selectTask();

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
      round: prev.round + 1,
      currentPlayer: nextPlayer ?? undefined,
      currentTask: nextTask
    }));
  };

  const handleJailPlayer = (player: Player) => {
    // Allow jailing anyone who is alive, including bitch and bitch king
    const updatedPlayers = gameState.players.map(p =>
      p.id === player.id ? { ...p, isAlive: false } : p
    );

    // If the jailed player was the bitch king, clear bitchKing
    let newBitchKing = bitchKing;
    if (bitchKing && bitchKing.id === player.id) {
      newBitchKing = null;
    }

    setGameState(prev => ({
      ...prev,
      players: updatedPlayers
    }));
    setBitchKing(newBitchKing);
  };

  const handleRestart = () => {
    setGameState({
      players: [],
      round: 0,
      currentPlayer: undefined,
      currentTask: undefined,
    });
    setGameStarted(false);
  };

  // When the bitch rule comes up, show a button to assign a bitch
  const handleMakeBitch = (bitchId: string) => {
    // Remove previous bitch
    const updatedPlayers = gameState.players.map(p =>
      p.id === bitchId
        ? { ...p, isBitch: true }
        : { ...p, isBitch: false }
    );
    setGameState(prev => ({
      ...prev,
      players: updatedPlayers,
    }));
    setBitchKing(gameState.currentPlayer || null);
  };

  const alivePlayers = gameState.players.filter(player => player.isAlive);

  if (gameStarted && alivePlayers.length === 1) {
    return (
      <div className="app-container">
        <h1>Drinking Game</h1>
        <h2>Winner!</h2>
        <div className="winner-player">
          {alivePlayers[0].name} - {alivePlayers[0].gender}
        </div>
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    );
  }

  if (!gameStarted) {
    return <PlayerCountComponent onPlayersReady={initializePlayers} />;
  }

  return (
    <div className="app-container">
      <h1>Drinking Game</h1>
        
      {gameState.currentTask && gameState.currentPlayer && (
        <div>
          <h2>Round {gameState.round}</h2>
          <p>Current Player: {gameState.currentPlayer.name}</p>
          <p>Task: {gameState.currentTask.description}</p>
            
          <div>
            <button onClick={handleTaskCompletion}>Completed</button>
          </div>
            
          <div className="player-list">
            {gameState.players
              .filter(player => player.isAlive)
              .map(player => (
                <div key={player.id} className="player-item">
                  {player.name} - {player.gender}
                  <button
                    onClick={() => handleJailPlayer(player)}
                    disabled={gameState.currentTask?.id !== 10}
                  >
                    Jail
                  </button>
                  {/* Show Make Bitch button only when task id is 6 and only if this player is not already the bitch */}
                  {gameState.currentTask?.id === 6 && !player.isBitch && (
                    <button
                      style={{ marginLeft: 8 }}
                      onClick={() => handleMakeBitch(player.id)}
                      disabled={gameState.players.some(p => p.isBitch)}
                    >
                      Make Bitch
                    </button>
                  )}
                </div>
              ))}
          </div>

          <div className="bitch-list">
            <h3>Bitch List</h3>
            {gameState.players.some(p => p.isBitch && p.isAlive) ? (
              <div>
                {bitchKing && (
                  <div>
                    <strong>Bitch King:</strong> {bitchKing.name}
                  </div>
                )}
                <div>
                  <strong>Bitch:</strong>{" "}
                  {gameState.players.find(p => p.isBitch && p.isAlive)?.name}
                </div>

              </div>
            ) : (
              <div>No bitches selected</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
