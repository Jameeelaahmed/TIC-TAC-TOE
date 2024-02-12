import InputSpan from "../input-span";
import "./Players.css";
import { useState } from "react";

export default function Players({ initialName, symbol ,isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName]= useState(initialName);
    function handleClickEdit() {
        setIsEditing((editing)=> !editing);
    }

    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value)
    }

    //* max's code 
    {/* 
    let playerName= <span className="player-name">{pName}</span>
    if (isEditing) {
        playerName= <input className="player-name" type="text value={pName}"></input>
    }
    and put this {player-Name} inside span.player and remove the InputSpan custom component and main InputSpan component that i have done
    ==> and for updating the edit ot save 
    <button onClick={handleClickEdit}>{isEditing? 'Save' : 'Edit}</button>
    */}
    let data = "Edit";
    let wrapperType = "span";
    if (isEditing) {
        data = "Save";
        wrapperType = "input";
    }


    return (
    <li className={isActive? 'active':undefined}>
        <span className="player">
            <InputSpan 
            classs="player-name" 
            wrapper={wrapperType}
            onEdit={handleChange}>
                {playerName} 
            </InputSpan>
            <span 
            className="player-symbol">
                {symbol}</span>
        </span>
        <button onClick={handleClickEdit}>{data}</button>
    </li>
    );
}
