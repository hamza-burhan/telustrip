import { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [confirm, setConfirm] = useState(null);

    return (
        <DataContext.Provider value={{ confirm, setConfirm }}>
            {children}
        </DataContext.Provider>
    );
}

export function useDataContext() {
    return useContext(DataContext);
}
