import React from 'react'

const ClickEvent = () => {

  const handleClick = (e) => {
    console.log('clicked :)');
    console.log(e);
    console.log(e.target);
  }

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <button onClick={(e) => { console.log(e.target); }}>Click me</button>
    </>
  )
}

export default ClickEvent