import React, { useState } from 'react';
import { Alert, Box, TextField } from '@mui/material';
import useRedirects from '../hooks/useRedirets';
import Loading from './Global/Loading';
import { useAlert } from 'react-alert';

const Home = () => {
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState(null);
    const [newDirection, setNewDirection] = useState({});

    let { redirects, loading, addRedirect } = useRedirects();
    const alert = useAlert();

    async function handleSubmitUrl(e) {

        if (e.keyCode === 13) {
            let url = e.target.value;
            let { errors, success, successMsg, direction } = await addRedirect(url);
            if (success) {
                e.target.value = '';
                alert.success('URL Added', { position: 'top right' });
            }
            setSuccessMsg(successMsg);
            setErrors(errors);
            setNewDirection(direction);
        }
    }
    let { url, common } = errors;
    let homeUrl = process.env.REACT_APP_HOME_URL;
    return (
        <div className="container">
            <Box sx={{ p: 2, bgcolor: '#2672AE' }}>
                <h3 style={{ color: '#fff' }}>Add new URL</h3>
                {successMsg && <Alert severity="success" variant="filled">{successMsg}</Alert>}
                {url && <Alert severity="error" variant="filled">{url.msg}</Alert>}
                {common && <Alert severity="error" variant="filled">{common.msg}</Alert>}
                <p style={{ backgroundColor: "#fff", padding: '10px' }}>
                    <TextField onKeyUp={handleSubmitUrl} fullWidth label="Paste URL" variant="standard" />
                </p>
            </Box>
            {newDirection?.hash && <Box sx={{ p: 1, bgcolor: '#25A356' }}>
                <h5 style={{ color: '#fff' }}>
                    Your new shorten URL is: &nbsp;
                    <a rel="noreferrer" href={homeUrl + '/' + newDirection.hash} style={{ color: '#fff' }} target="_blank">
                        {homeUrl + '/' + newDirection.hash}
                    </a>
                </h5>
            </Box>}
            <h2>Your URL List</h2>

            {loading && <Loading />}

            {redirects && redirects.map((redirect) => {
                return <Box sx={{ p: 1, bgcolor: '#E2731F' }} key={redirect.hash}>
                    <h3 style={{ color: '#fff', margin: '0' }}>
                        <a rel="noreferrer" href={homeUrl + '/' + redirect.hash} style={{ color: '#fff' }} target="_blank">
                            {homeUrl + '/' + redirect.hash}
                        </a>
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