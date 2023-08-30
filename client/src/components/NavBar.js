import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
    return (
        <div className={style.navbar}>
            <div className="logo">
                {/* <Link to="/">Logo</Link> */}
            </div>
            <div className={style.searchbar}>
                <input
                    className={style.searchinput}
                    type="text"
                    placeholder="Buscar producto..."
                />
                <button className={style.searchbutton}>Buscar</button>
            </div>
            <div className={style.loginbutton}>
                <button className={style.loginbtn}>Login</button>
            </div>
        </div>
    );
};

export default NavBar;

