import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

function openNav(){
    var x = document.getElementById("nav");

    if (x.className === "nav") {
        x.className += " menujs";
        document.getElementById("threeline-icon").innerHTML = "&Cross;";
    } else {
        x.className = "nav";
        document.getElementById("threeline-icon").innerHTML = "&#9776;";
    }

}

export default props =>
    <aside className="menu-area">
        <nav id="nav-wrap" className="menu">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a type="button" className="mobile-btn" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
                <li className="current">
                    <Link to="/">
                        <i className="fa fa-home smoothscroll"></i> Início
                </Link>
                </li>
                <li>
                    <Link to="/users">
                        <i className="fa fa-users"></i> Usuários
                </Link>
                </li>
                <li>
                    <Link to="/new" className="smoothscroll">
                        Séries
                </Link>
                </li>
                <li>
                    <Link to="/newGenre" className="smoothscroll">
                        Gêneros
                    </Link>
                </li>
                <li id="threeline-icon" class="threeline-icon" onclick="openNav()">&#9776;</li>

            </ul>
        </nav>
        

    </aside>