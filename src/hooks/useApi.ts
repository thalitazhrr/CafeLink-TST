import { useLocalStorage } from '@uidotdev/usehooks';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

export const useApi = <T>(url: string, options?: AxiosRequestConfig) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const call = async (input?: any) => {
        setLoading(true);
        try {
            const response: AxiosResponse<T> = await axios(url, { ...options, data: input, params: input });
            return { data: response.data, error: null };
        } catch (err) {
            return { data: null, error: err };
        } finally {
            setLoading(false);
        }
    }

    return { loading, call };
}

export const useApiWithToken = <T>(url: string, options?: AxiosRequestConfig) => {
    const [token, ] = useLocalStorage('token', '');
    const {loading, call} = useApi<T>(url, { ...options, headers: { Authorization: `Bearer ${token}` } });
    return { loading, call };
}