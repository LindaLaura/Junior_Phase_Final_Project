import React, {Component} from 'react';
import { connect } from 'react-redux';
import Students from './Students';
import Campuses from './Campuses';
import Nav from './Nav'
import { loadCampuses, loadStudents, setView } from './store';
import Campus from './Campus';
import {HashRouter as Router, Link, Route} from 'react-router-dom';
import Home from './Home'
import Student from './Student'
import {Link} from 'react-router-dom'




class App extends Component{

    componentDidMount(){
        this.props.load();
    }


    render(){
        return (
            <Router>
                <div>
                    <Route component={Nav} />
                    <div className='sub-container'>
                        <h2> All Campuses </h2>
                        <button className='btnAdd'><Link to='/campuses/create'>Add Campus</Link></button>
                    </div>
                    <Route component={Home} path='/' exact/>
                    <Route component={Campuses}  path='/campuses' exact/> 
                    <Route component={Campus}  path='/campuses/:id'/> 
                    <Route component={Students}  path='/students' exact/> 
                    <Route component={Student}  path='/students/:id'/> 
                </div>
            </Router>
        )
    }
}
const mapState = (state)=>{
    return state;
}

const mapDispatch = (dispatch)=>{
    return{
        load: async () =>{
            dispatch(loadStudents());
            dispatch(loadCampuses());
        }
    }
}

export default connect(mapState, mapDispatch)(App);
