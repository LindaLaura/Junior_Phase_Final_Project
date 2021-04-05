import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateCampus} from './store'


class EditCampus extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: this.props.campus.id ? this.props.campus.name : '',
            address: this.props.campus.id ? this.props.campus.address : '',
            imageUrl: this.props.campus.id ? this.props.campus.imageUrl : '',
            description: this.props.campus.id ? this.props.campus.description : '',
            error: ''
        }
        this.onChange =this.onChange.bind(this);
        this.onSave =this.onSave.bind(this);
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        change[ev.target.address] = ev.target.value;
        this.setState(change);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.campus.id && this.props.campus.id){
            this.setState({
                name: this.props.campus.name,
                address: this.props.campus.address,
                imageUrl: this.props.campus.imageUrl,
                description: this.props.campus.description
            })
        }
    }

    async onSave(ev){
        ev.preventDefault();
        console.log(this.props.campus.id)
        try{
            await this.props.update({
                id: this.props.campus.id, 
                name: this.props.campus.name, 
                address: this.props.campus.address, 
                imageUrl: this.props.campus.imageUrl, 
                description: this.props.campus.description
            })
        }
        catch(ex){
            console.log(ex)
            this.setState({error: ex.response.data.error})
        }

    }
    render(){
        const {name, address, imageUrl, description,error} = this.state;
        const {onChange, onSave} = this;
        return(
            <form onSubmit={onSave}>
                <pre>
                    {
                        !!error && JSON.stringify(error, null, 2)
                    }
                </pre>
                <ul className='form-container'>
                    <li>
                        <label> Campus Name </label>
                        <input name ='name' value={name} onChange ={onChange}/>
                    </li>
                    <li>
                        <label> Campus Location </label>
                        <input name ='address' value={address} onChange ={onChange}/>
                    </li>
                    <li>
                        <label> Campus Image URL </label>
                        <input name ='imageUrl' value={imageUrl} onChange ={onChange}/>
                    </li>
                    <li>
                        <label >Campus Description</label>
                        <textarea rows='10'name='description' value={description} onChange ={onChange} ></textarea>
                    </li>
                    <li>
                        <button >Save Changes</button>
                    </li>
                </ul>
                <div>
                    <h2>Students on Campus</h2>
                    <select>
                        <option> Select student...</option>
                            {
                                this.props.students.map(student => {
                                    return(<option key={student.id}>{student.firstName} {student.lastName}</option>)
                                })
                            }
                   </select>
                   <div className='container'>
                       {
                           this.props.studentsOnCampus.map(student =>{
                               return(
                                   <div className='inner-container' key={student.id}>
                                        <img src={student.imageUrl}/>
                                        <p>{student.firstName} {student.lastName}</p>
                                        <button onClick={()=> destroy(student)} className='btnDel'>Remove </button>
                                    </div>
                               )
                           })
                       }
                   </div>
                </div>
            </form>
        )
    }
}

export default connect(
    (state, otherProps) => {
        const campus = state.campuses.find(campus => campus.id === otherProps.match.params.id*1 ) || {};
        const studentsOnCampus = state.students.filter(student => campus.id === student.campusId)
        return {
            campus,
            students: state.students,
            studentsOnCampus
        };
    },
    (dispatch, {history})=>{
        return{
            update: ({id, name, address, imageUrl, description})=> dispatch(updateCampus({id, name, address, imageUrl, description}, {history}))
        }
    }
    )(EditCampus)