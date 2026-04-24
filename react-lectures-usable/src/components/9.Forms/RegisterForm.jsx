import React, {useState} from 'react'
import './formStyle.css'                        // Import regular stylesheet
import formStyle from './formStyle.module.css'  // Import CSS module


const RegisterForm = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    comment: '',
    country: 'NO'
  })

  // const handleFirstName = (e) => {
  //   setUser({
  //     ...user,
  //     firstname: e.target.value
  //   })
  // }

  // const handleLastName = (e) => {
  //   setUser({
  //     ...user,
  //     lastname: e.target.value
  //   })
  // }

  // const handleComment = (e) => {
  //   setUser({
  //     ...user,
  //     comment: e.target.value
  //   })
  // }

  // const handleCountry = (e) => {
  //   setUser({
  //     ...user,
  //     country: e.target.value
  //   })
  // }

  /**
     * This general handleInputChange method replaces all "handle" methods above
     */
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setUser({
      ...user,
      [fieldName]: value
    })

    console.log(fieldName, value)
  }

  const handleSubmit = () => {
    alert(`Form was successfully submitted. Good job ${user.firstname} ${user.lastname}`)
  }

  /**
   * React is very controlling. 
   * A controlled component is the standard way to handle HTML forms in React.
   * Meaning state needs to keep track of initial values and all the changes done by the user, in the HTML form
   * 
   * Tip: There is a popular form library "Formik",  
   * for a complete solution including validation, keeping track of the visited fields, and handling form submission.
   */
  return (
    <form onSubmit={handleSubmit}>
    <h1>Register here!</h1>
      <div className="messages">
          {/* inline styling */}
          {/* <p style={warningMessageStyle}>Warning message (with inline style)</p> */}
          {/* class "success" from regular stylesheet */}
          <p className="success">Success message (with regular linked stylesheet)</p>
          {/* class "error" from CSS module */}
          <p className={formStyle.error}>Error message example (with CSS module)</p>
      </div>

      <label>firstname:</label>
      <input type="text" name="firstname" value={user.firstname} onChange={handleChange}/>

      <br />

      <label>lastname:</label>
      <input type="text" name="lastname" value={user.lastname} onChange={handleChange}/>
      
      <br />

      <label>Comment:</label>
      <textarea name="comment" value={user.comment} onChange={handleChange}/>
      

      <label>Country:</label>
      <select name="country" value={user.country} onChange={handleChange}>
        <option value="SE">Sweden</option>
        <option value="FI">Finland</option>
        <option value="NO">Norway</option>
      </select>
      
      <br />

      <input type="submit" value="Submit" />

      <br />
      <h2>{JSON.stringify(user)}</h2>
    </form>
  )
}

export default RegisterForm