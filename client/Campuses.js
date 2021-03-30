import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

const Campuses = ({campuses})=>{
    //console.log(campuses)
    return (
        <div className='container'>
            {
                campuses.map( campus=>{
                    return(
                        <Link to={`/campuses/${campus.id}`} key={campus.id} > 
                            <img src={campus.imageUrl} />
                            <p>{campus.name}</p>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default connect(state => state)(Campuses)