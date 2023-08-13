import React, {useCallback, useMemo, useState} from 'react';
import './dynamicInput.css';
import deleteIcon from '../../icons/delete.svg';

const DynamicInput = () => {
    const [input, setInput] = useState([]);
    const [values, setValues] = useState([])

    const updateInput = useCallback((e, id) => {
        const temp = [...input];
        temp.forEach((item) => {
            if (item.id === id) {
                item.value = e.target.value;
            }
        });
        setInput(temp);
    }, [input]);

    const addInput = () => {
        const newInput = {
            id: new Date(), value: ""
        };
        setInput([...input, newInput]);
        setValues([])
    };

    const delHandler = useCallback((id) => {
        const temp = [...input];
        setInput(temp.filter((it) => it.id !== id));
    }, [input])

    const submitHandler = useCallback((e) => {
        e.preventDefault()
        setValues(input.map(i => i.value).filter(i => !!i));
        setInput([])
    }, [input]);

    const submittedValue = useMemo(() => values.length > 0 && values.map(val => <p className='form-input-value'
                                                                                   key={val}>{val}</p>), [values]);

    const inputElements = useMemo(() => input.map((inp, index) => {
        return (<div className='input-container' key={inp.id}>
            <label htmlFor={inp.id}>Skill {index + 1} </label>
            <input id={inp.id} onChange={(e) => updateInput(e, inp.id)}/>
            <button className='del_btn' onClick={() => delHandler(inp.id)}>
                <img src={deleteIcon} alt='delete icon'/>
            </button>
        </div>);
    }), [input, delHandler, updateInput])


    return (<div className='container'>
        <div>
            <h2>Dynamic Skill input</h2>
            {inputElements}

            <button onClick={addInput}>Add</button>
            <button onClick={submitHandler}>Submit</button>
        </div>

        <div className='form-values'>
            <h4>Submitted values</h4>
            {!!submittedValue && submittedValue}
        </div>
    </div>);
}
export default React.memo(DynamicInput);
