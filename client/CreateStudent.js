import React, {Component} from 'react'
import { connect } from 'react-redux';
import {createStudent} from './store'


class CreateStudent extends Component{
    constructor(){
        super();
        this.state ={
            firstName: '',
            lastName: '',
            email:'',
            error: ''
        }
        this.onChange =this.onChange.bind(this);
        this.onSave =this.onSave.bind(this);
    }
    onChange(ev){
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }
    async onSave(ev){
        ev.preventDefault();
        try{
            await this.props.create(this.state)
        }
        catch(ex){
            this.setState({error: ex.response.data.error})
        }

    }
    render(){
        const {firstName, lastName, email, error} = this.state;
        const {onChange, onSave} = this;
        console.log(this.state)
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
                        <button >Save</button>
                    </li>
                </ul>
            </form>
        )
    }
}

export default connect(
    null,
    (dispatch, {history})=>{
       // console.log(history)
        return{
            create: ({firstName, lastName, email })=> dispatch(createStudent({firstName, lastName, email }, {history}))
        }
    }
    )(CreateStudent)