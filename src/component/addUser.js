import React, {useEffect, useState} from 'react';
import InputControl from './UI/input';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, toggleShowing, toggleUpdating, updateUser} from '../redux/userSlice';

const genderOption = ['Male', 'Female'];
const cityOption = ['Chennai', 'Bangalore', 'Coimbatore'];
const stateOption = ['TamilNadu', 'Karnataka', 'Kerala'];

const initValue = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    repassword: '',
    gender: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: ''
}

const AddUser = ({data}) => {
    const [formData, setFormData] = useState(initValue);
    const {isUpdating, updateData } = useSelector(state => state.user);
    const dispatcher = useDispatch();

    useEffect(() => {
        console.log(formData);

        if (!!updateData && updateData.length !== 0) {
            setFormData(updateData);
        }
    }, [isUpdating]);


    const onChangeHandler = (e) => {
        setFormData(prevState => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    }

    const submitHandler = () => {
        if (!isUpdating) {
            dispatcher(addUser(formData));
        } else {
            const payload = {
                id: updateData.id,
                user: formData
            }
            dispatcher(updateUser(payload));
        }
        setFormData(initValue);
        dispatcher(toggleShowing(false));
    }

    const cancelHandler = () => {
        dispatcher(toggleUpdating({flag :false}))
        setFormData(initValue);
    }

    return (
        <div className='addUser'>
                <h3>{isUpdating? 'UPDATE' : 'ADD'} USER</h3>
                <InputControl label='First Name' type='text' name='firstname' state={formData.firstname}
                              onChange={onChangeHandler}/>
                <InputControl label='Last Name' type='text' name='lastname' state={formData.lastname}
                              onChange={onChangeHandler}/>
                <InputControl label='Username' type='text' name='username' state={formData.username}
                              onChange={onChangeHandler}/>
                <InputControl label='Password' type='password' name='password' state={formData.password}
                              onChange={onChangeHandler}/>
                <InputControl label='Confirm Password' type='password' name='repassword' state={formData.repassword}
                              onChange={onChangeHandler}/>
                <InputControl label='Email ID' type='email' name='email' state={formData.email}
                              onChange={onChangeHandler}/>
                <InputControl label='Select Gender' type='radio' name='gender' options={genderOption}
                              state={formData.gender} onChange={onChangeHandler}/>
                <InputControl label='Address 1' type='text' name='address1' state={formData.address1}
                              onChange={onChangeHandler}/>
                <InputControl label='Address 2' type='text' name='address2' state={formData.address2}
                              onChange={onChangeHandler}/>
                <InputControl label='City' type='select' name='city' options={cityOption} state={formData.city}
                              onChange={onChangeHandler}/>
                <InputControl label='State' type='select' name='state' options={stateOption} state={formData.state}
                              onChange={onChangeHandler}/>
                <InputControl label='ZipCode' type='number' name='zipcode' state={formData.zipcode}
                              onChange={onChangeHandler}/>
                <button onClick={submitHandler} >Submit</button>
                <button onClick={cancelHandler}>cancel</button>

        </div>
    );

}
export default React.memo(AddUser);
