import { useState, useRef, useEffect } from 'react';
import styles from './RefDemo.module.css';

const RefDemo = () => {
  // Example 1: Focus management
  const inputRef = useRef(null);

  // Example 2: Render counter (without causing re-renders)
  const renderCount = useRef(0);
  const [stateCounter, setStateCounter] = useState(0);

  // Example 3: Previous value
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(0);

  // Example 4: DOM element reference
  const scrollTargetRef = useRef(null);

  // Example 5: Timer reference
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Increment render counter on every render (doesn't cause re-render!)
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  // Store previous count value
  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleFocus = () => {
    // Access DOM element directly and focus it
    inputRef.current.focus();
  };

  const handleScrollToElement = () => {
    // Scroll to element
    scrollTargetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className={styles.container}>
      <h2>useRef Examples</h2>
      <p className={styles.intro}>
        useRef lets you reference a value or DOM element that doesn't trigger re-renders when updated.
      </p>

      {/* Example 1: Focus Management */}
      <div className={styles.example}>
        <h3>1. Focus Management</h3>
        <p>Click the button to focus the input field:</p>
        <div className={styles.demoArea}>
          <input
            ref={inputRef}
            type="text"
            placeholder="I will be focused"
            className={styles.input}
          />
          <button onClick={handleFocus} className={styles.button}>
            Focus Input
          </button>
        </div>
        <code className={styles.code}>
          const inputRef = useRef(null);{'\n'}
          inputRef.current.focus();
        </code>
      </div>

      {/* Example 2: Render Counter */}
      <div className={styles.example}>
        <h3>2. Render Counter (Without Causing Re-renders)</h3>
        <p>
          This component has rendered <strong>{renderCount.current}</strong> times.
        </p>
        <p>State counter: {stateCounter}</p>
        <div className={styles.demoArea}>
          <button
            onClick={() => setStateCounter(stateCounter + 1)}
            className={styles.button}
          >
            Increment State (causes re-render)
          </button>
        </div>
        <p className={styles.note}>
          Notice: renderCount updates without causing a re-render!
          If we used useState for renderCount, we'd get an infinite loop.
        </p>
        <code className={styles.code}>
          const renderCount = useRef(0);{'\n'}
          useEffect(() ={'>'} {'\n'}
          {'  '}renderCount.current = renderCount.current + 1;{'\n'}
          {'}'});
        </code>
      </div>

      {/* Example 3: Previous Value */}
      <div className={styles.example}>
        <h3>3. Store Previous Value</h3>
        <p>Current count: <strong>{count}</strong></p>
        <p>Previous count: <strong>{previousCountRef.current}</strong></p>
        <div className={styles.demoArea}>
          <button
            onClick={() => setCount(count + 1)}
            className={styles.button}
          >
            Increment
          </button>
          <button
            onClick={() => setCount(count - 1)}
            className={styles.buttonSecondary}
          >
            Decrement
          </button>
        </div>
        <code className={styles.code}>
          const previousCountRef = useRef(0);{'\n'}
          useEffect(() ={'>'} {'\n'}
          {'  '}previousCountRef.current = count;{'\n'}
          {'}'}, [count]);
        </code>
      </div>

      {/* Example 4: DOM Reference for Scrolling */}
      <div className={styles.example}>
        <h3>4. Scroll to Element</h3>
        <div className={styles.demoArea}>
          <button onClick={handleScrollToElement} className={styles.button}>
            Scroll to Target
          </button>
        </div>
        <div className={styles.spacer}>
          <p>. . . scroll down . . .</p>
        </div>
        <div ref={scrollTargetRef} className={styles.scrollTarget}>
          🎯 Target Element! You scrolled here using ref.current.scrollIntoView()
        </div>
        <code className={styles.code}>
          const scrollTargetRef = useRef(null);{'\n'}
          scrollTargetRef.current.scrollIntoView();
        </code>
      </div>

      {/* Example 5: Timer with setInterval */}
      <div className={styles.example}>
        <h3>5. Store Timer ID (setInterval/setTimeout)</h3>
        <p>Timer: <strong>{seconds}</strong> seconds</p>
        <div className={styles.demoArea}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={styles.button}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleResetTimer}
            className={styles.buttonSecondary}
          >
            Reset
          </button>
        </div>
        <p className={styles.note}>
          We store the interval ID in a ref so we can clear it later.
          If we used useState, it would cause unnecessary re-renders.
        </p>
        <code className={styles.code}>
          const timerRef = useRef(null);{'\n'}
          timerRef.current = setInterval(() ={'>'} {'{'}...{'}'}, 1000);{'\n'}
          clearInterval(timerRef.current);
        </code>
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <h3>When to use useRef?</h3>
        <ul>
          <li>✅ Accessing DOM elements (focus, scroll, measure)</li>
          <li>✅ Storing mutable values that don't need re-renders</li>
          <li>✅ Keeping track of previous values</li>
          <li>✅ Storing timer/interval IDs</li>
          <li>✅ Integrating with third-party libraries</li>
        </ul>
        <h3>useRef vs useState</h3>
        <ul>
          <li><strong>useRef:</strong> Changing .current does NOT trigger re-render</li>
          <li><strong>useState:</strong> Calling setter DOES trigger re-render</li>
        </ul>
      </div>
    </div>
  );
};

export default RefDemo;
