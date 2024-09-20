 import React from 'react'
 import {BrowserRouter,Route,Routes} from 'react-router-dom';
 
import home from './home';
import Dashboard from './Dashboard'
import Login from './Login';
import Register from './Register';
import Myprofile from './Myprofile';
import Indprofile from './Indprofile';
 
 const App = () => {
   return (
     <div> 
      <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={home}/>
        <Route path='/login' exact Component={Login}/>
        <Route path='/register' exact Component={Register}/>
        <Route path='/dashboard' exact Component={Dashboard}/>
        <Route path='/myprofile' exact Component={Myprofile}/>
        <Route path='/indprofile/:fullname/:email/:skill/:id' exact Component={Indprofile}/>
      </Routes>
      </BrowserRouter>

     </div>
   )
 }
 
 export default App