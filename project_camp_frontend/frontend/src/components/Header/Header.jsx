import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SideBar } from "./Sidebar"; // Assuming Sidebar is fixed and imported correctly
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../features/Header/headerSlice.js";

export function Header() {
    const dispatch = useDispatch();
    
    // Grab the state directly from Redux! No need for local useState.
    const { isAuth, isLoading, userData } = useSelector((state) => state.headerVariables);

    useEffect(() => {
        // Dispatch the async thunk exactly once when the Header mounts
        dispatch(checkAuth());
    }, [dispatch]);

    console.log("🕵️ HEADER RENDERED -> isAuth:", isAuth, "| isLoading:", isLoading);

    return (
        <header>
            <nav className="bg-indigo-800 text-white">
                <ul className="flex font-bold font-sans py-3 pl-10 justify-between items-center">
                    <li className="pr-10">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="pr-10">
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        {isLoading ? (
                            <span className="px-5 py-2 text-gray-300">Loading...</span>
                        ) : isAuth ? (
                            <NavLink to="/profile" className="bg-black rounded-2xl px-5 py-2">
                                Profile 
                            </NavLink>
                        ) : (
                            <SideBar />
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}