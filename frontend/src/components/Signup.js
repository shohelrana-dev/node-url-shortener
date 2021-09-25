import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const { signup } = useAuth();

    async function submitForm(e) {
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;

        let { errors, errorMsg, successMsg } = await signup(name, email, password);
        console.log(errors, errorMsg, successMsg);
        if (successMsg !== null) {
            e.target.name.value = '';
            e.target.email.value = '';
            e.target.password.value = '';
            setSuccessMsg(successMsg);
            setErrorMsg(null);
            setErrors({});
        } else {
            setSuccessMsg(null);
            setErrorMsg(errorMsg);
            setErrors(errors);
        }
    }

    let { name, email, password } = errors;

    return (
        <div className="container">
            <div style={{ maxWidth: '350px', margin: 'auto', paddingTop: '60px' }}>
                <h1 className="text-center">Signup</h1>
                <form onSubmit={submitForm} className="form">
                    {successMsg && <Alert severity="success" variant="filled">{successMsg}</Alert>}
                    {errorMsg && <Alert severity="error" variant="filled">{errorMsg}</Alert>}
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