import React, { useState } from "react";
import Key from "./key";
import styles from "./key.module.css";

const T9Keyboard = () => {
    const keys = [
        {
            name: 1,
            content: ["."]
        },
        {
            name: 2,
            content: ["a", "b", "c"]
        },
        {
            name: 3,
            content: ["d", "e", "f"]
        },
        {
            name: 4,
            content: ["g", "h", "i"]
        },
        {
            name: 5,
            content: ["j", "k", "l"]
        },
        {
            name: 6,
            content: ["m", "n", "o"]
        },
        {
            name: 7,
            content: ["p", "q", "r", "s"]
        },
        {
            name: 8,
            content: ["t", "u", "v", "w"]
        },
        {
            name: 9,
            content: ["x", "y", "z"]
        }
    ];
    const [message, setMessage] = useState("");
    const [lastKey, setLastKey] = useState({ key: "", timestamp: 0 });

    const InputHandler = (key) => {
        const currentTime = Date.now();

        const timeDiff = currentTime - lastKey.timestamp;

        if (timeDiff <= 800) {
            setMessage((prevMessage) => prevMessage.slice(0, -1) + key);
        } else {
            setMessage((prevMessage) => prevMessage + key);
        }

        setLastKey({ key, timestamp: currentTime });
    };
    return (
        <>
            <input type="text" value={message} disabled />
            <button onClick={() => setMessage((pre) => pre.slice(0, -1))}>
                delete
            </button>
            <ul className={styles.container}>
                {keys.map((key, index) => (
                    <Key
                        key={key.name}
                        name={key.name}
                        content={key.content}
                        onInput={InputHandler}
                    />
                ))}
            </ul>
        </>
    );
};
export default React.memo(T9Keyboard);
