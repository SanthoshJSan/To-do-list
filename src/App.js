import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect } from 'react';


import SideBar from './components/side-bar/side-bar.js';
import AddTask from './components/add-task/add-task.js';
import ViewTask from './components/view-task/view-task.js';


function App() {

  const [view, setView] = useState('view-task');

  const sideBarClick = (value)=> {
    setView(value);
  }

  return (
    <div className="App p-md-2">
      <SideBar onClick={sideBarClick}>
        {
          (view === 'view-task')? <ViewTask/> : <AddTask/>
        }

        </SideBar>
    </div>
  );
}

export default App;
