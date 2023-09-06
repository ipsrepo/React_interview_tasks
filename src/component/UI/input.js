import React from 'react';
import styles from './input.module.css'

const InputControl = ({label, type, name, state, options = [], onChange}) => {
    let element;

    switch (type) {
        case 'text':
        case 'number':
        case 'password':
        case 'email':
            element = <input
                type={type}
                name={name}
                id={name}
                value={state}
                onChange={onChange}
            />
            break;

        case 'select':
            element = <select name={name}
                              id={name}
                              value={state}
                              onChange={onChange}
            >
                <option value=''>----------Select the {name}----------</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            break;

        case 'radio':
            element = options.map((opt, index) =>
                (<div key={opt} className={styles.radioOption}>
                    <input
                        type={type}
                        name={name}
                        id={index}
                        onClick={onChange}
                        value={opt}/><label htmlFor={index}>{opt}</label>
                </div>)
            )
            break;

        default :
            break;

    }
    return (
        <div className={styles.formGroup}>
            <label htmlFor={name}>{label}</label>
            {element}
        </div>
    );

}
export default React.memo(InputControl);
