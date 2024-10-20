import React, { createContext, useContext, useState } from 'react';

// Define the structure of the context
interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
  logout: () => void; // Add logout function to the context type
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('');

  // Logout function to clear the username
  const logout = () => {
    setUsername(''); // Reset username on logout
  };

  return (
    <UserContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
