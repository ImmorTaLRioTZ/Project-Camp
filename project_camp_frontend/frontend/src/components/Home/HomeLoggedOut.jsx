import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function HomeLoggedOut() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size to full window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Characters to display (Latin, numbers, and some symbols)
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
        const fontSize = 16;
        const columns = canvas.width / fontSize;

        // Array to track the Y coordinate of each column
        const drops = Array.from({ length: columns }).fill(1);

        const draw = () => {
            // Black background with 5% opacity to create the fading trail effect
            ctx.fillStyle = "rgba(15, 23, 42, 0.1)"; // Matches Tailwind slate-900 roughly
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Hacker Green text
            ctx.fillStyle = "#22c55e"; // Tailwind green-500
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Pick a random character
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw the character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Randomly reset the drop to the top to stagger the falling effect
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Move the drop down
                drops[i]++;
            }
        };

        // Run the animation at ~30 FPS
        const intervalId = setInterval(draw, 33);

        // Handle window resize dynamically
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            clearInterval(intervalId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        // Wrapper must be relative and overflow-hidden to contain the absolute canvas
        <div className="relative w-full h-screen overflow-hidden bg-slate-900 text-white flex flex-col justify-center items-center">
            
            {/* The Animated Canvas Background */}
            <canvas 
                ref={canvasRef} 
                className="absolute inset-0 z-0"
            />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-10 bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-6 tracking-wider font-mono">
                    SYSTEM_ACCESS
                </h1>
                
                <p className="text-gray-300 max-w-lg text-center mb-8 font-mono">
                    Welcome to the central mainframe. Unauthorized access is strictly prohibited. Identity verification required to proceed.
                </p>

                <div className="flex gap-4">
                    <Link to="/signin">
                        <button className="px-8 py-3 bg-green-500 text-black font-bold rounded font-mono hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300">
                            INITIATE_LOGIN
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className="px-8 py-3 bg-transparent border-2 border-green-500 text-green-500 font-bold rounded font-mono hover:bg-green-500/10 transition-all duration-300">
                            READ_DOCS
                        </button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
}