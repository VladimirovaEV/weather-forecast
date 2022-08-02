import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg bg-light mb-3">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">Прогноз погоды</Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/selectedPage">Избранное</Link>
                        </li>
                    )}
                </ul>
                <div className = "d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">Вход/Регистрация</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
