import React, {useState} from 'react'

const FormWithHooksBasics = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const handleSubmit = (e) => {
    // e.preventDefault();
    alert(`Hello ${firstname} ${lastname}`);
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            firstname:
            <input type="text" name="firstname" value={firstname} onChange={ (e) => {setFirstname(e.target.value)}}/>
        </label>

        <br />

        <label>
            lastname:
            <input type="text" name="lastname" value={lastname} onChange={ (e) => {setLastname(e.target.value)}}/>
        </label>
        
        <br />

        <input type="submit" value="Submit" />
    </form>
  )
}

export default FormWithHooksBasics