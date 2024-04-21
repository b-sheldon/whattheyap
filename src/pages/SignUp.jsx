import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import useStore from '../store/zustand';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUserId } = useStore();

  const handleSignUp = async () => {
    try {
      const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserId(user.uid); 
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-purpledark">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          disabled={!email || !password}
          onClick={handleSignUp}
          className={`w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !email || !password ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <a href="/signin" className="text-black-500 hover:underline">Already have an account?</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
