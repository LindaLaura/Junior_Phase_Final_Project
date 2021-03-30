import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const Students = ({students})=>{
    //console.log(students)
    return (
        <div className='container'>
            {
                students.map( student=>{
                    return(
                        <Link to={`/students/${student.id}`} key={student.id}  >
                            <img src={student.imageUrl} />
                            <p>{student.firstName} {student.lastName}</p>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default connect(state => state)(Students)