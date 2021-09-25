import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { usePopMsg } from '../contexts/PopMsgContext';

const Login = () => {
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);

    const { login } = useAuth();
    const { setPopMsg } = usePopMsg();

    async function submitForm(e) {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        let { errors, errorMsg } = await login(email, password);
        setErrors(errors);
        setErrorMsg(errorMsg);
        if (errorMsg) {
            setPopMsg(errorMsg);
        }
    }

    let { email, password } = errors;
    return (
        <div className="container">
            <div style={{ maxWidth: '350px', margin: 'auto', paddingTop: '60px' }}>
                <h1 className="text-center">Login</h1>
                <form onSubmit={submitForm} className="form">
                    {errorMsg && <Alert severity="error" variant="filled">{errorMsg}</Alert>}
                    <div className="form__field">
                        <TextField fullWidth label="Email" variant="outlined" type="text" name="email" />
                        {email && <p className="error">{email.msg}</p>}
                    </div>
                    <div className="form__field">
                        <TextField fullWidth label="Password" variant="outlined" type="text" name="password" />
                        {password && <p className="error">{password.msg}</p>}
                    </div>
                    <Button variant="contained" type="submit" fullWidth>Login</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;