import React, {useCallback, useMemo, useState} from 'react';
import useNotification from '../curdOperation/useNotification';
import styles from './localCurd.module.css'

const LocalCRUD = () => {

    const [tasks, setTask] = useState([]);
    // const taskRef = useRef('');
    const [taskmsg, setTaskmsg] = useState('')
    const {notification, showNotification} = useNotification()


    const addTaskHandler = (e) => {
        if(e.key === 'Enter'){
            if(!taskmsg) {
                showNotification('Fill the input');
                return;
            }
            const isExisting = tasks.find(tsk=> tsk.message === e.target.value);
            if(isExisting){
                showNotification('Task already exists');
                return;
            }
            const newTask = {
                id: tasks.length,
                message: e.target.value,
                isCompleted: false,
                updatedTime: Date.now()
            }

            setTask([...tasks, newTask])
            setTaskmsg('')
        }
    }

    const delHandler = useCallback((id) => {
        const item = [...tasks].filter(task=> task.id !== id);
        setTask(item)

        },
        [tasks],
    );

    const updateHandler = useCallback((task)=>{
        delHandler(task.id);
        setTaskmsg(task.message);

    }, [tasks])


    const toggleCompleted = useCallback((id) => {
        const item = tasks.map(t=>{
            if(t.id === id){
               return {
                   ...t,
                   isCompleted : !t.isCompleted
               }
            }
            return t;
        });

        setTask(item)
    }, [tasks])



    const taskElement = useMemo(()=> tasks.length > 0 && tasks.map(tak=>(
        <div key={tak.id} className={styles.container}>
            <p className={tak.isCompleted ? styles.completed: null} onClick={()=> toggleCompleted(tak.id)}>{tak.message}</p>
            {!tak.isCompleted && <button onClick={()=> updateHandler(tak)}>Update</button>}
            <button onClick={()=> delHandler(tak.id)}>Delete</button>
        </div>
    )), [tasks, toggleCompleted, delHandler,updateHandler])


    return (
        <>
            <p>Enter you task</p>
            <input value={taskmsg} onChange={e=> setTaskmsg(e.target.value)} type='text' onKeyDown={addTaskHandler}/>
            <br/>
            {taskElement}
            {notification}
        </>
    );

}
export default React.memo(LocalCRUD);
