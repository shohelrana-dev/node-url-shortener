import { useState, useEffect } from "react";
import axios from "axios";
import apiEndpoints from "../api-endpoints";
import { useAuth } from "../contexts/AuthContext";
import _pr from "../promiseResolver";

function useRedirects() {
    //states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [redirects, setRedirects] = useState([]);

    const { authToken } = useAuth();

    async function fetchRedirects() {
        let [resError, resData] = await _pr(axios.get(apiEndpoints.redirects, {
            headers: { "auth-token": authToken }
        }));
        if (resData && !resError) {
            let _redirects = resData?.data || [];
            setRedirects(_redirects);
            setLoading(false);
        } else {
            setLoading(false);
            setError(resError);
        }
    }

    useEffect(function () {
        fetchRedirects();
    }, []);

    async function addRedirect(url) {
        let [resError, resData] = await _pr(axios({
            url: apiEndpoints.redirects,
            method: 'post',
            data: { url },
            headers: { "auth-token": authToken }
        }));
        if (resData && !resError) {
            fetchRedirects();
        }
        let errors = resError?.response?.data?.errors || {};
        let success = resData?.data?.success || null;
        let successMsg = resData?.data?.message || null;
        let direction = resData?.data?.direction || {};

        return { errors, success, successMsg, direction };
    }

    return { loading, error, redirects, addRedirect };

}

export default useRedirects;