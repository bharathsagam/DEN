import axios from 'axios';
import React,{useState} from 'react';
import { Link, useParams } from 'react-router-dom';

const Indprofile = () => {
    const [rating,setRating]=useState(null);
    const[taskprovider,setTaskprovider]=useState(null);
    const { fullname, email } = useParams();  
    const submitHandler=e=>{
        axios.get('http://localhost:5001/myprofile',{
            headers :{
               'x-token':localStorage.getItem('token')
            }
         }).then(res=> setTaskprovider(res.data.fullname))
        let review={
            taskprovider,
            taskworker:useParams.id,
            rating,
        }
        axios.post('http://localhost:5001/addreview',review,{
            headers :{
               'x-token':localStorage.getItem('token')
            }
         }).then(res=> alert(res.data))
    }

    return (
        <div>
            <nav className='navbar bg-dark'>
                <h1>
                    <Link to='/'><i className='fas fa-code'></i>Developer Hub</Link>
                </h1>
                <ul className='nav-links'>
                    <li><Link to="/myprofile">Myprofile</Link></li>
                    <li><Link to="/login" onClick={() => localStorage.removeItem('token')}>Logout</Link></li>
                </ul>
            </nav>

            <section className='indprof-container'>
                <Link to='/dashboard' className='btn btn-light'>Back to profiles</Link>
                <div className='profile-grid my-1'>
                    <div className='profile-top bg-primary p-2'>
                        <img className='round-img' src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109" alt='' />
                        <h1 className='large'>{fullname}</h1>
                        <p className='lead'>{email}</p>
                        <p>India</p>
                    </div>

                    <div className='profile-github'>
                        <h2 className='text-primary my-1'>
                            <i className='fab fa-github'></i>Reviews and ratings
                        </h2>
                        <div className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>Enter Your Reviews</h4>
                                <form className='form' autoComplete='off' onSubmit={submitHandler}>
                                    <div className='form-group'>
                                        <input type='text' placeholder='Enter your rating out of 5' name='rating'
                                        onChange={e=>setRating(e.target.value)} required />
                                    </div>
                                    <input type='submit' className='btn btn-primary' value='Add Rating' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Indprofile;
