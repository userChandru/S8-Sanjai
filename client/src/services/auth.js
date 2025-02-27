import { jwtDecode } from 'jwt-decode';

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    const token = getAuthToken();
    if (!token) return false;
    
    try {
        const decoded = jwtDecode(token);
        return decoded.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
};

export const handleGoogleLogin = async (response) => {
    try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential: response.credential })
        });
        
        const data = await result.json();
        if (data.token) {
            setAuthToken(data.token);
            return data;
        }
        throw new Error(data.message || 'Login failed');
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
};

export const logout = () => {
    setAuthToken(null);
};