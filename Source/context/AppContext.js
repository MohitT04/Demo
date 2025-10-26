import React, { createContext, useState } from 'react';

const AppContext = createContext();

const initialMemories = [
  {
    id: '1',
    category: 'About You',
    text: 'Founder of AiRA (mock)',
    date: '2025-10-20',
  },
  {
    id: '2',
    category: 'Preferences',
    text: 'Prefers concise answers',
    date: '2025-09-01',
  },
  {
    id: '3',
    category: 'Conversations',
    text: 'Discussed fundraising ideas',
    date: '2025-08-10',
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [memories, setMemories] = useState(initialMemories);

  return (
    <AppContext.Provider value={{ user, setUser, memories, setMemories }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
