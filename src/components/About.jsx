import React from 'react';
import { useAuth } from '../AuthContext';
import './About.css';
import userimg from '../static/user.png';

function About() {

  const { user } = useAuth();


  return (
    <div className='about-body'>
      <div className='about-top'>
        { user && <div className='userbasic'>
          <div className='user-name'>
          {user.name}
          </div>
          <div className='user-info'>
            <p>{user.email}</p>
            <p>+91-{user.phone}</p>
            <p>{user.work}</p>
          </div>
        </div>}
        <div className='userimg'>
          <img id='userimg' height='150px' src={userimg} alt='img'/>
        </div>
      </div>
      <div className='about-bottom'>
        <div className='desc'>
          <h1>About</h1>
        Craig Federighi is Apple’s senior vice president of Software Engineering, 
        reporting to CEO Tim Cook. Craig oversees the development of iOS and macOS.
         His teams are responsible for delivering the software at the heart 
         of Apple’s innovative products, including the user interface,
          applications and frameworks.<br/>
          Craig returned to Apple in 2009 to lead macOS engineering, 
          and in 2012 took on responsibility for iOS as well, delivering all
           subsequent releases of the world’s most advanced desktop 
           and mobile operating systems.
        </div>
        <div className='other-info'>
          <h1>Technical Work</h1>
          Prior to his return, Craig worked at NeXT, followed by Apple, 
          and then spent a decade at Ariba, an internet e-commerce pioneer 
          where he held several roles including chief technology officer.
          <br/>
          Craig holds a Master of Science degree in Computer Science and
          a Bachelor of Science in Electrical Engineering and 
          Computer Science from the University of California, Berkeley.
        </div>
      </div>
    </div>
  )
}

export default About