// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setAuthSuccess } from "../../features/Header/headerSlice.js"; // Import it here!

export default function SignIn() {
  // 1. State for the exact fields your backend expects
  console.log("UJHWJHGWHG");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({  
          email, 
          password,
          username,
        }),
      });

      const data = await response.json();
      console.log("UJHWJHGWHG");
      if (!response.ok) {
        // Displays the exact error message thrown by your backend's APIError
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // 3. Handle Success!
      
      setSuccessMessage(data.message);

      // localStorage.setItem('user', JSON.stringify(data.data.user));
      dispatch(setAuthSuccess(data));
      console.log("REACHED DISPATCH! User Data:", data); // <--- ADD THIS

      if(!data.data.user.isEmailVerified)
      {
        navigate("/resend-verification-window");
      }
      else navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
        <div className="flex flex-col bg-gray-800 min-h-screen">
          <div className="flex justify-center mt-10">
            <div className="bg-gray-900 flex flex-col justify-center items-center border-3 rounded-3xl border-indigo-700">
              <div className="text-2xl text-white bg-indigo-700 px-11 py-5 rounded-t-2xl">Sign In to Your Account</div>
              
              
              <form onSubmit={handleSubmit}
              className="text-white flex flex-col justify-center items-center mt-8 space-y-2 mb-7">
                {/* Username Input */}
                <div className="form-group">
                  <div htmlFor="username">Username</div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="mt-2 border-2 border-indigo-600 bg-gray-800 rounded px-3 py-1"
                  />
                </div>

                {/* Email Input */}
                <div className="form-group">
                  <div htmlFor="email">Email</div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-2 border-2 border-indigo-600 bg-gray-800 rounded px-3 py-1"
                  />
                </div>

                {/* Password Input */}
                <div className="form-group">
                  <div htmlFor="password">Password</div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="mt-2 border-2 border-indigo-600 bg-gray-800 rounded px-3 py-1"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-indigo-600 mt-4 px-10 py-1 border-2 border-gray-900 rounded hover:bg-indigo-800 hover:border-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message" style={{color: 'green', marginBottom: '1rem', textAlign: 'center'}}>{successMessage}</div>}
      </div>
   
  );
}