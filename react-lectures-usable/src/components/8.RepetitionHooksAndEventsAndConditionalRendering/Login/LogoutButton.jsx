import React from 'react'

const LogoutButton = ({handleLogoutClick}) => {
  return (
    <button onClick={handleLogoutClick}>
        Logout
    </button>
  )
}

export default LogoutButton