import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const initialUserId = sessionStorage.getItem('userId');
  const [userId, setUserId] = useState<string | null>(initialUserId);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem('userId', userId);
    } else {
      sessionStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider 
      value={{ 
        userId, 
        setUserId,
        userRole, 
        setUserRole,
        refreshToken, 
        setRefreshToken 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
