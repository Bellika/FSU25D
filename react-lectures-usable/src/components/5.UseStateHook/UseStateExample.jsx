import React, {useState} from 'react'

const UseStateExample = () => {

  /**
   * 
   * Rules of using Hooks
   * 1. Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.
   * 
   * 2.Only call Hooks from React function Components (or from Custom Hooks)
   */
  const [count, setCount] = useState(0);

  // const increment = () => {
  //   setCount(count + 1);
  // }

  /**
   * setCount is async
   * setCount groups multiple setCount calls to a single call for optimization
   * May calculate with previous state, if needed to make multiple setCount calls
   */
  const incrementThree = () => {
    
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <>
      <button onClick={() => {setCount(count + 1)}}>Increment: {count}</button>
      <button onClick={incrementThree}>Increment with 3: {count}</button>
    </>
  )
}

export default UseStateExample