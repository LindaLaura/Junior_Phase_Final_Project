import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Students from './Students';
import Campuses from './Campuses';
import Nav from './Nav'
import { loadCampuses, loadStudents, setView } from './store';



class App extends Component{

    componentDidMount(){
        this.props.load();
        window.addEventListener('hashchange', ()=>{
            this.props.setView(window.location.hash.slice(1));
        });
        this.props.setView(window.location.hash.slice(1));
    }

    render(){
        const {students, campuses, view} = this.props;

        return (
            <div>
                <Nav />
                <div className='sub-container'>
                    <h2> All Campuses </h2>
                    <button>Add Campus</button>
                </div>
                { view ==='' && <Campuses campuses={campuses} /> }
                { view ==='campuses' && <Campuses campuses={campuses} /> }
                { view ==='students' && <Students students={students} /> }
            </div>
        )
    }
}
const mapState = (state)=>{
    return state;
}

const mapDispatch = (dispatch)=>{
    return{
        load: async () =>{
            const campuses = (await axios.get('/api/campuses')).data;
            const students = (await axios.get('/api/students')).data;
            dispatch(loadStudents(students));
            dispatch(loadCampuses(campuses));
        },
        setView: function(view){
            dispatch(setView(view))
        }
    }
}

export default connect(mapState, mapDispatch)(App);
