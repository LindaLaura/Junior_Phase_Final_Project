import React from 'react';
import {connect} from 'react-redux'


const Student = ({campuses, students, match: {params: {id}}})=>{
    id = id*1;
    const student = students.find(student => student.id === id);
    const campus = campuses.find(campus => student.campusId === campus.id);
    //console.log(campus);
    const studentsList = [];
    for(let i=0; i<students.length; i++){
        if (students[i].campusId === campus.id){
            studentsList.push(students[i])
        }
    }
    if(!student){
        return null;
    }
    if(campus.length === 0){
        return(
            <div>            
                <div>
                    <img src={student.imageUrl}/>
                    <p>{student.firstName} {student.lastName}</p>
                    <h3>GPA: {student.gpa}</h3>
                    <button>edit</button>
                    <button>delete</button>
                </div>
                <div>
                    <h2>This student is not registered to a campus</h2>
                    {/* <button></button> selection of campus*/}
                    <button className='btnAdd'>change campus</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <img src={student.imageUrl}/>
                <p>{student.firstName} {student.lastName}</p>
                <h3>GPA: {student.gpa}</h3>
                <button>edit</button>
                <button>delete</button>
            </div>
            <div>
                <h2>This student is registered to a campus</h2>
                <img src={campus.imageUrl}/>
                <p>{campus.name}</p>
                <h3>{studentsList.length} students</h3>
                {/* <button></button> selection of campus*/}
                <button className='btnAdd'>change campus</button>
            </div>
        </div>
    )
}

export default connect(state => state)(Student)