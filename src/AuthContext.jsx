// AuthContext.js
import { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState(cookies['Token'] ? true : false);
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  const login = async (email, password) => {
    try {
      const response = await fetch('/authuser', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify( {email, password} )
      });
      console.log(response.data);
      console.log(response.headers);
      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.error('Authentication failed');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`/logout`, {method : 'GET'});
    
      if(response.ok){
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
        return response.status(200).json('Logged In');
      }else{
        console.error('Error during Logout');
      }
    } catch (error) {
      console.error('Error during login:', error);
        setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
