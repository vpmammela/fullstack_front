import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext<{ user: string | null, setUser: React.Dispatch<React.SetStateAction<string | null>> }>({
  user: null,
  setUser: () => null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);