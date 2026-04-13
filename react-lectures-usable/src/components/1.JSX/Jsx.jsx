// Creating a function component with command "rafce"
import React from 'react'

const user = {
    firstname: 'John',
    lastname: 'Doe'
}


const element = <h1>Hello {user.firstname} {user.lastname}</h1>


function getGreeting(user) {
    if (user) {
      return <h1>Hello, {user.firstname}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

// Elements in array
let elements = [
    element,
    element,
    element,
    element,
    element
];

console.log(elements);

// Elements in array
// let elements = []
// for (let i = 0; i < 5; i++) {
//     elements.push(element)
// }


/**
 * General Rules and considerations when working with JSX
 * - To return multiple elements from a component, wrap them with a single parent tag. Example add an extra <div> as the root element
 * - If you don’t want to add an extra <div> to your markup, you can write <> and </> instead. This is called a fragment.
 * - JSX requires tags to be explicitly closed: self-closing tags like <img> must become <img />
 * - In React, many HTML and SVG attributes are written in camelCase. So it's onClick instead of onclick
 * - Class is a reserved word in JS. In React you write "className" instead of "class", for adding a HTML class
 * - JSX Prevents Injection Attacks: It is safe to embed user input in JSX
 */
const Jsx = () => {
  return (
    <div className="">
        {/* Display plain text */}
        Hello, John Doe
        <br />

        {/* Display an element through a variable */}
        {element}

        {/* Display an element through a function */}
        {getGreeting(user)}

        {/* Display elements through looping an array */}
        {
            elements.map( element => { 
                return <article>element</article>
              }
            )

            //elements.map((element, index) => { 
            //    return <article key={index}>{element}</article>
            //})
        }
    </div>
  )
}

export default Jsx