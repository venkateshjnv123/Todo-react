import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Todoinput from './components/Todoinput';
function App() {
  return (
    <center>
    <Router>
      <Routes>
        <Route path='/' exact element={<Todoinput/>}>

        </Route>
      </Routes>
    </Router>
    </center>
  );
}

export default App;
