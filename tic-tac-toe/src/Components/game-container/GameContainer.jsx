import Players from "../players/Players";
import "./GameContainer.css";
export default function GameContainer() {
    return (
    <>
    <div id="game-container">
        <ol id="players">
            <Players initialName="Player 1" symbol="X"></Players>
            <Players initialName="Player 2" symbol="O"></Players>
        </ol>
    </div>
    </>
    );
}
