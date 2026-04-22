import React from 'react';

/**
 * UserList Component
 *
 * TODO:
 * 1. Ta emot users, onUserSelect och selectedUserId via props
 * 2. Rendera en <ul> med className="user-list"
 * 3. Använd .map() för att loopa genom users
 * 4. För varje user, rendera en <li> med:
 *    - key={user.id}
 *    - className: 'user-item' eller 'user-item selected' om selectedUserId === user.id
 *    - onClick={() => onUserSelect(user.id)}
 * 5. Inuti <li>, visa:
 *    - <div className="user-name">{user.name}</div>
 *    - <div className="user-email">{user.email}</div>
 *    - <div className="user-company">{user.company.name}</div>
 */

function UserList({ users, onUserSelect, selectedUserId }) {
    // TODO: Implementera komponenten
    return (
        <ul className="user-list">
            <li>TODO: Implementera UserList enligt instruktionerna ovan</li>
        </ul>
    );
}

export default UserList;
