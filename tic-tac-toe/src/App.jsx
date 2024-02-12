import "./App.css";
import { useState } from "react";
import Players from "./Components/players/Players";
import GameBoard from "./Components/Game-board/GamaBoard";
import Log from "./Components/Logs/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevGame) => {
      let currentPlayer = "X";
      if (gameTurns.length > 0 && prevGame[0].player === "X") {
        currentPlayer = "O";
      }
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGame,
      ];
      return updateTurns;
    });
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
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </>
  );
}

export default App;
