import React from 'react'

// rafce is a shorthand for arrow function component
const GreetingsComponent = ({name, url}) => {
  return (
    <section>
      <h2>Hej {name}</h2>
      <img 
        src={url}
        alt="Katherine Johnson"  
      />
    </section>
  )
}

export default GreetingsComponent