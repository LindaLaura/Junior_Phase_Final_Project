import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteCampus} from './store'

const Campus = ({campus, students, id, destroy}) =>{
    //console.log({campus})
    const studentsList = [];
    for(let i=0; i<students.length; i++){
        if (students[i].campusId === id){
            studentsList.push(students[i])
        }
    }
    console.log(studentsList);
    if(!campus){
        return null;
    }
    if(studentsList.length === 0){
        return(
            <div className='container'>
                <div className='inner-container'>
                    <img src={campus.imageUrl}/>
                    <h2>{campus.name}</h2>
                    <p>{campus.description}</p>
                    <p>{campus.address}</p>
                    <Link to={`/campuses/${campus.id}/edit`}>edit</Link>
                    <button onClick={()=> destroy(campus)}>delete</button>
                </div>
                <div>
                    <h2> Students on campus</h2>
                    <h3> The are no students currently registered to this campus</h3>
                    <button className='btnDel' onClick={()=> destroy(campus)}>delete</button>
                </div>
            </div>
        )
    }
    return(
        <div className='container'>
            <div className='inner-container'>
                <img src={campus.imageUrl}/>
                <h2>{campus.name}</h2>
                <p>{campus.description} </p>
                <p> {campus.address}</p>
                <Link to={`/campuses/${campus.id}/edit`} className='btnEdit'>edit</Link>
                <button className='btnDel' onClick={()=> destroy(campus)}>delete</button>
            </div>
            <div>
                <h2> Students on campus</h2>
                <Link to={'/students/create'} className='btnAdd'> add student </Link>
            </div>
            <div>
                {
                    studentsList.map(student =>{
                        return(
                            <div  key={student.id}>
                                <img src={student.imageUrl} />
                                <p>{student.firstName} {student.lastName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default connect(
    (state, otherProps) => {
        //console.log(state)
        const id = otherProps.match.params.id*1;
        const campus = state.campuses.find(campus => campus.id === id ) ;
        return {
            campus,
            students: state.students,
            id
        };
    },
    (dispatch, {history}) =>{
        return{
            destroy: (campus) => dispatch(deleteCampus(campus, {history}))
        }
    }
)(Campus)
