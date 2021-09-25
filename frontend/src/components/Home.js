import React, { useState } from 'react';
import { Link } from '@reach/router';
import { Alert, Box, TextField } from '@mui/material';
import useRedirects from '../hooks/useRedirets';

const Home = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    let { redirects, loading, addRedirect } = useRedirects();

    async function handleSubmitUrl(e) {

        if (e.keyCode === 13) {
            let url = e.target.value;
            let { errorMsg, successMsg } = await addRedirect(url);
            if (successMsg) {
                e.target.value = '';
            }
            setSuccessMsg(successMsg);
            setErrorMsg(errorMsg);
        }
    }

    return (
        <div className="container">
            <Box sx={{ p: 2, bgcolor: '#2672AE' }}>
                <h3 style={{ color: '#fff' }}>Add new URL</h3>
                {successMsg && <Alert severity="success" variant="filled">{successMsg}</Alert>}
                {errorMsg && <Alert severity="error" variant="filled">{errorMsg}</Alert>}
                <p style={{ backgroundColor: "#fff", padding: '10px' }}>
                    <TextField onKeyUp={handleSubmitUrl} fullWidth label="Paste URL" variant="standard" />
                </p>
            </Box>
            <Box sx={{ p: 1, bgcolor: '#25A356' }}>
                <h5 style={{ color: '#fff' }}>
                    Yoir new shorten URL is: &nbsp;
                    <Link to="https://www.google.com/" style={{ color: '#fff' }}>
                        https://www.google.com/
                    </Link>
                </h5>
            </Box>
            <h2>Your URL List</h2>

            {redirects && redirects.map((redirect) => {
                return <Box sx={{ p: 1, bgcolor: '#E2731F' }} key={redirect.hash}>
                    <h3 style={{ color: '#fff', margin: '0' }}>
                        <Link to={redirect.hash} style={{ color: '#fff' }}>
                            {redirect.hash}
                        </Link>
                    </h3>
                    <span style={{ color: '#fff' }}>{redirect.destination}</span>
                </Box>
            })}

            {!redirects && <Box sx={{ p: 2, bgcolor: '#EAEAEA' }}>
                <h3 className="text-center">Could not find anything yet!</h3>
            </Box>}
        </div>
    );
};

export default Home;