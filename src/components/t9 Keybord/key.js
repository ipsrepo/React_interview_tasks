import React, { useState } from "react";
import styles from "./key.module.css";

const Key = (props) => {
    const [key, setKey] = useState(0);

    let tmr;
    const keyPressHandler = () => {
        clearTimeout(tmr);
        props.onInput(props.content[key]);
        setKey((pre) => (pre + 1) % props.content.length);

        tmr = setTimeout(() => {
            setKey(0);
        }, 2000);
    };

    return (
        <li onClick={keyPressHandler} className={styles.item}>
            <span>
                <h5>{props.name}</h5>
            <p>{props.content.join("")}</p>
            </span>

        </li>
    );
};

export default React.memo(Key);
