import { combineReducers, createStore } from 'redux';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const SET_VIEW = 'SET_VIEW';


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
const viewReducer = (state = 'campuses', action) =>{
    if(action.type === SET_VIEW){
        state =  action.view
    }
    return state;
}

const reducer = combineReducers({
    campuses: campusesReducer,
    students: studentsReducer,
    view: viewReducer
});


const store = createStore(reducer);

const loadStudents = (students) =>{
    return {
        type: LOAD_STUDENTS,
        students
    };
}

const loadCampuses = (campuses) =>{
    return {
        type: LOAD_CAMPUSES,
        campuses
    };
}
const setView = (view) =>{
    return {
        type: SET_VIEW,
        view
    };
}



export default store;
export { loadStudents , loadCampuses, setView};