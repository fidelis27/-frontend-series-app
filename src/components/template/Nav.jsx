import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'


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

            </ul>
        </nav>
        

    </aside>