import React ,{useState} from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
const Register = () => {
    const [data,setData]=useState({
        fullname:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:'',
      })
      const changeHandler=e=>{
        setData({...data,[e.target.name]:e.target.value})
      }
      const submitHandler=e=>{
        e.preventDefault();
        console.log(data);
      }
  return (
    <div> 
        <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'><i className='fas fa-code'></i>Developer Hub</Link>
        </h1>
        <ul className='nav-links'>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className='Log-body'> 
      <section className='container'>
            <h1 className='large text-primary'>Sign-Up</h1>
            <p className='lead'><i className='fas fa-user'> Create your account</i></p>
            <form className='form'  onSubmit={submitHandler} autoComplete='off'>
                <div className='form-group'>
                   <input type='text' placeholder='Name'  onChange={changeHandler} name='fullname' required/>
                </div>
                <div className='form-group'>
                   <input type='email' placeholder='Email Address' onChange={changeHandler} name='email' required/>
                </div>
                <div className='form-group'>
                  <input type='password' placeholder='Mobile' onChange={changeHandler} name='mobile'/>
                </div>
                <div className='form-group'>
                   <input type='text' placeholder='Skill' onChange={changeHandler} name='skill' required/>
                   <small className='form-text'>please provide skills by seperation of the comma <b>( , )</b></small>
                </div>
                <div className='form-group'>
                  <input type='password' placeholder='Password' onChange={changeHandler} name='password'/>
                </div>
                <div className='form-group'>
                  <input type='password' placeholder='Confirmpassword' onChange={changeHandler} name='confirmpassword'/>
                </div>

                <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p className='my-1'>
                    Already have an Account?<Link to='/login'>Sign-In</Link>
               </p>
      </section>
      </div>

    </div>
  )
}

export default Register