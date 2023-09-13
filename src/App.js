import React, { createContext, useReducer } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import reducer from './reducers/userReducer';
import Logout from './components/Logout';

const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, false);

  return (
    <>
      <UserContext.Provider value={[state, dispatch]}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/contact' element={<Contact />}></Route>
            <Route exact path='/adduser' element={<SignUp />}></Route>
            <Route exact path='/authuser' element={<SignIn />}></Route>
            <Route exact path='/logout' element={<Logout />}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
export { UserContext };
