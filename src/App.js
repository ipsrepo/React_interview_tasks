import './App.css';
import AddUser from './component/addUser';
import ViewUser from './component/viewUser';
import {useDispatch, useSelector} from 'react-redux';
import {toggleShowing, toggleUpdating} from './redux/userSlice';
import ErrorBoundary from './component/ErrorBoundary';


function App() {
    const {isFormShowing, isUpdating} = useSelector(state => state.user);
    const dispatcher = useDispatch();


    const showHandler = () => {
        isFormShowing && dispatcher(toggleShowing(false))
        isUpdating && dispatcher(toggleUpdating({flag: false, data: {}}))
    }
    return (
        <ErrorBoundary>
            <div className="App">
                <div className={`userTable ${isFormShowing ? 'hideUser' : ''}`} onClick={showHandler}>
                    <ViewUser/>
                </div>
                {isFormShowing && <AddUser/>}
            </div>
        </ErrorBoundary>
    );
}

export default App;
