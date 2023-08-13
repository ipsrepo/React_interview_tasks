import React, { useState, useCallback, useMemo } from 'react';
import './dynamicInput.css';
import deleteIcon from '../../icons/delete.svg';

const DynamicInput = () => {
    const [input, setInput] = useState([]);
    const [values, setValues] = useState([]);

    const updateInput = useCallback((e, id) => {
        const temp = input.map((item) =>
            item.id === id ? { ...item, value: e.target.value } : item
        );
        setInput(temp);
    }, [input]);

    const addInput = useCallback(() => {
        const newInput = {
            id: new Date(),
            value: '',
        };
        setInput((prevInput) => [...prevInput, newInput]);
        setValues([]);
    }, []);

    const delHandler = useCallback((id) => {
        setInput((prevInput) => prevInput.filter((item) => item.id !== id));
    }, []);

    const submitHandler = useCallback(
        (e) => {
            e.preventDefault();
            setValues(input.map((i) => i.value).filter((i) => !!i));
            setInput([]);
        },
        [input]
    );

    const inputElements = useMemo(() => {
        return input.map((inp, index) => (
            <div className='input-container' key={inp.id}>
                <label htmlFor={inp.id}>Skill {index + 1} </label>
                <input id={inp.id} onChange={(e) => updateInput(e, inp.id)} />
                <button className='del_btn' onClick={() => delHandler(inp.id)}>
                    <img src={deleteIcon} alt='delete icon' />
                </button>
            </div>
        ));
    }, [input, delHandler, updateInput]);

    const submittedValues = useMemo(() => {
        if (values.length > 0) {
            return values.map((val) => (
                <p className='form-input-value' key={val}>
                    {val}
                </p>
            ));
        }
        return null;
    }, [values]);

    return (
        <div className='container'>
            <div>
                <h2>Dynamic Skill input</h2>
                {inputElements}
                <button onClick={addInput}>Add</button>
                <button onClick={submitHandler}>Submit</button>
            </div>
            <div className='form-values'>
                <h4>Submitted values</h4>
                {submittedValues}
            </div>
        </div>
    );
};

export default React.memo(DynamicInput);
