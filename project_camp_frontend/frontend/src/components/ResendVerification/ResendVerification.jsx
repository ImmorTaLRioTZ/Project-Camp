import { useState } from "react"
import { useLocation } from "react-router-dom";

export function ResendVerificationWindow() {
    // const [currentUser, setCurrentUser] = useState({});
    // const location = useLocation();
    // //const userData = location.state?.userData;

    const resendVerificationMail = async () => {
        const response = await fetch("http://localhost:4000/api/v1/auth/resend-email-verification",
            {
                method: "POST",
                credentials: "include"
            }
        )
        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || "Something went wrong while sending the verification mail");
        }
    }
    resendVerificationMail();
    return (
        <div
        className="bg-gray-800 flex flex-col min-h-screen justify-center items-center">
            <div
            className="text-white text-3xl font-bold font-sans">
                Verification email has been sent
            </div>
            <div
            className="text-white mt-5 px-7 py-4 border-none rounded-2xl hover:cursor-pointer hover:bg-gray-900"
            onClick={resendVerificationMail}>Click to resend verification mail</div>
        </div>
    )
}