import React from 'react'

const Greeting = ({isLoggedIn}) => {
  
  /**
   * Version 1
   */
  // let greeting = '';
  // if (isLoggedIn) {
  //   greeting = "Welcome Mr. John Doe"
  // } else {
  //   greeting = "Please login!"
  // }

  // return (
  //   <h1>{greeting}</h1>
  // )

  /**
   * Version 2
   * Refactor with ternary operator
   */
  return (
    <h1>
      {
        isLoggedIn 
          ? "Welcome Mr. John Doe" 
          : "Please login!"
      }
    </h1>
  )
}

export default Greeting