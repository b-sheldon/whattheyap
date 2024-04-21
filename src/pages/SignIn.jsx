import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import useStore from '../store/zustand';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUserId } = useStore();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserId(user.uid); 
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-color4 via-color3 to-color2 text-black w-full">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-color4 mb-6">Sign In</h2>
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
          onClick={handleSignIn}
          className={`w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !email || !password ? "bg-gray-500" : "bg-color3 hover:bg-color2"
          }`}
        >
          Sign In
        </button>

        <div className="mt-4 text-center">
          <a href="/signup" className="text-color3 hover:underline">New to What the Yap?</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
