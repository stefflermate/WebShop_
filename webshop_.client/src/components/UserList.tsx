import React, { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/Users/products`)
            .then(res => {
                if (!res.ok) throw new Error("Hálózati hiba történt!");
                return res.json();
            })
            .then((data: User[]) => setUsers(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="loader">🔄 Betöltés...</div>;
    if (error) return <div className="error">❌ {error}</div>;

    return (
        <div className="table-container">
            <h2>👤 Felhasználók listája</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Név</th>
                        <th>Email</th>
                        <th>Szerep</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className={user.role === "Retailer" ? "role-retailer" : "role-customer"}>
                                    {user.role}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
