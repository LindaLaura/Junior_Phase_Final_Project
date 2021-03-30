import React from 'react';
import  { connect } from 'react-redux';
import {Link} from 'react-router-dom'


const Nav = ()=>{
    //console.log(props)
    return (
        <nav className='navbar'>
            <Link to='/' className='logo'>
                Home
            </Link>
            <ul className='nav-links'>
                <li className='nav-item'><Link to='/campuses'>Campuses</Link></li>
                <li className='nav-item'><Link to='/students'>Students</Link></li>
            </ul>
        </nav>
    )
}

export default connect(state => state)(Nav)