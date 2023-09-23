import React from "react";
import {Link} from "react-router-dom";
const Header = ()=>{
    return(
        <>
        <header>
            <Link to="/">HOME</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
        </header>
        </>
    );
};

export default Header;