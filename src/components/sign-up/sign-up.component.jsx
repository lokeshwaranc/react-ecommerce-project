import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../firebase/firebase.utils';

import './sign-up.style.scss';

class SignUp extends React.Component{
	constructor(){
		super();
		this.state={
			displayName:'',
			email:'',
			password:'',
			confirm_password:''
		}
	}

	handleSubmit = async event =>{
		event.preventDefault();
		if(this.state.password !== this.state.confirm_password){
			alert("Password doesn't match");
			return;
		}
		try{
			const user = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
			await createUserProfileDocument(user, this.state.displayName);
			this.setState({
				displayName:'',
				email:'',
				password:'',
				confirm_password:''
			});
		}
		catch(error){
			console.error(error);
		}
	}


	handleChange = (event) => {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	}


	render(){
		return(
			<div className='sign-up' >
				<h2 className='title'>
					Create an account if you don't have one
				</h2>
				<span>Enter details to create an account</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
					type='text'
					name='displayName'
					value={this.state.displayName}
					onChange={this.handleChange}
					label='Name'
					required />
					<FormInput
					type='email'
					name='email'
					value={this.state.email}
					onChange={this.handleChange}
					label='Email'
					required />
					<FormInput
					type='password'
					name='password'
					value={this.state.password}
					onChange={this.handleChange}
					label='Password'
					required />
					<FormInput
					type='password'
					name='confirm_password'
					value={this.state.confirm_password}
					onChange={this.handleChange}
					label='Confirm Password'
					required />
					<CustomButton
					type='submit'> SIGN UP </CustomButton>
				</form>
				
			</div>
		)
	}
}

export default SignUp;