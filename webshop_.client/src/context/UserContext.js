import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext({
    user: null,
    setUser: () => { },
});
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            }
            catch { }
        }
    }, []);
    return (_jsx(UserContext.Provider, { value: { user, setUser }, children: children }));
};
