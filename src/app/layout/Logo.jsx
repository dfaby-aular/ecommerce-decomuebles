import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div > 
             <Link className="nav-link active" aria-current="page" to='/#home'>
            <img src="/logo.png" alt="Deco Muebles" width={150}></img> 
                
                </Link>
        </div>
    )
}

export default Logo;