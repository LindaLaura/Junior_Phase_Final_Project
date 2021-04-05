import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const Header = ({location:{pathname}})=>{ 
    if(pathname ==='/campuses' || pathname ==='/' || pathname==='/campuses/create' ){
        return(
            <div className='sub-container'>
            <h2> All Campuses </h2>
            <Link to='/campuses/create' className='btnAdd'>Add Campus</Link>
        </div>
        )
    }
    return(
        <div className='sub-container'>
        <h2> All Students </h2>
        <Link to='/students/create' className='btnAdd'>Add Student</Link>
    </div>
    )
}

export default connect(state => state)(Header);