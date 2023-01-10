import React from 'react'

const LoginPage = () => {
    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1 className='login-title'>LOGIN</h1>
                <div className='login-btn-container'>
                    <button className='google-button'>Sign in With Google</button>
                    <button className='github-button'>Sign in With GitHub</button>
                </div>
            </div>
        </div >
    )
}

export default LoginPage