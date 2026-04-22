import React, { useState, useEffect } from 'react'

const Clock = () => {
  const [date, setDate] = useState(new Date());

  let timerID = "";

  /**
   *
   * 2. Rerenders when the component is mountet (componentDidMount lifecycle method)
   * React calls the componentDidMount() lifecycle method when the Clock output is inserted in the DOM, . 
   * Inside it, the Clock component asks the browser to set up a timer to call the component’s tick() method once a second.
   * 
   * 3. Rerenders when the component is updated (componentDidUpdate lifecycle method) 
   * Every second the browser calls the tick() method. 
   * Inside it, the Clock component schedules a UI update by calling setDate() with an object containing the current time. 
   * Thanks to the setDate() call, React knows the state has changed, 
   * and calls the return () again to learn what should be on the screen. 
   * This time, the date state in the return () will be different, 
   * and so the render output will include the updated time. React updates the DOM accordingly.
   */
  useEffect( () => {
    timerID = setInterval(
      tick,
      1000
    );

    console.log("useEffect")

    /**
     * 4. If the Clock component is ever removed from the DOM, 
     * React calls the the following return-statement so the timer is stopped. (componentWillUnmount lifecycle method)
     */
    return () => {
      clearInterval(timerID)
    }
  }, []) // An empty array means that useEffect will NOT be triggered on componentDidUpdate

  function tick() {
    setDate(new Date());
  }

  console.log('Return');
  /**
   * 1. React calls the Clock component’s return(). 
   * This is how React learns what should be displayed on the screen. 
   * React then updates the DOM to match the Clock’s render output.
   */
  return (
    <div> { date.toLocaleTimeString() }</div>
  )
}

export default Clock