import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [prevPath, setPrevPath] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        if ((!user) || prevPath === '/login' && currentPath === '/dashboard') {
            const fetchUser = async () => {
                try {
                    const { data } = await axios.get('/profile');
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchUser();
        }
        setPrevPath(currentPath);
    }, [location, prevPath, user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}