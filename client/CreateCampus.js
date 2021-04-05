import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createCampus} from './store'


class CreateCampus extends Component{
    constructor(){
        super();
        this.state ={
            name: '',
            address: '',
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
        const {name, address, error} = this.state;
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
                        <label> Campus Address </label>
                        <input name ='address' value={address} onChange ={onChange}/>
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
        return{
            create: ({name, address})=> dispatch(createCampus({name, address}, {history}))
        }
    }
    )(CreateCampus)