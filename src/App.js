import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Logout from './auth/Logout';
import Dashboard from './main/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>} exact/>
          <Route path="/signup" element={<Signup/>} exact/>
          <Route path="/logout" element={<Logout/>} exact/>
          <Route path="/dashboard" element={<Dashboard/>} exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
