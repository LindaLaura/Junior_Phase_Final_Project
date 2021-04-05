import { combineReducers, createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger'
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
import axios from 'axios';
import thunk from 'redux-thunk';


const campusesReducer = (state = [], action) =>{
    if(action.type === LOAD_CAMPUSES){
        state =  action.campuses
    }
    if(action.type === CREATE_CAMPUS){
        state = [...state, action.campus]
    }
    if(action.type === DELETE_CAMPUS){
        state = state.filter(campus => campus.id !== action.campus.id);
    }
    if(action.type === UPDATE_CAMPUS){
        state = state.map(campus => campus.id !== action.campus.id ? campus : action.campus);
    }
    return state;
}
const studentsReducer = (state = [], action) =>{
    if(action.type === LOAD_STUDENTS){
        state =  action.students
    }
    if(action.type === CREATE_STUDENT){
        state = [...state, action.student]
    }
    if(action.type === DELETE_STUDENT){
        state = state.filter(student => student.id !== action.student.id);
    }
    if(action.type === UPDATE_STUDENT){
        state = state.map(student => student.id !== action.student.id ? student : action.student);
    }
    return state;
}


const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer
});


const store = createStore(reducer, applyMiddleware(thunk, logger));

const _loadStudents = (students) =>{
    return {
        type: LOAD_STUDENTS,
        students
    };
}

const _loadCampuses = (campuses) =>{
    return {
        type: LOAD_CAMPUSES,
        campuses
    };
}

const loadCampuses = ()=>{
 return async (dispatch)=>{
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_loadCampuses(campuses));
 }
}

const loadStudents = ()=>{
    return async (dispatch)=>{
        const students = (await axios.get('/api/students')).data;
       dispatch(_loadStudents(students));
    }
}

const _createCampus = (campus) =>{
    return{
        type: CREATE_CAMPUS,
        campus
    }
}

const createCampus = ({name, address}, {history}) =>{
    return async (dispatch) =>{
        const res = await axios.post('/api/campuses', {name, address});
        console.log(res)
        const campus = res.data;
        dispatch(_createCampus(campus));
        history.push(`/campuses/${campus.id}`)
    }
}

const _createStudent = (student) =>{
    return{
        type: CREATE_STUDENT,
        student
    }
}

const createStudent = ({firstName, lastName, email}, {history}) =>{
    return async (dispatch) =>{
        const res = await axios.post('/api/students', {firstName, lastName, email});
        const student = res.data;
        dispatch(_createStudent(student));
        history.push(`/students/${student.id}`)
    }
}


const _deleteCampus = (campus) =>{
    return{
        type: DELETE_CAMPUS,
        campus
    }
}

const deleteCampus = (campus, {history}) =>{
    return async (dispatch) =>{
        await axios.delete(`/api/campuses/${campus.id}`);
        dispatch(_deleteCampus(campus));
        history.push('/campuses')
    }
}

const _deleteStudent = (student) =>{
    return{
        type: DELETE_STUDENT,
        student
    }
}

const deleteStudent = (student, {history}) =>{
    return async (dispatch) =>{
        await axios.delete(`/api/students/${student.id}`);
        dispatch(_deleteStudent(student));
        history.push('/students')
    }
}

const _updateCampus = (campus) =>{
    return{
        type: UPDATE_CAMPUS,
        campus
    }
}

const updateCampus = ({id, name, address, imageUrl, description}, {history}) =>{
    //console.log('the id is;' , id)
    return async (dispatch) =>{
        const res = await axios.put(`/api/campuses/${id}`, {id, name, address, imageUrl, description}) ;
        const campus = res.data;
        dispatch(_updateCampus(campus));
        history.push('/campuses')
    }
}

const _updateStudent = (student) =>{
    return{
        type: UPDATE_STUDENT,
        student
    }
}

const updateStudent = ({id, name, GPA, imageUrl}, {history}) =>{
    //console.log('the id is;' , id)
    return async (dispatch) =>{
        const res = await axios.put(`/api/students/${id}`, { name, GPA, imageUrl}) ;
        const student = res.data;
        dispatch(_updateStudent(student));
        history.push('/students')
    }
}

export default store;
export { loadStudents , loadCampuses, createCampus, deleteCampus, updateCampus, createStudent, deleteStudent, updateStudent};