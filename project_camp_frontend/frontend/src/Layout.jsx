import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { HeaderStyled } from "./components/Header/HeaderStyled";
import { VerificationWall } from "./components/VerificationWall/VerificationWall";

export function Layout() {
    return (
        <>
            <HeaderStyled/>
            <VerificationWall>
                <Outlet/>
            </VerificationWall>
            <Footer/>
        </>
    )
}