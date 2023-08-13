import {useState} from 'react';
import './curd.css';

const UseNotification = () => {
    const [notification, setNotification] = useState('');

    const showNotification = (message) => {
        console.log(`showNotification: ${message}`);
        const ele= <p className='notification'>{message}</p>
        setNotification(ele)
        setTimeout(() => setNotification(''), 1000);
    }

    return {
        notification,
        showNotification
    }
}

export default UseNotification;
