import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Login(props) {
    const [credentials, setCredentials] = useState({})
    const [message, setMessage] = useState('')
    const router = useRouter()
    const handleLoginChange = (e) => {
        // Stores user input in credentials state
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    };
    const handleLoginButton = () => {
        // Validation here, but complete validation done on server side
        if (credentials.username === '') {
            setMessage("You must enter a username")
        } else if (credentials.password === '') {
            setMessage("You must enter a password")
        } else {
            //Submit credentials state to server for authentication
            fetch('https://polar-dawn-36653.herokuapp.com/api/login', {
                method: 'POST',
                origin: '*',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }).then(response => response.json())
                // If authenticated, server responds with success == true
                .then(result => {
                    if (result.success == true) {
                        // Get token & user data and put it in local storage
                        const token = result.token;
                        localStorage.setItem('jsonwebtoken', token)
                        localStorage.setItem('user_Id', result.user_id)
                        localStorage.setItem('name', result.name)
                        localStorage.setItem('high_score', result.high_score)
                        // Route user to their profile page
                        router.push('profile')
                    }
                    // Display error message sent from server if success != true
                    else {
                        setMessage(result.message)
                    }
                })
        }
    };
    // Clears error message off screen
    const remove = function () {
        setMessage("")
    };

    return (
        // Render Display
        <div className='login column'>
            <div className="login-title">
                <Image className="logo" src="/images/logo-full.webp" alt="Logo" height={100} width={250} quality={100} priority='true' />
            </div>
            <div className="login-Container column">
                <input className="log-RegText" type="text" name="username" onChange={handleLoginChange} placeholder="User name" />
                <input className="log-RegText" type="password" name="password" onChange={handleLoginChange} placeholder="Password" />
                {message && <div id="message" className="message">
                    <p  >{message}</p>
                    <Image className='m-img' src='/images/warning-wiz.webp' alt="Wizard" layout='responsive' height={75} width={60} priority/>
                    <button onClick={remove}>Ok</button>
                </div>}
                <div className="btn log-btn" onClick={handleLoginButton}>Login</div>
                <div href="/register" className="btn log-btn">Register</div>
            </div>
            <div className="icon-container">
                <a id="google-btn" className="passport-btn" href="https://polar-dawn-36653.herokuapp.com/auth/google">
                    <Image src='/icons/google.webp' alt="Login With Google" height={40} width={40} />
                    <div className='btn-text'>Login With Google</div>
                </a>
                <a id="facebook-btn" className="passport-btn" href="https://polar-dawn-36653.herokuapp.com/auth/facebook">
                    <Image src='/icons/facebook.webp' alt="Login With Facebook" height={40} width={40} />
                    <div className='btn-text'>Login With Facebook</div>
                </a>
                <a id="github-btn" className="passport-btn github" href="https://polar-dawn-36653.herokuapp.com/auth/github">
                    <Image src='/icons/github.webp' alt="Login With Github" height={40} width={47} quality={100} />
                    <div className='btn-text'>Login With Github</div>
                </a>
            </div>
        </div>
    )
};

export default Login