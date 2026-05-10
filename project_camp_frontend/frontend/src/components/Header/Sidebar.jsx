import { Link } from "react-router-dom";

export function SideBar() {
    return (
        <ul className="flex space-x-3 pr-3">
            <li>
                <Link
                    to="/signup"
                    className="bg-black text-white rounded-2xl px-5 py-2 inline-block hover:bg-gray-800 transition-colors"
                >
                    Sign Up
                </Link>
            </li>
            <li>
                <Link
                    to="/signin"
                    className="bg-black text-white rounded-2xl px-5 py-2 inline-block hover:bg-gray-800 transition-colors"
                >
                    Login
                </Link>
            </li>
        </ul>
    );
}