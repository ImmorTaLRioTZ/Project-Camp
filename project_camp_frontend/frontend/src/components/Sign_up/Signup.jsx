import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successRegisterMessage, setRegisterSuccessMessage] = useState(null);
    const [successLoginMessage, setLoginSuccessMessage] = useState(null);


    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:4000/api/v1/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        password,
                        username
                    }),
                }
            );

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message||"Registration Failed, please try again later");
            }

            setRegisterSuccessMessage(data.message);

            const loginResponse = await fetch("http://localhost:4000/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(
                            {
                            email,
                            password,
                            username
                        }
                    )
                }
            );

            const loginData = await loginResponse.json();

            if(!loginResponse.ok) {
                throw new Error(data.message||"Registration Failed, please try again later");
            }

            setLoginSuccessMessage(data.message);

            navigate("/verification-window", {state: {userData: data}});
        }
        catch(err)
        {
            setError(err.message);
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
    
        <div className="flex flex-col bg-gray-800 min-h-screen">
          <div className="flex justify-center mt-10">
            <div className="bg-gray-900 flex flex-col justify-center items-center border-3 rounded-3xl border-indigo-700">
              <div className="text-2xl text-white bg-indigo-700 px-31 py-5 rounded-t-2xl">Sign Up</div>
              
              
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
                  {isLoading ? 'Authenticating...' : 'Register'}
                </button>
              </form>
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {successRegisterMessage && <div className="success-message" style={{color: 'green', marginBottom: '1rem', textAlign: 'center'}}>{successRegisterMessage}</div>}
      </div>
   
  );
}