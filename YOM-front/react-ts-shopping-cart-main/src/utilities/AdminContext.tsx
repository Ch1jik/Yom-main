import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextProps {
  adminId: string | null;
  setAdminId: React.Dispatch<React.SetStateAction<string | null>>;
  adminRole: string | null;
  setAdminRole: React.Dispatch<React.SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const initialAdminId = sessionStorage.getItem('adminId');
  const [adminId, setAdminId] = useState<string | null>(initialAdminId);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    if (adminRole) {
      sessionStorage.setItem('adminRole', adminRole);
    } 
  }, [adminRole]);

  return (
    <AdminContext.Provider 
      value={{ 
        adminId, 
        setAdminId,
        adminRole, 
        setAdminRole,
        refreshToken, 
        setRefreshToken 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useadmin must be used within a adminProvider');
  }
  return context;
};
