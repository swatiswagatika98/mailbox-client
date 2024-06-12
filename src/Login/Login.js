import React, { useState } from 'react';
import './Login.css'
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate = useNavigate();

  const loginHandler = async (e) => {  
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login Successful');
       navigate("/receivedemails")
    } catch (err) {
      alert(err)
    }
  };

  return (
    <div className="login__card ">
      <h1 className='cart__h1'>Log in</h1>
      <form className='input__form'>
        <div>
             <div >
          <label htmlFor="email" >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-signup" onClick={loginHandler}>
          Log in
        </button>
        </div>
      </form>

      {/* <div>
        <button className="btn_signup">
          <Link to="/signup" style={{ color: 'black', textDecoration:"none"}}>
            Do not have an account? Sign up
          </Link>
        </button>
      </div> */}
    </div>
  );
}