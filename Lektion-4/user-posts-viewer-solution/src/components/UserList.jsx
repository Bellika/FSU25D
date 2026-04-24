import React from 'react';

/**
 * UserList Component
 * - Tar emot users array via props
 * - Tar emot onUserSelect callback via props
 * - Tar emot selectedUserId för att highlighta vald användare
 * - Renderar en lista med användare
 * - Varje användare kan klickas för att visa deras inlägg
 */

function UserList({ users, onUserSelect, selectedUserId }) {
    return (
        <ul className="user-list">
            {users.map(user => (
                <li
                    key={user.id}
                    className={selectedUserId === user.id ? 'user-item selected' : 'user-item'}
                    onClick={() => onUserSelect(user.id)}
                >
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-company">{user.company.name}</div>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
