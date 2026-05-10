import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/auth";
import { checkAuth } from "../../features/Header/headerSlice";
import { ShieldAlert, LogOut, Mail } from "lucide-react";
import { useState } from "react";
import axios from "axios"; // assuming resend endpoint uses axiosInstance, let's use authAPI if it has it, else axiosInstance
import { axiosInstance } from "../../api/axios";

export function VerificationWall({ children }) {
    const { userData, isAuth, isLoading } = useSelector((state) => state.headerVariables);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [resendStatus, setResendStatus] = useState("");
    const [isResending, setIsResending] = useState(false);

    // If still loading, just render children or a loader
    if (isLoading) return <>{children}</>;

    const user = userData?.data || userData;

    // If user is logged in but NOT verified
    if (isAuth && user && user.isEmailVerified === false) {
        
        const handleLogout = async () => {
            try {
                await authAPI.logout();
                await dispatch(checkAuth());
                navigate("/signin");
            } catch (error) {
                console.error("Logout failed", error);
            }
        };

        const handleResend = async () => {
            setIsResending(true);
            setResendStatus("");
            try {
                // Assuming POST /auth/resend-email-verification
                await axiosInstance.post("/auth/resend-email-verification");
                setResendStatus("Verification email sent! Please check your inbox.");
            } catch (error) {
                setResendStatus(error.response?.data?.message || "Failed to resend email.");
            } finally {
                setIsResending(false);
            }
        };

        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 p-6 font-mono text-white">
                <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-500/20 p-4 rounded-full border border-red-500/50">
                            <ShieldAlert className="text-red-500" size={48} />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-red-500 mb-2 tracking-widest">ACCESS DENIED</h2>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        Your account has not been verified yet. You must verify your email address before accessing the application.
                    </p>

                    <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-8 text-xs text-gray-300">
                        Logged in as: <br />
                        <span className="text-green-400 font-bold text-sm">{user.email}</span>
                    </div>

                    {resendStatus && (
                        <div className={`mb-6 p-3 rounded text-sm ${resendStatus.includes("sent") ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                            {resendStatus}
                        </div>
                    )}

                    <div className="space-y-4">
                        <button 
                            onClick={handleResend}
                            disabled={isResending}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-all shadow-[0_0_10px_rgba(37,99,235,0.4)] disabled:opacity-50"
                        >
                            <Mail size={18} /> {isResending ? "SENDING..." : "RESEND VERIFICATION"}
                        </button>

                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/50 py-3 rounded transition-all"
                        >
                            <LogOut size={18} /> LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // If not authenticated, or authenticated AND verified, allow normal access
    return <>{children}</>;
}
