import React from 'react';
import CurdOperation from './curdOperation';
import './curd.css'

const CURD = () => {
    return (
        <div>
            <h2>CURD Operation</h2>
            <div className='container'>
                <CurdOperation/>
            </div>
        </div>
    );

}
export default React.memo(CURD);
