import React   from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css';  

const home = () => {
   
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'><i className='fas fa-code'></i>D.E.N</Link>
        </h1>
        <ul className='nav-links'>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <section className='landing'>
          <div className='dark-overlay'>
              <div className='landing-inner'>
                 <h1 className='x-large'>Developer Engaging Network</h1>
                 <p className='lead1'>
                    Create a developer profile/portfolio,share posts and get help from other developers
                 </p>
                 <div className='buttons'>
                       <Link to="/register" className='btn btn-primary'>sign-up</Link>
                       <Link to="/login" className='btn btn-primary'>Login</Link>
                 </div>
              </div>
          </div>
      </section>
    </div>
  );
}

 
export default home