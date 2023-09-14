import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import { UserContext } from '../App';

function SignIn() {
  const [state, dispatch] = useContext(UserContext);
  const [btnData, setBtnData] = useState('Login');
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnData('Logging In...');
    const {email, password} = data;
    fetch('/authuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    }).then((res) => {
        if(res.status === 200){
          setBtnData('Login');
          dispatch({type: 'USER', payload: true});
          navigate('/');
        }
        return res.json();
    }).then((data)=>{
      setBtnData('Login');
      alert(data.message);
    }).catch((err) => { 
      console.error('Failed to send Data', err); 
    });

  }


  return (
    <div className='form-container'>
        <form className='formdata' method='POST'>
          <p className='formhead'>Login</p>
          <input autoComplete='off' className='forminput' type='email' name='email' value={data.email} onChange={handleChange} placeholder='E-mail' />
          <input autoComplete='off' className='forminput' type='password' name='password' value={data.password} onChange={handleChange} placeholder='Password' />
          <div className='formlogo'>
            <button className='form-button' type='submit' onClick={handleSubmit}>{btnData}</button>
            <Link to='/adduser'>Don't have an account ?</Link>
          </div>
        </form>
    </div>
  )
}

export default SignIn;