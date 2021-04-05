import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateStudent} from './store'


class EditStudent extends Component{
    constructor(props){
        super(props);
        this.state ={
            firstName: this.props.student.id ? this.props.student.firstName : '',
            lastName: this.props.student.id ? this.props.student.lastName : '',
            email: this.props.student.id ? this.props.student.email : '',
            error: ''
        }
        this.onChange =this.onChange.bind(this);
        this.onSave =this.onSave.bind(this);
    }
    onChange(ev){
        const change = {};
        change[ev.target.firstName] = ev.target.value;
        change[ev.target.lastName] = ev.target.value;
        change[ev.target.email] = ev.target.value;
        this.setState(change);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.student.id && this.props.student.id){
            this.setState({
                firstName: this.props.student.firstName,
                lastName: this.props.student.lastName,
                email: this.props.student.email
            })
        }
    }

    async onSave(ev){
        ev.preventDefault();
        try{
            await this.props.update({
                id: this.props.student.id, 
                firstName: this.props.student.firstName, 
                lastName: this.props.student.lastName, 
                email: this.props.student.email
            })
        }
        catch(ex){
            console.log(ex)
            this.setState({error: ex.response.data.error})
        }

    }
    render(){
        const {firstName, lastName, email, error} = this.state;
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
                        <label> FirstName </label>
                        <input name ='firstName' value={firstName} onChange ={onChange}/>
                    </li>
                    <li>
                        <label> LastName </label>
                        <input name ='lastName' value={lastName} onChange ={onChange}/>
                    </li>
                    <li>
                        <label> Email </label>
                        <input name ='email' value={email} onChange ={onChange}/>
                    </li>
                    <li>
                        <button >Save Changes</button>
                    </li>
                </ul>
                <h2>Students on Campus</h2>
            </form>
        )
    }
}

export default connect(
    (state, otherProps) => {
        const student = state.students.find(student => student.id === otherProps.match.params.id*1 ) || {};
        return {
            student
        };
    },
    (dispatch, {history})=>{
        return{
            update: ({id, firstName, lastName, email})=> dispatch(updateStudent({id, firstName, lastName, email}, {history}))
        }
    }
    )(EditStudent)