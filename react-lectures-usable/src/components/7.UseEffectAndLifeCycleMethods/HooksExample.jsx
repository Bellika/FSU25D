import React, {useState, useEffect} from 'react'

const HooksExample = () => {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  // Similar to componentDidMount and componentDidUpdate:
  // First time UseEffect runs, is when componentDidMount. After that, it re-runs everytime when componentDidUpdate
  useEffect(() => {
    console.log('useEffect 1');

    document.title = `You clicked ${count} times`;
  }, [count]) // The array with "count" ensures useEffect runs only when the count-state is updated

  const tick = () => {
    setDate(new Date());
    console.log("Tick")
  }
  
  let timerId = '';
  useEffect(() => {
    timerId = setInterval(
        tick,
        1000 // 1 sec
    )
    console.log('useEffect 2')

    // Will run when componentWillUnmmount
    return () => {
        clearInterval(timerId)
    }
  }, []) // The empty array ensures useEffect runs only once with componentDidMount



  return (
    <>
      <div>{date.toLocaleTimeString()}</div>
      <button onClick={() => {setCount(count + 1)}}>Increment: {count}</button>
    </>
  )
}

export default HooksExample