import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; 
import MainHeader from '../Common/mainHeader';

const SignUp = () => { 
    const [firstname, setFirstName] = useState();
    const [lastname, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('',(firstname,lastname,email,password))
        .then(result => console.log(result))
        .catch(err => console.log(err))
    };

    return (
        <div>
        <div className="signup-bg">
        <MainHeader/>
            <div className="signup-wrapper">
                <h2 className='signUp-title'>Create an Account for Samson Cricket</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className='names-align'>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="firstname" 
                            value={firstname} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="First Name" 
                            required 
                            className="input-field-first"
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="lastname" 
                            value={lastname} 
                            onChange={(e) => setLastName(e.target.value)}  
                            placeholder="Last Name" 
                            required 
                            className="input-field-last"
                        />
                    </div>
                    </div>
                    <div className="input-group">
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  
                            placeholder="Email" 
                            required 
                            className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            required 
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <div className="signIn-text">
                <p>Already have an Account?</p>
                <a href='/signIn'>Sign In</a>
                </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default SignUp;