import React, {useState} from 'react'
import ChildComponentButton from './ChildComponentButton';
import Greeting from './Greeting';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginClick = () => {
    setIsLoggedIn(true)
  }

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  }

  // Sebastian kommer gå igenom passing up props
  // const passingUpProps = (string) => {
  //   console.log(string)
  // } 

  /**
   * Version 1 
   */ 
  // let button = '';
  // if (isLoggedIn) {
  //   button = <button onClick={handleLogoutClick}>Logout</button>
  // } else {
  //   button = <button onClick={handleLoginClick}>Login</button>
  // }

  // let greeting = '';
  // if (isLoggedIn) {
  //   greeting = "Welcome Mr. John Doe"
  // } else {
  //   greeting = "Please login!"
  // }

  // return (
  //   <div>
  //     <h1>{greeting}</h1>
  //     {button}
  //   </div>
  // )

  /**
   * Version 2
   * Refactor to child components
   */
  // let button = '';
  // if (isLoggedIn) {
  //   button = <LogoutButton handleLogoutClick={handleLogoutClick} />
  // } else {
  //   button = <LoginButton handleLoginClick={handleLoginClick} />
  // }

  // return (
  //   <div>
  //     <Greeting isLoggedIn={isLoggedIn} />
  //     {button}
  //   </div>
  // )


  /**
   * Version 3
   * Refactor with ternary operator
   */
  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {
        isLoggedIn 
          ? <LogoutButton handleLogoutClick={handleLogoutClick} /> 
          : <LoginButton handleLoginClick={handleLoginClick} />
      }
    
      {/* <br />
      <br />
      <ChildComponentButton passingUpProps={passingUpProps}/> */}
    </div>
  )
}

export default Login