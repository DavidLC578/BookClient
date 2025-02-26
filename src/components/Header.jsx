import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onClick = () => logout();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-sky-800 py-4 px-6 text-white font-semibold text-2xl">
            <div className="flex justify-between items-center">
                {/* Nombre del usuario a la izquierda */}
                {isAuthenticated && user && (
                    <div className="flex-shrink-0">{user.name}</div>
                )}

                {/* Icono de hamburguesa para móviles */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                {/* Menú de navegación */}
                <div
                    className={`${isMenuOpen ? "block" : "hidden"
                        } md:flex md:items-center md:space-x-6 absolute md:static top-16 right-0 bg-sky-800 w-full md:w-auto text-center md:text-left`}
                >
                    {!isAuthenticated ? (
                        <>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/home">
                                Home
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/explore">
                                Explore
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/about">
                                About
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/register">
                                Sign up
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/login">
                                Sign in
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/home">
                                Home
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/publish">
                                Publish
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/explore">
                                Explore
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/favorites">
                                Favourites
                            </Link>
                            <Link className="block py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300" to="/profile">
                                Profile
                            </Link>
                            <button
                                className="block w-full py-2 hover:bg-sky-700 md:hover:bg-transparent md:hover:text-gray-300 cursor-pointer"
                                onClick={onClick}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;