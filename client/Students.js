import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

const Students = ({students, campuses})=>{
     let campusName = '';
    return (
        <div className='container'>
            {
                students.map( student=>{
                    const id = student.campusId;
                    for(let i=0; i<campuses.length; i++){
                        if(campuses[i].id === id){
                            campusName =campuses[i].name;
                        }
                    }
                    return(
                        <Link to={`/students/${student.id}`} key={student.id}  >
                            <div className='inner-container'>
                                <img src={student.imageUrl} />
                                <p>{student.firstName} <br></br>{student.lastName}</p>
                                <p>{campusName}</p>
                                <button onClick={()=> destroy(student)} className='btnDel'>delete</button>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default connect(state => state)(Students)