import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';


function SignUp() {
  const [btnData, setBtnData] = useState('Register');
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
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
    setBtnData('Adding User...');
    const { name, email, phone, work, password } = data;
    const objData = {
      name: name,
      email: email,
      phone: parseInt(phone),
      work: work,
      password: password
    }
    fetch('/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objData)
    }).then((res) => {
        if(res.status === 201){
          setBtnData('Register');
          navigate('/authuser');
        }
        return res.json();
      }).then((data) => {
        setBtnData('Register');
        alert(data.message);
      })
      .catch((err) => { console.error('Failed to send Data', err); });
  }

  return (
    <div className='form-container'>
        <form className='formdata' method='POST'>
          <p className='formhead'>Sign Up</p>
          <input autoComplete='off' className='forminput' type='text' name='name' value={data.name} onChange={handleChange} placeholder='Name' />
          <input autoComplete='off' className='forminput' type='email' name='email' value={data.email} onChange={handleChange} placeholder='E-mail' />
          <input autoComplete='off' className='forminput' type='phone' name='phone' value={data.phone} onChange={handleChange} placeholder='Phone' />
          <input autoComplete='off' className='forminput' type='text' name='work' value={data.work} onChange={handleChange} placeholder='Work' />
          <input autoComplete='off' className='forminput' type='password' name='password' value={data.password} onChange={handleChange} placeholder='Password' />
          <div className='formlogo'>
            <button className='form-button' onClick={handleSubmit}>{btnData}</button>
            <Link to='/authuser'>Already have an account ?</Link>
          </div>
        </form>
    </div>
  );
}

export default SignUp