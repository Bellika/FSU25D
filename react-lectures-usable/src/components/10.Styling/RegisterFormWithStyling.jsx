import React, { useState } from 'react'

/** 
 * 
 * CSS modules vs Regular CSS
 * 
 * CSS modules have local scope. 
 * Same class name declarations in different CSS modules are ultimately different classes.
 * The benefits is that you avoid conflicts between selectors with different styles.
 * 
 * This will be apperent when we copy 'formStyle.css' and 'formStyle.module.css'
 * into previous lecture and display the components together.
 * The classes from the CSS modules will not conflict eachother
 * 
 */

import './formStyle.css'                        // Import regular stylesheet
import formStyle from './formStyle.module.css'  // Import CSS module

function RegisterFormWithStyling() {
    const [user, setUser] = useState({
        firstname: 'First',
        lastname: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        comment: 'Comment',
        country: 'FI'
    })

    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUser({
            ...user,
            [fieldName]: value 
        });

        console.log(fieldName, value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(`Form was successfully submitted. Well done ${user.firstname} ${user.lastname}`); 
    }
    

    /**
     * Examples on 3 ways of implementing CSS
     * 1. Stylesheets
     * 2. Inline
     * 3. CSS modules
     * 
     * There is also a 4:th way of implementing CSS, with JS libraries such as "styled component"
     * 
     */
    
    // Online styling object
    const warningMessageStyle = {
        backgroundColor: 'beige',
        border: '1px double orange',
        padding: '10px',
        borderRadius: '5px'
    }
    
    return (
        <div id="register-form-wrapper">
            <h1>Register here with Style!</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="messages">
                    {/* inline styling */}
                    <p style={warningMessageStyle}>Warning message (with inline style)</p>
                    {/* class "success" from regular stylesheet */}
                    <p className="success">Success message (with regular linked stylesheet)</p>
                    {/* class "error" from CSS module */}
                    <p className={formStyle.error}>Error message example (with CSS module)</p>
                </div>

                <label>First name</label>
                <input type="text" name="firstname" value={user.firstname} onChange={handleInputChange} />

                <label>Last name</label>
                <input type="text" name="lastname" value={user.lastname} onChange={handleInputChange} />

                <label>Email</label>
                <input type="email" name="email" value={user.email} onChange={handleInputChange} />

                <label>Password</label>
                <input type="password" name="password" value={user.password} onChange={handleInputChange} />

                <label>Age</label>
                <input type="number" name="age" value={user.age} onChange={handleInputChange} />

                <div className="form-row">
                    <label>Gender</label><br />
                    <input type="radio" id="male" name="gender" value="male" onChange={handleInputChange}/>
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" value="female" onChange={handleInputChange}/>
                    <label htmlFor="female">Female</label>
                    <input type="radio" id="other" name="gender" value="other" onChange={handleInputChange}/>
                    <label htmlFor="other">Other</label> 
                </div>

                <label>Comment</label>
                <textarea type="text" name="comment" value={user.comment} onChange={handleInputChange} />

                <label>Country</label>
                <select name="country" value={user.country} onChange={handleInputChange}>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                    <option value="FI">Finland</option>
                </select>

                {/* inline styling */}
                <input type="submit" value="register" />
            </form>
        </div>
    )
}

export default RegisterFormWithStyling
