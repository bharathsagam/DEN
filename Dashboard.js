import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import './Dashboard.css';
import { Link, Navigate } from 'react-router-dom'
import { set } from 'mongoose';
const Dashboard = () => {
   const [data,setData]=useState([]);
   useEffect(()=>{
      axios.get('http://localhost:5001/allprofiles',{
         headers :{
            'x-token':localStorage.getItem('token')
         }
      }).then(res=>setData(res.data))
   },[])
   if(!localStorage.getItem('token')){
      return <Navigate to='/login'/>
   }
  return (
    <div>
        
        <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'><i className='fas fa-code'></i>Developer Hub</Link>
        </h1>
        <ul className='nav-links'>
          <li><Link to="/myprofile">Myprofile</Link></li>
          <li><Link to="/login" onClick={()=>localStorage.removeItem('token')}>Logout</Link></li>
        </ul>
        </nav>
      <div className='dash-main'> 
         <section className='dash-container'>
            <h1 className='large text-primary scrolling-text'>Developers</h1> 
            <p className='lead'>
              <i className='fab fa-connectdevelope'></i>Browse and connect with developers
            </p>
           <div className='profiles'>
            {data.length>=1 ? 
              data.map(profile=> <div className='profile bg-light'>
               <img className='round-img' src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"  
               alt=''/>
               <div>
                   <h2>{profile.fullname}</h2>
                   <p>{profile.email}</p>
                   <p>India</p>
                   <Link  to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className='btn btn-primary'>Veiw profile</Link>
               </div>
               <ul>
                    {profile.skill.split(',').map(skill=>
                      <li className='text-primary'>
                      <i className='fas fa-check'></i>{skill}
                   </li>
                    )}
             </ul>
        </div>)
            :null}
            

         </div>
         </section>
         </div>
    </div>
  )
}

export default Dashboard