import React, { useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export function usePopMsg() {
    return useContext(PopMsgContext);
}

const PopMsgContext = React.createContext();

export function PopMsgProvider({ children }) {
    const [popMsg, setPopMsg] = useState();

    const handleClose = () => {
        setPopMsg(false);
    };

    return (
        <PopMsgContext.Provider value={{ setPopMsg }}>
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    severity="success"
                    open={popMsg}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success" variant="filled">
                        {popMsg}
                    </Alert>
                </Snackbar>
            </div>
            {children}
        </PopMsgContext.Provider>
    );
};