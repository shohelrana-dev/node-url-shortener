import React from 'react';
import { CircularProgress } from '@mui/material';

export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100px', alignItems: 'center' }}>
            <CircularProgress />
        </div>
    );
}