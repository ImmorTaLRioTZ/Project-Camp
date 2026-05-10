import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // 1. Added import
import { setAuthSuccess } from '../../features/Header/headerSlice.js'; // 1. Added import (Double check this path!)

export function SigninStyled() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch(); // 2. Initialize dispatch
    const canvasRef = useRef(null);

    // Matrix Rain Effect Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        const draw = () => {
            // Fading trail effect
            ctx.fillStyle = "rgba(15, 23, 42, 0.1)"; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Hacker Green text
            ctx.fillStyle = "#22c55e"; 
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const intervalId = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsLoading(true);
        console.log("KUYGVUGU");

        //alert("1. Form Submitted! Sending request...");

        try {
            const response = await fetch('http://localhost:4000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({  //jfjbjb
                    email, 
                    password,
                    username,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed. Please check your credentials.');
            }

            setSuccessMessage(data.message); 
            console.log(data);

            //alert("2. Backend said SUCCESS! About to dispatch to Redux.");
            
            console.log("1. ABOUT TO DISPATCH TO REDUX:", data); // ADD THIS
            dispatch(setAuthSuccess(data));
            console.log("2. DISPATCH COMPLETE!"); // ADD THIS
            
            // Save basic info to localStorage
            if(!data.data.user.isEmailVerified) {
                navigate("/resend-verification-window");
            } else {
                navigate("/");
            }

        } catch (err) {
            //alert("3. CRASH DETECTED: " + err.message);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen bg-slate-900 font-mono text-green-500 overflow-hidden">
            
            {/* The Animated Canvas Background */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0"
            />

            {/* Terminal Window Container */}
            <div className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-md flex flex-col border border-green-500/50 rounded-sm shadow-[0_0_30px_rgba(34,197,94,0.15)] overflow-hidden">
                
                {/* Terminal Header */}
                <div className="text-xl text-green-400 bg-green-900/20 border-b border-green-500/50 px-8 py-4 font-bold tracking-widest text-center flex justify-between items-center">
                    <span>AUTHENTICATION_REQUIRED</span>
                    <span className="animate-pulse">_</span>
                </div>
                
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col px-8 py-8 space-y-5"
                >
                    {/* Status Messages */}
                    {error && (
                        <div className="text-red-500 text-sm bg-red-950/40 border border-red-500/50 p-3 rounded-sm font-bold tracking-wider">
                            [ERROR]: {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="text-green-400 text-sm bg-green-900/30 border border-green-500/50 p-3 rounded-sm tracking-wider">
                            [SUCCESS]: {successMessage}
                        </div>
                    )}

                    {/* Username Input */}
                    <div className="flex flex-col group">
                        <label htmlFor="username" className="text-xs tracking-widest mb-1 opacity-70 group-focus-within:opacity-100 transition-opacity">
                            USER_ID
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="> input_username_"
                            required
                            className="bg-black/50 border border-green-500/30 text-green-400 px-3 py-2 rounded-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all placeholder:text-green-700/50 relative z-20"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col group">
                        <label htmlFor="email" className="text-xs tracking-widest mb-1 opacity-70 group-focus-within:opacity-100 transition-opacity">
                            COMM_LINK (EMAIL)
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="> input_email_"
                            required
                            className="bg-black/50 border border-green-500/30 text-green-400 px-3 py-2 rounded-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all placeholder:text-green-700/50 relative z-20"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col group">
                        <label htmlFor="password" className="text-xs tracking-widest mb-1 opacity-70 group-focus-within:opacity-100 transition-opacity">
                            SECURITY_KEY
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="> **********"
                            required
                            className="bg-black/50 border border-green-500/30 text-green-400 px-3 py-2 rounded-sm focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all placeholder:text-green-700/50 relative z-20"
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="mt-4 px-6 py-3 bg-green-500 text-black font-bold tracking-widest rounded-sm hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative z-20"
                        disabled={isLoading}
                    >
                        {isLoading ? 'VERIFYING_CREDENTIALS...' : 'EXECUTE_LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}