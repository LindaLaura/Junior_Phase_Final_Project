import React from 'react';
import  { connect } from 'react-redux'


const Nav = ({campuses, students})=>{
    return (
        <nav className='navbar'>
            <a href='#' className='logo'>
                Home
            </a>
            <ul className='nav-links'>
                <li className='nav-item'><a href='#campuses'>Campuses</a></li>
                <li className='nav-item'><a href='#students'>Students</a></li>
            </ul>
        </nav>
    )
}

export default connect(state => state)(Nav)