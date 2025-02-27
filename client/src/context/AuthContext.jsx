import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        _id: '67bc31183d7caf05bb345ca4',
        email: 'sanjaigovindraj@gmail.com',
        name: 'Sanjai',
        businesses: ['67bc311c3d7caf05bb345cfd']
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}; 