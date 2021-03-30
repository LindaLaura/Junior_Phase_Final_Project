import { combineReducers, createStore, applyMiddleware } from 'redux';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
import axios from 'axios';
import thunk from 'redux-thunk'


const campusesReducer = (state = [], action) =>{
    if(action.type === LOAD_CAMPUSES){
        state =  action.campuses
    }
    return state;
}
const studentsReducer = (state = [], action) =>{
    if(action.type === LOAD_STUDENTS){
        state =  action.students
    }
    return state;
}


const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer
});


const store = createStore(reducer, applyMiddleware(thunk));

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


export default store;
export { loadStudents , loadCampuses};