import React, {useState} from 'react';
import useNotification from './useNotification';


const AddData = ({operation = 'Add', data, onSuccess}) => {

    const initialState = {
        id: '',
        name: ''
    }
    const [formData, setFormData] = useState(operation === 'Add' ? initialState : data);

    const {notification, showNotification} = useNotification();
    const url =  operation === 'Add' ? `http://localhost:9000/add` : `http://localhost:9000/items/${data.id}`;
    const method = operation === 'Add' ? 'POST' : 'PUT';

    const addDataHandler = async () => {
        if (!formData.name || !formData.id) {
            showNotification('Please fill the form')
            return;
        }
        try {
            const res = await fetch(url, {
                method: method,
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (!res.ok) {
                throw new Error('Error on performing operation')
            }
            setFormData(initialState);
            showNotification('Success !!!')
            onSuccess();

        } catch (e) {
            console.log(e)
            showNotification('Error on performing operation')
        }

    }
    //
    // const handlerSave =useCallback( async (e) => {
    //     if(e.ctrlKey && e.key === 's'){
    //         await e.preventDefault();
    //         await addDataHandler();
    //
    //     }
    //
    // }, [])
    //
    // useEffect(()=>{
    //     document.addEventListener('keydown', handlerSave);
    //
    //     return ()=>{
    //         document.removeEventListener('keydown', handlerSave);
    //     }
    // },[])


    return (
        <div className='add-data'>
            <div className='input-container'>
                <label htmlFor='id'>ID</label>
                <input type='text' id='id' value={formData.id}
                       onChange={(e) => setFormData({...formData, id: e.target.value})}/>
            </div>
            <div className='input-container'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}/>
            </div>
            <button onClick={addDataHandler}
                    disabled={!formData.name && !formData.id}
            >{operation} Data
            </button>
            {notification}
        </div>
    );

}
export default React.memo(AddData);
