import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


const Home = ({campuses})=>{
    return (
        <div className='container'>
        {
            campuses.map( campus=>{
                return(
                    <div  className='inner-container' key={campus.id} >
                        <img src={campus.imageUrl} />
                        <p>{campus.name}</p>
                    </div>
                )
            })
        }
    </div>
    )
}


export default connect(state => state)(Home)