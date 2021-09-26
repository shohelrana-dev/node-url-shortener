import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(null);

    const { signup } = useAuth();

    async function submitForm(e) {
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;

        let { errors, success, successMsg } = await signup(name, email, password);

        if (success) {
            e.target.name.value = '';
            e.target.email.value = '';
            e.target.password.value = '';
            setSuccessMsg(successMsg);
            setErrors({});
        } else {
            setSuccessMsg(null);
            setErrors(errors);
        }
    }

    let { name, email, password, common } = errors;

    return (
        <div className="container">
            <div style={{ maxWidth: '350px', margin: 'auto', paddingTop: '60px' }}>
                <h1 className="text-center">Signup</h1>
                <form onSubmit={submitForm} className="form">
                    {successMsg && <Alert severity="success" variant="filled">{successMsg}</Alert>}
                    {common?.msg && <Alert severity="error" variant="filled">{common.msg}</Alert>}
                    <div className="form__field">
                        <TextField label="Name" variant="outlined" type="text" name="name" fullWidth />
                        {name && <p className="error">{name.msg}</p>}
                    </div>
                    <div className="form__field">
                        <TextField fullWidth label="Email" variant="outlined" type="text" name="email" />
                        {email && <p className="error">{email.msg}</p>}
                    </div>
                    <div className="form__field">
                        <TextField fullWidth label="Password" variant="outlined" type="text" name="password" />
                        {password && <p className="error">{password.msg}</p>}
                    </div>
                    <Button variant="contained" type="submit" fullWidth>Signup</Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;