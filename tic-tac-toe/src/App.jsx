import "./App.css";
import { useState } from "react";
import Players from "./Components/players/Players";
import GameBoard from "./Components/Game-board/GamaBoard";
import Log from "./Components/Logs/Log";
import GameOver from "./Components/Game-Over/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  let winner = null;
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

  let gameBoard = [...initialGameBoard.map((array)=>[...array])];
  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

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
      winner = firstSquareSymbol;
    }
  }

  let draw = (gameTurns.length === 9 && !winner);

  function gameRestart() {
    setGameTurns([]);
  }
  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          ></Players>
          <Players
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
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
