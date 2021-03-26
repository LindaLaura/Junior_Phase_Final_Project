import React from 'react';
import { connect } from 'react-redux'

const Campuses = ({campuses})=>{
    return (
        <div className='container'>
            {
                campuses.map( campus=>{
                    return(
                        <a key={campus.id} href={`#${campus.id}`} >
                            <img src={campus.imageUrl} />
                            <p>{campus.name}</p>
                        </a>
                    )
                })
            }
        </div>
    );
}

export default connect(state => state)(Campuses)