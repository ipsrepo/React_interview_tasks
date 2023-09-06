import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser, toggleShowing, toggleUpdating} from '../redux/userSlice';

const ViewUser = () => {
    const {users} = useSelector(state => state.user);
    const dispatcher = useDispatch();

    let bodyElement;

    const updateHandler = (usr) => {
        dispatcher(toggleUpdating({
            flag : true,
            data : usr
        }));
    }

    if(users.length === 0 ){
        bodyElement = <tr><td colSpan='7'>No Data</td></tr>
    } else {
        bodyElement = users.map(usr=>(
            <tr key={usr.id}>
                <td>{usr.firstname}</td>
                <td>{usr.lastname}</td>
                <td>{usr.username}</td>
                <td>{usr.email}</td>
                <td>{usr.gender}</td>
                <td>
                    <span>{usr.address1}, {usr.address2}</span>
                    <span>{usr.city}, {usr.state}</span>
                    <span>{usr.zipcode}</span>
                </td>
                <td>
                    <button onClick={()=> updateHandler(usr)}>Update</button>
                    <button className='del_btn' onClick={()=> dispatcher(deleteUser(usr.id))}>Delete</button>
                </td>
            </tr>
        ))
    }


    return (
        <section>
            <h3>User Data</h3>
            <button style={{float: 'right'}} onClick={()=> dispatcher(toggleShowing(true))}>ADD USER</button>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                {bodyElement}
            </table>
        </section>
    );

}
export default React.memo(ViewUser);
