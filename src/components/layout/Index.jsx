import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {

    return (
        <>
            <Navbar />
            <div className="m-3 my-5 mb-32 lg:mx-32">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout