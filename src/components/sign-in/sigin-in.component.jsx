import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, SignInWithGoogle} from '../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component{
	constructor(props){
		super();

		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = async event => {
		event.preventDefault();
		try{
			await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
			this.setState({email:'', password:''});
		}
		catch(error){
			console.error(error);
		}
		
		console.log(event);
		alert('username ' +this.state.email+' password ' +this.state.password);
	}

	handleChange = (event) => {
		const {value, name} = event.target;
		this.setState({[name]: value});
	}

	render(){
		return(
			<div className='sign-in'>
				<h2 className='title'>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput type='email' name='email' value={this.state.email} label= 'Email' handleChange= {this.handleChange} required/>
					<FormInput type='password' name='password' value={this.state.password} label= 'Password' handleChange= {this.handleChange} required/>
					<div className='buttons'>
						<CustomButton type='submit'> SIGN IN </CustomButton>
						<CustomButton onClick ={SignInWithGoogle} isGoogleSignIn> SIGN IN WITH GOOGLE </CustomButton>
					</div>
					
				</form>
			</div>
		)
	}
}

export default SignIn;