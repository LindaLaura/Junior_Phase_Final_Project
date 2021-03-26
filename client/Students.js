import React from 'react'
import { connect } from 'react-redux';

const Students = ({students})=>{
    return (
        <div className='container'>
            {
                students.map( student=>{
                    return(
                        <a key={student.id} href={`#${student.id}`} >
                            <img src={student.imageUrl} />
                            <p>{student.firstName} {student.lastName}</p>
                        </a>
                    )
                })
            }
        </div>
    );
}

export default connect(state => state)(Students)