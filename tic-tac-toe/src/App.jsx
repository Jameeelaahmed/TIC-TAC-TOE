import "./App.css";
import { useState } from "react";
import Players from "./Components/players/Players";
import GameBoard from "./Components/Game-board/GamaBoard";
import Log from "./Components/Logs/Log";
import GameOver from "./Components/Game-Over/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const INITIAL_GAME_BOARD= [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS={
  X:'Player 1',
  O:'Player 2',
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,players){
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriverGameBoard(gameTurns){
  
  let gameBoard = [...INITIAL_GAME_BOARD.map((array)=>[...array])];
  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  
  const [players,setPlayers]=useState(PLAYERS)

  function handlePlayerName(symbol,newName){
    setPlayers((prevPlayers)=>{
    return{
      ...prevPlayers,
      [symbol]:newName
    };
    })
  }

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  const gameBoard= deriverGameBoard(gameTurns);
  const winner=deriveWinner(gameBoard,players);

  let draw = (gameTurns.length === 9 && !winner);

  function gameRestart() {
    setGameTurns([]);
  }
  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChange={handlePlayerName}
          ></Players>
          <Players
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChange={handlePlayerName}
          ></Players>
        </ol>
        {(winner || draw) && (
          <GameOver 
          onRematch={gameRestart} 
          winner={winner}></GameOver>
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          // turns={gameTurns}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </>
  );
}

export default App;
