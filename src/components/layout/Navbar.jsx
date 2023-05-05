import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faDashboard, faHome, faPhone, faSearch, faSignIn, faSignOut, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { rupiah } from "../../helper"

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-primary-800 to-secondary-700 lg:px-32">
                <div className="container px-4 mx-auto items-center flex lg:flex-wrap justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <NavLink to={"/"}
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                        >
                            PROGRAMMING TEST
                        </NavLink>
                    </div>
                </div>
            </nav>
            <nav
                className="relative w-full flex items-center justify-end py-3 bg-neutral-900 text-neutral-200 shadow-lg navbar navbar-expand navbar-light lg:px-32"
            >
                <div className="container-fluid w-full flex items-center justify-end px-6">
                    <div className="collapse navbar-collapse overflow-x-auto flex-grow items-center scrollbar-hide" id="navbarSupportedContent1">
                        <ul className="navbar-nav flex flex-grow pl-0 list-style-none mr-auto whitespace-nowrap" style={{
                            fontSize: "14px",
                        }}>
                            <li className="nav-item p-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link text-white' : 'nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0'
                                    }
                                    to="/">
                                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                                    Nasabah
                                </NavLink>
                            </li>
                            <li className="nav-item p-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link text-white' : 'nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0'
                                    }
                                    to="/transaction">
                                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                                    Transaksi
                                </NavLink>
                            </li>
                            <li className="nav-item p-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link text-white' : 'nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0'
                                    }
                                    to="/nasabah-point">
                                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                                    Nasabah Point
                                </NavLink>
                            </li>
                            <li className="nav-item p-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? 'nav-link text-white' : 'nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0'
                                    }
                                    to="/nasabah-report">
                                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                                    Nasabah Report
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar