import {NavLink} from "react-router-dom";
import {type ReactNode} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../redux/authSlice.ts";
import type {RootState} from "../redux/store.ts";


interface LinkInterface {
    path: string;
    label: string;
}

const Navbar = ({children}: {children: ReactNode}) => {
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector((state: RootState) => state.auth)
    const handleLogin = () => {
        dispatch(login())
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const navLinks: LinkInterface[] = [
        {path: '/', label: 'Products'},
        {path: '/posts', label: 'Posts'},
        {path: '/users', label: 'Users'},
        {path: '/todos', label: 'Todos'},
    ]

    return <>
    <nav className="navbar">
        <div className="container">
            <ul className="navbar_list">
                {navLinks.map((link) => (
                    <li className="navbar_item" key={link.path}>
                        <NavLink className='navbar_link' to={link.path}>{link.label}</NavLink>
                    </li>
                ))}
                {isAuthenticated ? (
                    <li className="navbar_item">
                        <button className='navbar_link' onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li className="navbar_item">
                        <button className='navbar_link' onClick={handleLogin}>Login</button>
                    </li>
                )}
            </ul>
        </div>
    </nav>
    {children}
    </>
};

export default Navbar;
