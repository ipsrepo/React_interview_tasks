import React, {useEffect, useState} from "react";
import styles from "./paper.module.css";

const options = ["rock", "paper", "scissors", "lizard", "spock"];
const winningCombos = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"]
};

const RandItem = () => {
    const randNum = Math.floor(Math.random() * options.length);
    return options[randNum];
};

const PaperGame = () => {
    const [wins, setWins] = useState({
        user: 0,
        system: 0
    });
    const [userChoice, setUserChoice] = useState();
    const [systemChoice, setSystemChoice] = useState();
    const [win, setWin] = useState();
    const [tie, setTie] = useState(false);


    const selectHandler = (option) => {
        setUserChoice(option);
        setSystemChoice(RandItem())
        option === systemChoice ? setTie(true) : winningCombos[option].includes(systemChoice)
            ? setWin('user')
            : setWin('computer');
    };

    useEffect(() => {
        setTie(false)
        if (win) {
            win === 'user' ? setWins({...wins, user: wins.user + 1}) : setWins({...wins, system: wins.system + 1});
        }
    }, [win]);


    return (
        <>
            <div className={styles.item}>
                {options.map((option, index) => (
                    <p key={option} onClick={() => selectHandler(option)}>
                        {option}
                    </p>
                ))}
            </div>

            <h2>
                <h3>user Choice : {userChoice}</h3>
                <h3>Computer Choice : {systemChoice}</h3>
                <h3>{tie ? <span>its Tie</span> : <span>{win} wins!</span>}</h3>
                user wins : {wins.user} - Computer wins : {wins.system}
            </h2>
        </>
    );
};
export default React.memo(PaperGame);
