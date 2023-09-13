import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import logo from '../static/logo.svg';


const Auth = () => {
  const [state, dispatch] = useContext(UserContext);
  if (state) {
    return (
      <>
        <li className="nav-item">
          <Link className='nav-link active' to="/logout">Logout</Link>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li className="nav-item">
          <Link className='nav-link active' to="/adduser">Register</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link active' to="/authuser">Login</Link>
        </li>
      </>
    );
  }
}

function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid fw-bold">
        <img src={logo} height='30px' alt='Logo' />
        <Link className='navbar-brand' to="/">iNotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className='nav-link active' to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active' to="/about">About Me</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link active' to="/contact">Notes</Link>
            </li>
            <Auth/>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar