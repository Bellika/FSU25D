import React, { useState } from 'react';

// function Contact(props) {
//     return (
//         <li onClick={props.handleFavorite} className={props.className}>
//             {props.contact}
//         </li>
//     )
// }

// Refactor above with destructuring props object
function Contact({ contact, handleFavorite, deleteContact, updateContact, className }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(contact.name);
    const [editedPhone, setEditedPhone] = useState(contact.phone);

    const handleSave = () => {
        updateContact(contact.id, {
            name: editedName,
            phone: editedPhone
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li className={className}>
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="edit-input"
                />
                <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="edit-input"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </li>
        );
    }

    return (
        <li className={className}>
            <span className="contact-name">{contact.name}</span>
            <span className="contact-phone">{contact.phone}</span>
            <button onClick={handleFavorite}>★</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
        </li>
    )
}

export default Contact
