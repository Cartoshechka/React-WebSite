import {NavLink} from "react-router-dom";
import {type ReactNode} from "react";

interface LinkInterface {
    path: string;
    label: string;
}

const Navbar = ({children}: {children: ReactNode}) => {
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
                        <NavLink to={link.path}>{link.label}</NavLink>
                    </li>
                ))}

            </ul>
        </div>
    </nav>
    {children}
    </>
};

export default Navbar;
