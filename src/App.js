import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Logout from './auth/Logout';
import Dashboard from './main/Dashboard';
import './App.css';

function App() {
    const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>} exact/>
          <Route path="/signup" element={<Signup/>} exact/>
          <Route path="/logout" element={<Logout isAuth={isAuth} setIsAuth={setIsAuth}/>} exact/>
          <Route path="/dashboard" element={<Dashboard  isAuth={isAuth} setIsAuth={setIsAuth}/>} exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
