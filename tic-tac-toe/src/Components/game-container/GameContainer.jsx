import Players from "../players/Players";
import "./GameContainer.css";
import GameBoard from "../Game-board/GamaBoard";
import { useState } from "react";
export default function GameContainer() {

    const [activePlayer,setActivePlayer]=useState('X');
    function handleSelectSquare(){
        setActivePlayer((curActivePlayer)=> curActivePlayer=== 'X'?'O':'X');
    }

    return (
    <>
    <div id="game-container">
        <ol id="players" className="highlight-player">
            <Players initialName="Player 1" symbol="X" isActive={activePlayer==='X'}></Players>
            <Players initialName="Player 2" symbol="O" isActive={activePlayer==='O'}></Players>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}></GameBoard>
    </div>
    </>
    );
}
