import React, { useState } from 'react';
import './Signup.css';
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    
  const signupHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card">
      <h1>Sign Up</h1>
      <form onSubmit={signupHandler}>
        <div>
          <label htmlFor="email">Email</label>
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-signup">
          Sign Up
        </button>
      </form>

      <button className="btn">
        Have an account? Login
      </button>

    </div>
  );
}
