import React from 'react'

const Avatar = ({author}) => {
  return (
    <img className="Avatar"
        src={author.avatarUrl}
        alt={author.name}
    />
  )
}

export default Avatar