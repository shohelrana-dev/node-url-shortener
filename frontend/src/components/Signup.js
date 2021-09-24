import React, { useState } from 'react';
import axios from 'axios';
import apiEndpoints from '../api-endpoints';
import { TextField, Button } from '@mui/material';

const Signup = () => {
    const [successMsg, setSuccessMsg] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let email = e.target.email.value;
        let password = e.target.password.value;

        axios.post(apiEndpoints.signup, { name, email, password })
            .then(res => {
                e.target.name.value = '';
                e.target.email.value = '';
                e.target.password.value = '';
                setSuccessMsg(res.data?.message);
                setErrors({});
            })
            .catch(err => {
                let _errors = err?.response?.data?.errors;
                let errMsg = err?.response?.data.message;
                let newErrors = {};
                _errors && _errors.forEach((err, i) => {
                    newErrors = { ...newErrors, [err.param]: err.msg };
                });
                setSuccessMsg(false);
                setErrors(newErrors);
                if (errMsg) {
                    setErrorMsg(err?.response?.data.message)
                }
            });
    }

    return (
        <div className="container">
            <div style={{ maxWidth: '350px', margin: 'auto', paddingTop: '60px' }}>
                <h1 className="text-center">Signup</h1>
                <form
                    onSubmit={submitForm}
                    style={{ background: '#cccccc2e', padding: '25px' }}
                >
                    {successMsg && <p className="success">{successMsg}</p>}
                    {errorMsg && <p className="block-error">{errorMsg}</p>}
                    <div className="form__field">
                        <TextField label="Name" variant="outlined" type="text" name="name" fullWidth />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="form__field">
                        <TextField fullWidth label="Email" variant="outlined" type="text" name="email" />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form__field">
                        <TextField fullWidth label="Password" variant="outlined" type="text" name="password" />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <Button variant="contained" type="submit" fullWidth>Signup</Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;