import React, { useState } from 'react';
import Contact from './Contact';

/**
 * Part 1: Generate Contact List (See Lists and keys lecture)
 * - Create a function component here, may call it 'PhoneBook'
 * - generats a list <ul> from the contacts array below, with the array-method .map()
 * - Place the code for contact item <li>, into a new child (function) component, may call it 'Contact'
 * - Add a key to every contact item <li>
 *
 * Part 2: Favorite Contact Feature (See Conditional Rendering lecture)
 * - Begin by adding a favorite-button to each contact
 * - Create a new function 'handleFavorite' in 'PhoneBook' component
 * - The function will add a class .favorite, to the parent of the target element (e.target.parentNode)
 * - Pass down the method as a prop, to the child component 'Contact'
 * - Make sure every contact item <li> has the onClick eventhandler, that calls the method 'handleFavorite'
 * 
 * Part 3 (hard): Conditional rendering (google how to use conditions with .map() )
 * - Make business contacts has the className="business"
 * 
 * Part 4 (Extra hard. Probably need lots of googling. Not required to do this on your own ): Delete Contact Feature
 * - Begin by refactoring the contacts array to a state, using setState([...])
 * - Add a delete-button for each contact
 * - Create a new function 'deleteContact(id)' in 'PhoneBook' component, that takes the contact.id as argument
 * - The function will remove the deleted contact from the state contacts[], by using the array-method .filter().
 * - Pass down the method as a prop, to the child component 'Contact'
 * - Make sure that the delete-button on every item, has the onClick eventhandler, that calls the method 'deleteContact'
 * 
 * Part 5 (Extra hard. Not required to do this on your own): Edit Contact Feature
 * - Add an edit button for each contact
 * - When edit is clicked, transform the contact display into editable input fields
 * - Add useState hook in Contact component to manage editing state
 * - Create an updateContact function in PhoneBook component
 * - Add Save and Cancel buttons in edit mode
 * - When save is clicked, update the contact in the contacts array
 * - When cancel is clicked, revert back to display mode without saving changes
 * 
 * NOTE! Dont forget to add 'PhoneBook' to App.jsx
 */

const contacts = [
    {id: 1, name: 'John Doe', phone: '123-456-7890', type: 'personal'},
    {id: 2, name: 'Jane Smith', phone: '234-567-8901', type: 'business'},
    {id: 3, name: 'Bob Johnson', phone: '345-678-9012', type: 'personal'},
    {id: 4, name: 'Alice Brown', phone: '456-789-0123', type: 'business'},
    {id: 5, name: 'Charlie Wilson', phone: '567-890-1234', type: 'personal'}
];
