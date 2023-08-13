import React, {useCallback, useEffect, useMemo, useState} from 'react';

import deleteIcon from '../../icons/delete.svg';
import editIcon from '../../icons/edit.svg'
import useNotification from './useNotification';
import AddData from './addData';

const CurdOperation = () => {

    const [data, setData] = useState([])
    const [updateData, setUpdateData] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [isDataModification, setIsDataModification] = useState(false)
    const [error, setError] = useState(null);
    const {showNotification} = useNotification();
    const [operation, setOperation] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:9000/items');
            if (!res.ok) {
                throw new Error('Error on fetching')
            }
            setData(await res.json())
            setError(null)
        } catch (e) {
            setData([])
            showNotification('Error on fetching')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchData();


    }, [])


    const delHandler = useCallback(async (id) => {
        console.log(id)
        try {
            const res = await fetch(`http://localhost:9000/items/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                throw new Error('')
            }
            await fetchData()
        } catch (e) {
            showNotification('Error on deleting')
        }

    }, [])

    const updateHandler = (data) => {
        setOperation('Update')
        setUpdateData(data);
        setIsDataModification(true);
    }

    const handleDataSuccess = async () => {
        setUpdateData(null)
        setIsDataModification(false);
        await fetchData();
    }

    const listElements = useMemo(() => data.length > 0 && data.map(d => (<tr key={d.id}>
        <td>{d.id}</td>
        <td>{d.name}</td>
        <td><img className='del_btn'
                 onClick={() => delHandler(d.id)}
                 src={deleteIcon}
                 alt='delete icon'/></td>
        <td><img className='del_btn'
                 onClick={() => updateHandler(d)}
                 src={editIcon}
                 alt='delete icon'/></td>
    </tr>)), [data, delHandler])


    return (
        <div>
            <h3>Table Data </h3>

            {isDataModification ?
                <AddData operation={operation} data={updateData} onSuccess={handleDataSuccess}/> :
                <button onClick={() => {
                    setIsDataModification(true);
                    setOperation('Add')
                }}>Add Data</button>
            }

            {isLoading ? <p>Loading...</p> :
                !!error ? <p>{error}</p> :
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th colSpan='2'>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!!listElements ? listElements : <tr>
                            <td colSpan='4'>No Data</td>
                        </tr>}
                        </tbody>
                    </table>
            }


        </div>
    );

}
export default React.memo(CurdOperation);
