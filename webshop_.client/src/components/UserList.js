import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("http://localhost:5070/api/users")
            .then(res => {
            if (!res.ok)
                throw new Error("Hálózati hiba történt!");
            return res.json();
        })
            .then((data) => setUsers(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    if (loading)
        return _jsx("div", { className: "loader", children: "\uD83D\uDD04 Bet\u00F6lt\u00E9s..." });
    if (error)
        return _jsxs("div", { className: "error", children: ["\u274C ", error] });
    return (_jsxs("div", { className: "table-container", children: [_jsx("h2", { children: "\uD83D\uDC64 Felhaszn\u00E1l\u00F3k list\u00E1ja" }), _jsxs("table", { className: "user-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "N\u00E9v" }), _jsx("th", { children: "Email" }), _jsx("th", { children: "Szerep" })] }) }), _jsx("tbody", { children: users.map(user => (_jsxs("tr", { children: [_jsx("td", { children: user.id }), _jsx("td", { children: user.name }), _jsx("td", { children: user.email }), _jsx("td", { children: _jsx("span", { className: user.role === "Retailer" ? "role-retailer" : "role-customer", children: user.role }) })] }, user.id))) })] })] }));
};
export default UserList;
