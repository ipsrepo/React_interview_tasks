import './App.css';
import CURD from './components/curdOperation';
import useNotification from './components/curdOperation/useNotification';
import LocalCRUD from './components/localCRUD/localCRUD';

function App() {
  return (
    <div className="App">

      {/*<DynamicInput />*/}

      {/*<CURD/>*/}

        <LocalCRUD />

    </div>
  );
}

export default App;
