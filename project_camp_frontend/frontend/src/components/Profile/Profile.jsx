import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/auth";
import { checkAuth } from "../../features/Header/headerSlice";
import { User, Lock, LogOut } from "lucide-react";

export function Profile() {
    const { userData, isLoading, isAuth } = useSelector((state) => state.headerVariables);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Fetch fresh user data whenever the profile page is visited
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            // Refetch auth state (which will set isAuth to false)
            await dispatch(checkAuth());
            navigate("/signin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordMessage("");
        setPasswordError("");
        try {
            await authAPI.changePassword(passwordData);
            setPasswordMessage("Password changed successfully!");
            setPasswordData({ oldPassword: "", newPassword: "" });
        } catch (error) {
            setPasswordError(error.response?.data?.message || "Failed to change password");
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-900 flex justify-center items-center text-green-500 font-mono">LOADING PROFILE...</div>;
    }

    if (!isAuth) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl mb-4">You are not logged in.</h2>
                <button onClick={() => navigate("/signin")} className="bg-green-500 text-black font-bold px-6 py-2 rounded">
                    LOGIN
                </button>
            </div>
        );
    }

    // Adjusting for the APIResponse structure (usually data is inside userData.data)
    const user = userData?.data || userData;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-mono">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-green-500 mb-8 tracking-widest drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                    [USER_PROFILE]
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* User Details Card */}
                    <div className="bg-gray-800 p-8 rounded-xl border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
                            <div className="bg-green-500/20 p-4 rounded-full border border-green-500/50">
                                <User className="text-green-500" size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-100">{user?.username}</h2>
                                <p className="text-gray-400 text-sm">Active Member</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-green-400/70 mb-1">EMAIL ADDRESS</label>
                                <div className="bg-gray-900 p-3 rounded border border-gray-700 text-gray-300">
                                    {user?.email}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-green-400/70 mb-1">ACCOUNT ID</label>
                                <div className="bg-gray-900 p-3 rounded border border-gray-700 text-gray-300 text-xs truncate">
                                    {user?._id}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleLogout}
                            className="mt-8 w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 py-3 rounded transition-all tracking-widest font-bold"
                        >
                            <LogOut size={18} /> LOGOUT
                        </button>
                    </div>

                    {/* Change Password Card */}
                    <div className="bg-gray-800 p-8 rounded-xl border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                            <Lock className="text-green-500" size={24} /> SECURITY
                        </h2>

                        <form onSubmit={handleChangePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm text-green-400/70 mb-1">CURRENT PASSWORD</label>
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 focus:border-green-500 rounded p-3 text-white outline-none transition-colors"
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-green-400/70 mb-1">NEW PASSWORD</label>
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 focus:border-green-500 rounded p-3 text-white outline-none transition-colors"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                />
                            </div>

                            {passwordMessage && <div className="text-green-500 bg-green-500/10 p-3 rounded text-sm">{passwordMessage}</div>}
                            {passwordError && <div className="text-red-400 bg-red-400/10 p-3 rounded text-sm">{passwordError}</div>}

                            <button 
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded transition-all shadow-[0_0_10px_rgba(34,197,94,0.4)] tracking-wider"
                            >
                                UPDATE PASSWORD
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}