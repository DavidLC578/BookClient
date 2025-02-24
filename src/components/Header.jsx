import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const onClick = () => logout();
    return (
        <nav className="bg-sky-800 py-4 px-6 text-white font-semibold text-2xl">
            <div className="flex justify-between items-center">
                {isAuthenticated && user && <div>{user.name}</div>}


                {
                    !isAuthenticated ?
                        <div className="md:flex space-x-6">
                            <Link className="" to="/home">Home</Link>
                            <Link className="" to="/explore">Explore</Link>
                            <Link className="" to="/about">About</Link>
                            <Link className="" to="/register">Sign up</Link>
                            <Link className="" to="/login">Sign in</Link>
                        </div>
                        :
                        <div className="md:flex space-x-6">
                            <Link className="" to="/home">Home</Link>
                            <Link className="" to="/publish">Publish</Link>
                            <Link className="" to="/explore">Explore</Link>
                            <Link className="" to="/favorites">Favourites</Link>
                            <Link className="" to="/profile">Profile</Link>
                            <button className="cursor-pointer" onClick={onClick}>Logout</button>
                        </div>
                }
            </div>
        </nav>
    )
}
export default Header;