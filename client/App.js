import React, {Component} from 'react';
import { connect } from 'react-redux';
import Students from './Students';
import Campuses from './Campuses';
import Nav from './Nav'
import { loadCampuses, loadStudents} from './store';
import Campus from './Campus';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home'
import Student from './Student'
import CreateCampus from './CreateCampus'
import Header from './Header'
import EditCampus from './EditCampus'
import CreateStudent from './CreateStudent'
import EditStudent from './EditStudent'




class App extends Component{

    componentDidMount(){
        this.props.load();
    }


    render(){
        return (
            <Router>
                <div>
                    <Route component={Nav} />
                    <Route component={Header} />
                    <Route component={Home} path='/' exact/>
                    <Route component={Campuses}  path='/campuses' exact/> 
                    <Switch>
                        <Route component={CreateCampus}  path='/campuses/create' exact/>
                        <Route component={Campus}  path='/campuses/:id' exact/>
                    </Switch>
                    <Route component={EditCampus} path='/campuses/:id/edit'/>
                    <Route component={Students}  path='/students' exact/> 
                    <Switch>
                        <Route component={CreateStudent}  path='/students/create' exact/>
                        <Route component={Student}  path='/students/:id' exact/> 
                    </Switch>
                    <Route component={EditStudent} path='/students/:id/edit'/> 
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
