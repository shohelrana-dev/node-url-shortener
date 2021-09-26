import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from 'react-alert';

const Login = () => {
    const [errors, setErrors] = useState({});

    const { login } = useAuth();
    const alert = useAlert();

    async function submitForm(e) {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        let { errors } = await login(email, password);
        if (errors?.common?.msg) {
            alert.error('Login failed', { position: 'top right' });
        }
        setErrors(errors);
    }

    let { email, password, common } = errors;
    return (
        <div className="container">
            <div style={{ maxWidth: '350px', margin: 'auto', paddingTop: '60px' }}>
                <h1 className="text-center">Login</h1>
                <form onSubmit={submitForm} className="form">
                    {common?.msg && <Alert severity="error" variant="filled">{common.msg}</Alert>}
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