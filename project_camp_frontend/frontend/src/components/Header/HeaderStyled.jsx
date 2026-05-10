import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../features/Header/headerSlice.js"; // Make sure this path is correct!

export function HeaderStyled() {
    const dispatch = useDispatch();
    
    // Grab the auth state from Redux
    const { isAuth, isLoading } = useSelector((state) => state.headerVariables);

    // Check auth status exactly once when the header mounts
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    
    return (
        <header className="sticky top-0 z-50 w-full border-b border-green-500/30 bg-slate-900/90 backdrop-blur-md">
            <nav className="flex items-center justify-between px-8 py-4 text-green-500 font-mono">
                
                {/* LEFT SIDE: Navigation Links */}
                <ul className="flex items-center space-x-8 text-sm tracking-widest">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive 
                                    ? "text-green-400 font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" 
                                    : "text-green-600 hover:text-green-400 transition-colors duration-300"
                            }
                        >
                            [HOME]
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive 
                                    ? "text-green-400 font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" 
                                    : "text-green-600 hover:text-green-400 transition-colors duration-300"
                            }
                        >
                            [ABOUT]
                        </NavLink>
                    </li>
                    {isAuth && (
                        <li>
                            <NavLink
                                to="/projects"
                                className={({ isActive }) =>
                                    isActive 
                                        ? "text-green-400 font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" 
                                        : "text-green-600 hover:text-green-400 transition-colors duration-300"
                                }
                            >
                                [PROJECTS]
                            </NavLink>
                        </li>
                    )}
                </ul>

                {/* RIGHT SIDE: Authentication Buttons / Profile */}
                <div className="flex items-center space-x-4">
                    {isLoading ? (
                        // Optional: A cool hacker-themed loading state
                        <span className="text-sm text-green-500/50 tracking-widest animate-pulse">
                            [FETCHING_AUTH_DATA]...
                        </span>
                    ) : isAuth ? (
                        // Render Profile if authenticated
                        <Link 
                            to="/profile"
                            className="px-5 py-1.5 text-sm bg-green-500 text-black font-bold hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all rounded-sm tracking-wider inline-block"
                        >
                            PROFILE
                        </Link>
                    ) : (
                        // Render Login/Signup if NOT authenticated
                        <>
                            <Link 
                                to="/signup"
                                className="px-5 py-1.5 text-sm border border-green-500 text-green-500 hover:bg-green-500/10 transition-all rounded-sm tracking-wider inline-block"
                            >
                                SIGN_UP
                            </Link>
                            <Link 
                                to="/signin"
                                className="px-5 py-1.5 text-sm bg-green-500 text-black font-bold hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all rounded-sm tracking-wider inline-block"
                            >
                                LOGIN
                            </Link>
                        </>
                    )}
                </div>
                
            </nav>
        </header>
    );
}