import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'


const Student = ({student, students, campus, campuses, id})=>{ 
     const studentsList = [];
    if(!student){
        return null;
    }
    if(campus === undefined ){
        return(
            <div className='container'>            
                <div className='inner-container'>
                    <img src={student.imageUrl}/>
                    <p>{student.firstName} {student.lastName}</p>
                    <Link className='btnEdit' to={`/students/${student.id}/edit`}>edit</Link>
                    <button className='btnDel' onClick={()=> destroy(student)}>delete</button>
                </div>
                <div>
                    <h2>This student is not registered to a campus</h2>
                    <select>
                        <option> Select campus...</option>
                            {
                                campuses.map(campus => {
                                    return(<option key={campus.id}>{campus.name}</option>)
                                })
                            }
                    </select>
                    {/* <Link to={`/campuses/${campus.id}/edit`} className='btnAdd'>change campus</Link> */}
                </div>
            </div>
        )
    }
    for(let i=0; i<students.length; i++){
        if (students[i].campusId === campus.id){
            studentsList.push(students[i])
        }
    }
    return (
        <div className='container'>
            <div className='inner-container'>
                <img src={student.imageUrl}/>
                <p>{student.firstName} {student.lastName}</p>
                <h3>GPA: {student.gpa}</h3>
                <Link to={`/students/${student.id}/edit`} className='btnEdit'>edit</Link>
                <button onClick={()=> destroy(student)} className='btnDel'>delete</button>
            </div>
            <div>
                <h2>This student is registered to a campus</h2>
                <img src={campus.imageUrl}/>
                <p>{campus.name}</p>
                <h3>{studentsList.length} students</h3>
                <Link to={`/campuses/${campus.id}/edit`} className='btnEdit'>edit</Link>
                <select>
                    <option> Select campus...</option>
                        {
                            campuses.map(campus => {
                                return(<option key={campus.id}>{campus.name}</option>)
                            })
                        }
                </select>
                <Link to={`/campuses/${campus.id}/edit`} className='btnAdd'>change campus</Link>
            </div>
        </div>
    )
}

export default connect(
    (state, otherProps) => {
        const id = otherProps.match.params.id*1 ;
        const student = state.students.find(student => student.id === id ) ;
        const campus = state.campuses.find(campus => student.campusId === campus.id);
        return {
            student,
            students: state.students,
            campus,
            campuses: state.campuses,
            id
        };
    },
    (dispatch, {history}) =>{
        return{
            destroy: (student) => dispatch(deleteStudent(student, {history}))
        }
    }
)(Student)