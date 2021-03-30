import React from 'react';
import {connect} from 'react-redux';

const Campus = ({campuses, students, match: {params: {id}}}) =>{
    console.log(students)
    id = id*1;
    const campus = campuses.find(campus => campus.id === id);
    const studentsList = [];
    for(let i=0; i<students.length; i++){
        if (students[i].campusId === id){
            studentsList.push(students[i])
        }
    }
    //console.log(studentsList);
    if(!campus){
        return null;
    }
    if(studentsList.length === 0){
        return(
            <div>
                <div>
                    <img src={campus.imageUrl}/>
                    <h2>{campus.name}</h2>
                    <p>{campus.description}</p>
                    <p>{campus.address}</p>
                    <button>edit</button>
                    <button>delete</button>
                </div>
                <div>
                    <h2> Students on campus</h2>
                    <h3> The are no students curently registered to this campus</h3>
                    <button className='btnAdd'>add student</button>
                </div>
            </div>
        )
    }
    return(
        <div>
            <div>
                <img src={campus.imageUrl}/>
                <h2>{campus.name}</h2>
                <p>{campus.description}</p>
                <p>{campus.address}</p>
                <button>edit</button>
                <button>delete</button>
            </div>
            <div>
                <h2> Students on campus</h2>
                <button className='btnAdd'>add student</button>
            </div>
            <div>
                {
                    studentsList.map(student =>{
                        return(
                            <div key={student.id}>
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

export default connect(state => state)(Campus)