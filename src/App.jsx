import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';



function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route
				path="/about"
				element={
				<PrivateRoute
					element={<About />}
				/>
				}
			/>
			<Route
				path="/contact"
				element={
				<PrivateRoute
					element={<Contact />}
				/>
				}
			/>
            <Route exact path='/adduser' element={<SignUp />} />
            <Route exact path='/authuser' element={<SignIn />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
