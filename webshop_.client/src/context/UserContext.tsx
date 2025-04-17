// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type Seller = {
    address: string;
    phoneNumber: string;
    openingHours: string;
    description?: string;
};

type UserContextType = {
    user: User | null;
    seller: Seller | null;
    setUser: (user: User | null) => void;
    setSeller: (seller: Seller | null) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    seller: null,
    setUser: () => {},
    setSeller: () => {},
});

export const useUser = () => useContext(UserContext);
export const useSeller = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [seller, setSeller] = useState<Seller | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        const storedSeller = localStorage.getItem("seller");

        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {}
        }

        if (storedSeller) {
            try {
                setSeller(JSON.parse(storedSeller));
            } catch {}
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, seller, setUser, setSeller }}>
            {children}
        </UserContext.Provider>
    );
};
